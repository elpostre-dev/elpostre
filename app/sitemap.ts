import { MetadataRoute } from "next";
import { sql } from "@vercel/postgres";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const host = process.env.NEXT_PUBLIC_HOST ?? "";
    const now = new Date();
    let productUrls: MetadataRoute.Sitemap = [];

    try {
        const result = await sql<{ id: number }>`
            SELECT id
            FROM productos
            WHERE activo = true
            ORDER BY id ASC;
        `;

        productUrls = result.rows.map((product) => ({
            url: `${host}/productos/${product.id}`,
            lastModified: now,
        }));
    } catch (error) {
        console.error("Error building sitemap product URLs:", error);
    }


    return [
        {
            url: `${host}`,
            lastModified: now,
        },
        {
            url: `${host}/productos/pasteles`,
            lastModified: now,
        },
        {
            url: `${host}/productos/pays`,
            lastModified: now,
        },
        {
            url: `${host}/productos/brownies`,
            lastModified: now,
        },
        {
            url: `${host}/productos/galletas`,
            lastModified: now,
        },
        {
            url: `${host}/productos/keto`,
            lastModified: now,
        },
        {
            url: `${host}/productos/muffins-panques`,
            lastModified: now,
        },
        {
            url: `${host}/productos/individuales`,
            lastModified: now,
        },
        {
            url: `${host}/productos/temporada`,
            lastModified: now,
        },
        {
            url: `${host}/carrito`,
            lastModified: now,
        },
        ...productUrls,
    ]
}