import { sql } from '@vercel/postgres';
import { formatInTimeZone } from 'date-fns-tz';

export const POST = async (request) => {
    const body = await request.json();

    const {
        session_id,
        total,
        discount,
        name,
        email,
        phone,
        pickupPerson,
        formattedDate,
        pickupTime,
        messageClient,
        products,
    } = body;

    const client = await sql.connect();

    try {
        // Verificar si el session_id ya existe
        const existingOrder = await client.query('SELECT * FROM orders WHERE session_id = $1', [session_id]);
        if (existingOrder.rows.length > 0) {
            const order = existingOrder.rows[0];

            // Fetch client info
            const clientResult = await client.query('SELECT * FROM clients WHERE client_id = $1', [order.client_id]);
            const clientInfo = clientResult.rows[0];

            // Fetch order items
            const orderItemsResult = await client.query('SELECT * FROM order_items WHERE order_id = $1', [order.order_id]);
            const orderItems = orderItemsResult.rows;

            return new Response(JSON.stringify({ order, client: clientInfo, items: orderItems }), { status: 200 });
        }

        // Start a transaction
        await client.query('BEGIN');

        // Insert client info, or update if already exists
        const clientResult = await client.query(
            'INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET name = $1, phone = $3 RETURNING client_id',
            [name, email, phone]
        );
        const clientId = clientResult.rows[0].client_id;

        const today = new Date();
        const newDate = formatInTimeZone(today, 'America/Monterrey', 'yyyy-MM-dd HH:mm:ss zzz');

        // Insert order info
        const orderResult = await client.query(
            'INSERT INTO orders (client_id, final_price, discount_applied, pickup_date, pickup_hour, pickup_person_name, comments, completed, datetime_ordered, total, session_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [clientId, total * (1 - discount), discount > 0, formattedDate, pickupTime, pickupPerson, messageClient, false, newDate, total, session_id]
        );
        const order = orderResult.rows[0];

        // Insert order items
        const orderItemsPromises = products.map((product) =>
            client.query(
                'INSERT INTO order_items (order_id, product_name, size, unit_price, quantity) VALUES ($1, $2, $3, $4, $5)',
                [order.order_id, product.nombre, product.tamanio, product.precio, product.cantidad]
            )
        );
        await Promise.all(orderItemsPromises);

        // Fetch inserted order items
        const orderItemsResult = await client.query('SELECT * FROM order_items WHERE order_id = $1', [order.order_id]);
        const orderItems = orderItemsResult.rows;

        // Commit transaction
        await client.query('COMMIT');

        return new Response(JSON.stringify({ order, client: { client_id: clientId, name, email, phone }, items: orderItems }), { status: 200 });
    } catch (err) {
        // Rollback transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error processing order:', err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    } finally {
        client.release();
    }
};
