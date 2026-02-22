// /app/api/admin-data/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { format, subDays } from "date-fns";

// Asegura que no se cachee nada
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function normalizePage(value: string | null, fallback: number) {
    const parsed = Number(value);
    if (Number.isNaN(parsed) || parsed < 1) return fallback;
    return Math.floor(parsed);
}

export async function GET(request: Request) {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    try {
        const { searchParams } = new URL(request.url);
        const page = normalizePage(searchParams.get("page"), 1);
        const requestedPageSize = normalizePage(searchParams.get("pageSize"), 10);
        const pageSize = [10, 25, 50].includes(requestedPageSize) ? requestedPageSize : 10;
        const q = (searchParams.get("q") || "").trim();
        const days = [30, 60, 90].includes(Number(searchParams.get("days")))
            ? Number(searchParams.get("days"))
            : 30;

        const defaultFrom = format(subDays(new Date(), days), "yyyy-MM-dd");
        const fromDate = searchParams.get("from") || defaultFrom;
        const toDate = searchParams.get("to") || format(new Date(), "yyyy-MM-dd");
        const searchTerm = `%${q}%`;
        const offset = (page - 1) * pageSize;
        const hasTextSearch = q.length > 0;

        const [incompleteOrdersResult, completeOrdersResult, completeCountResult] = await Promise.all([
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
          COALESCE(
            json_agg(
            json_build_object(
              'item_id', order_items.item_id,
              'product_name', order_items.product_name,
              'size', order_items.size,
              'unit_price', order_items.unit_price,
              'quantity', order_items.quantity
            )
          ) FILTER (WHERE order_items.item_id IS NOT NULL),
          '[]'::json
          ) AS items 
        FROM orders 
        JOIN clients ON orders.client_id = clients.client_id 
        LEFT JOIN order_items ON orders.order_id = order_items.order_id
        WHERE orders.completed = false
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
        ORDER BY SPLIT_PART(orders.pickup_date, ' ', 1)::date ASC, orders.pickup_hour ASC;
      `,
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
          COALESCE(
            json_agg(
            json_build_object(
              'item_id', order_items.item_id,
              'product_name', order_items.product_name,
              'size', order_items.size,
              'unit_price', order_items.unit_price,
              'quantity', order_items.quantity
            )
          ) FILTER (WHERE order_items.item_id IS NOT NULL),
          '[]'::json
          ) AS items 
        FROM orders 
        JOIN clients ON orders.client_id = clients.client_id 
        LEFT JOIN order_items ON orders.order_id = order_items.order_id
        WHERE orders.completed = true
          AND (
            ${hasTextSearch}
            OR (
              SPLIT_PART(orders.pickup_date, ' ', 1)::date >= ${fromDate}::date
              AND SPLIT_PART(orders.pickup_date, ' ', 1)::date <= ${toDate}::date
            )
          )
          AND (
            ${q} = ''
            OR clients.name ILIKE ${searchTerm}
            OR clients.email ILIKE ${searchTerm}
            OR clients.phone ILIKE ${searchTerm}
            OR CAST(orders.order_id AS text) ILIKE ${searchTerm}
          )
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
        ORDER BY SPLIT_PART(orders.pickup_date, ' ', 1)::date DESC, orders.pickup_hour DESC
        LIMIT ${pageSize}
        OFFSET ${offset};
      `
            ,
            sql`
        SELECT COUNT(*)::int AS total
        FROM orders
        JOIN clients ON orders.client_id = clients.client_id
        WHERE orders.completed = true
          AND (
            ${hasTextSearch}
            OR (
              SPLIT_PART(orders.pickup_date, ' ', 1)::date >= ${fromDate}::date
              AND SPLIT_PART(orders.pickup_date, ' ', 1)::date <= ${toDate}::date
            )
          )
          AND (
            ${q} = ''
            OR clients.name ILIKE ${searchTerm}
            OR clients.email ILIKE ${searchTerm}
            OR clients.phone ILIKE ${searchTerm}
            OR CAST(orders.order_id AS text) ILIKE ${searchTerm}
          );
      `,
        ]);

        return NextResponse.json({
            incompleteOrders: incompleteOrdersResult.rows,
            completeOrders: completeOrdersResult.rows,
            completeTotalCount: completeCountResult.rows[0]?.total ?? 0,
            page,
            pageSize,
            q,
            days,
            fromDate,
            toDate,
            isGlobalSearch: hasTextSearch,
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return new NextResponse("Error loading data", { status: 500 });
    }
}
