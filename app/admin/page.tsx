import { AdminCont } from "@/components/AdminContent";
import { sql } from "@vercel/postgres";
import { Order } from "@/types/types";

// Define the type assertion function
function mapToOrders(rows: any[]): Order[] {
    return rows.map(row => ({
        order_id: row.order_id,
        client_id: row.client_id,
        final_price: row.final_price,
        discount_applied: row.discount_applied,
        pickup_date: row.pickup_date,
        pickup_hour: row.pickup_hour,
        pickup_person_name: row.pickup_person_name,
        comments: row.comments,
        completed: row.completed,
        datetime_ordered: row.datetime_ordered,
        total: row.total,
        session_id: row.session_id,
        client_name: row.client_name,
        client_email: row.client_email,
        client_phone: row.client_phone,
        items: row.items.map((item: any) => ({
            item_id: item.item_id,
            product_name: item.product_name,
            size: item.size,
            unit_price: item.unit_price,
            quantity: item.quantity,
        }))
    }));
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Admin() {
    try {
        // Run both queries in parallel
        const [ordersResult, statsResult] = await Promise.all([
            sql`
                SELECT 
                    orders.order_id,
                    orders.client_id,
                    orders.final_price,
                    orders.discount_applied,
                    orders.pickup_date,
                    orders.pickup_hour,
                    orders.pickup_person_name,
                    orders.comments,
                    orders.completed,
                    orders.datetime_ordered,
                    orders.total,
                    orders.session_id,
                    clients.name AS client_name, 
                    clients.email AS client_email, 
                    clients.phone AS client_phone, 
                    json_agg(
                        json_build_object(
                            'item_id', order_items.item_id,
                            'product_name', order_items.product_name,
                            'size', order_items.size,
                            'unit_price', order_items.unit_price,
                            'quantity', order_items.quantity
                        )
                    ) AS items 
                FROM orders 
                JOIN clients ON orders.client_id = clients.client_id 
                JOIN order_items ON orders.order_id = order_items.order_id 
                GROUP BY 
                    orders.order_id, 
                    clients.client_id, 
                    orders.final_price, 
                    orders.discount_applied, 
                    orders.pickup_date, 
                    orders.pickup_hour, 
                    orders.pickup_person_name, 
                    orders.comments, 
                    orders.completed, 
                    orders.datetime_ordered, 
                    orders.total, 
                    orders.session_id, 
                    clients.name, 
                    clients.email, 
                    clients.phone
                ORDER BY orders.datetime_ordered DESC;
            `,
            sql`
                SELECT 
                    COUNT(*) AS total_orders,
                    SUM(final_price) AS total_revenue,
                    SUM(item_data.total_quantity) AS total_products_sold,
                    AVG(final_price) AS average_order_cost
                FROM orders
                CROSS JOIN LATERAL (
                    SELECT SUM(quantity) AS total_quantity
                    FROM order_items
                    WHERE order_items.order_id = orders.order_id
                ) AS item_data;
            `
        ]);

        // Process results
        const rows = ordersResult.rows;
        const orders: Order[] = mapToOrders(rows);

        const stats = statsResult.rows[0]; // Only one row expected from the stats query

        return (
            <AdminCont orders={orders} stats={stats} />
        );
    } catch (error) {
        console.error('Error fetching orders:', error);
        return (
            <div>Failed to load orders</div>
        );
    }
}
