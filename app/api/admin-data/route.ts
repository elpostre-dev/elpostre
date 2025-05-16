// /app/api/admin-data/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Asegura que no se cachee nada
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const [ordersResult, statsResult] = await Promise.all([
            sql`
        WITH recent_orders AS (
          SELECT order_id 
          FROM orders 
          ORDER BY datetime_ordered DESC 
          LIMIT 30
        )
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
        JOIN recent_orders ON orders.order_id = recent_orders.order_id
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
        ORDER BY orders.pickup_date ASC;
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

        return NextResponse.json({
            orders: ordersResult.rows,
            stats: statsResult.rows[0]
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return new NextResponse("Error loading data", { status: 500 });
    }
}
