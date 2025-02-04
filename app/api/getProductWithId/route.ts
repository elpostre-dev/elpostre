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

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const result = await sql`
            SELECT p.id, p.nombre, p.descripcion, p.categoria_id, p.categoria_nombre, p.fotos, p.temporada, p.activo, p.en_venta,
                   pv.id AS variacion_id, pv.producto_id, pv.tamanio, pv.precio, pv.personas
            FROM productos p
            LEFT JOIN variaciones pv ON p.id = pv.producto_id
            WHERE p.id = ${productId};
        `;

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const rows = result.rows;
        let product: Product | null = null;

        rows.forEach(row => {
            const { variacion_id, producto_id, tamanio, precio, personas, ...productData } = row;

            const variation: ProductVariation = {
                id: variacion_id,
                producto_id,
                tamanio,
                precio,
                personas
            };

            if (!product) {
                product = {
                    id: productData.id,
                    nombre: productData.nombre,
                    descripcion: productData.descripcion,
                    categoria_id: productData.categoria_id,
                    categoria_nombre: productData.categoria_nombre,
                    fotos: productData.fotos,
                    temporada: productData.temporada,
                    activo: productData.activo,
                    en_venta: productData.en_venta,
                    variaciones: variation.id ? [variation] : [],
                };
            } else {
                product.variaciones.push(variation);
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product with ID:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
