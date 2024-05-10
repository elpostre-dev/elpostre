import { sql } from "@vercel/postgres";


export const POST = async (request) => {
    const { code } = await request.json();

    console.log("code", code);

    try {
        const { rows } = await sql`SELECT active, percentage FROM discount_codes WHERE code = ${code}`;
        if (rows.length > 0 && rows[0].active) {
            return new Response(JSON.stringify(rows[0]), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            return new Response("código no valido", { status: 400 });
        }
    } catch (error) {
        console.log(error);
        console.error('Error checking discount code:', error);
        return new Response(error.message, { status: 400 });
    }
}