import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const client = await sql.connect();

    try {
        const result = await client.query(`
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
            ORDER BY datetime_ordered DESC
        `);

        const orders = result.rows;

        return new NextResponse(JSON.stringify({ orders }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=0, must-revalidate',
            },
        });
    } catch (err) {
        console.error('Error fetching orders:', err);
        return new NextResponse(JSON.stringify({ error: 'Error fetching orders' }), { status: 500 });
    } finally {
        client.release();
    }
};
