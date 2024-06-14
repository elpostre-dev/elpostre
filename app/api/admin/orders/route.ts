// app/api/admin/orders/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const GET = async () => {
    const client = await sql.connect();

    try {
        const ordersResult = await client.query(`
            SELECT 
                orders.*, 
                clients.name AS client_name, 
                clients.email AS client_email, 
                clients.phone AS client_phone,
                json_agg(order_items.*) AS items
            FROM orders
            JOIN clients ON orders.client_id = clients.client_id
            JOIN order_items ON orders.order_id = order_items.order_id
            GROUP BY orders.order_id, clients.client_id
            ORDER BY orders.pickup_date ASC
        `);

        const orders = ordersResult.rows;

        return NextResponse.json({ orders });
    } catch (err) {
        console.error('Error fetching orders:', err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    } finally {
        client.release();
    }
};
