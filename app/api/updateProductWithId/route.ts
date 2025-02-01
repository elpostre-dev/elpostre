import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface ProductVariation {
    id: number;
    producto_id: number;
    tamanio: string;
    precio: number;
    personas: string;
}

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    categoria_id: number;
    categoria_nombre: string;
    fotos: string[];
    temporada: string;
    activo: boolean;
    en_venta: boolean;
    variaciones: ProductVariation[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(req: NextRequest) {
    try {
        const product: Product = await req.json();

        if (!product || !product.id) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        // check the images 'product.fotos' and upload them to a cloud storage service if needed, or delete them if needed
        console.log('Product data:', product.fotos);

        // **1. Update the main product table**
        await sql`
            UPDATE productos 
            SET nombre = ${product.nombre},
                descripcion = ${product.descripcion},
                categoria_id = ${product.categoria_id},
                categoria_nombre = ${product.categoria_nombre},
                fotos = ${JSON.stringify(product.fotos).replace("[", "{").replace("]", "}")},
                temporada = ${product.temporada},
                activo = ${product.activo},
                en_venta = ${product.en_venta}
            WHERE id = ${product.id};
        `;

        // **2. Get existing variations from DB**
        const existingVariationsResult = await sql`
            SELECT * FROM variaciones WHERE producto_id = ${product.id};
        `;
        const existingVariationIds = existingVariationsResult.rows.map((row) => row.id);

        // **3. Determine which variations to delete**
        const updatedVariationIds = product.variaciones.map((v) => v.id).filter((id) => id > 0);
        const variationsToDelete = existingVariationIds.filter((id) => !updatedVariationIds.includes(id));

        // **Perform individual delete queries**
        for (const id of variationsToDelete) {
            await sql`DELETE FROM variaciones WHERE id = ${id};`;
        }

        // **4. Insert or update variations**
        for (const variacion of product.variaciones) {
            if (variacion.id < 0) {
                // **New variation (negative id) -> INSERT**
                await sql`
                    INSERT INTO variaciones (producto_id, tamanio, precio, personas)
                    VALUES (${product.id}, ${variacion.tamanio}, ${variacion.precio}, ${variacion.personas});
                `;
            } else {
                // **Existing variation -> UPDATE**
                await sql`
                    UPDATE variaciones 
                    SET tamanio = ${variacion.tamanio},
                        precio = ${variacion.precio},
                        personas = ${variacion.personas}
                    WHERE id = ${variacion.id};
                `;
            }
        }

        return NextResponse.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}
