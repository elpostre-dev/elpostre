import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: returns the earliest order date so the modal can limit selectable months
export async function GET() {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    try {
        const result = await sql`
            SELECT SPLIT_PART(MIN(datetime_ordered), ' ', 1) AS min_date
            FROM orders
            WHERE datetime_ordered IS NOT NULL AND datetime_ordered != '';
        `;
        const minDate: string = result.rows[0]?.min_date ?? null;
        return NextResponse.json({ minDate });
    } catch (error) {
        console.error('Error fetching min order date:', error);
        return new NextResponse('Error', { status: 500 });
    }
}

// POST: validate password and return data for the requested report type
export async function POST(request: Request) {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    const body = await request.json();
    const { password, type } = body;

    if (!password || password !== process.env.REPORT_PASSWORD) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        if (type === 'global') {
            // Overall totals
            const totalsResult = await sql`
                SELECT
                    COUNT(DISTINCT o.order_id)::int            AS total_orders,
                    COALESCE(SUM(o.final_price), 0)            AS total_revenue,
                    COALESCE(SUM(oi.quantity), 0)::int         AS total_products_sold
                FROM orders o
                LEFT JOIN order_items oi ON o.order_id = oi.order_id
                WHERE o.datetime_ordered IS NOT NULL AND o.datetime_ordered != '';
            `;

            // Monthly breakdown (all months with orders)
            const monthlyResult = await sql`
                SELECT
                    TO_CHAR(SPLIT_PART(o.datetime_ordered, ' ', 1)::date, 'YYYY-MM') AS month,
                    COUNT(DISTINCT o.order_id)::int                                    AS order_count,
                    COALESCE(SUM(o.final_price), 0)                                   AS revenue,
                    COALESCE(SUM(oi.quantity), 0)::int                                AS products_sold
                FROM orders o
                LEFT JOIN order_items oi ON o.order_id = oi.order_id
                WHERE o.datetime_ordered IS NOT NULL AND o.datetime_ordered != ''
                GROUP BY TO_CHAR(SPLIT_PART(o.datetime_ordered, ' ', 1)::date, 'YYYY-MM')
                ORDER BY month ASC;
            `;

            return NextResponse.json({
                totals: totalsResult.rows[0],
                monthly: monthlyResult.rows,
            });
        }

        // Monthly report (default)
        const { startDate, endDate } = body;
        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'Missing date params' }, { status: 400 });
        }

        const result = await sql`
            SELECT
                orders.order_id,
                orders.final_price,
                orders.datetime_ordered,
                clients.name AS client_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'product_name', order_items.product_name,
                            'size',         order_items.size,
                            'quantity',     order_items.quantity,
                            'unit_price',   order_items.unit_price
                        )
                    ) FILTER (WHERE order_items.item_id IS NOT NULL),
                    '[]'::json
                ) AS items
            FROM orders
            JOIN clients ON orders.client_id = clients.client_id
            LEFT JOIN order_items ON orders.order_id = order_items.order_id
            WHERE
                orders.datetime_ordered IS NOT NULL
                AND SPLIT_PART(orders.datetime_ordered, ' ', 1)::date >= ${startDate}::date
                AND SPLIT_PART(orders.datetime_ordered, ' ', 1)::date <= ${endDate}::date
            GROUP BY
                orders.order_id,
                orders.final_price,
                orders.datetime_ordered,
                clients.name
            ORDER BY
                SPLIT_PART(orders.datetime_ordered, ' ', 1)::date ASC;
        `;

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error generating report:', error);
        return new NextResponse('Error generating report', { status: 500 });
    }
}
