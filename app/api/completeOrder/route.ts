// app/api/orders/complete.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
    try {
        const { orderId } = await request.json();

        const result = await sql`
            UPDATE orders
            SET completed = true
            WHERE order_id = ${orderId}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
    }
}
