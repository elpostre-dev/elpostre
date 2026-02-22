import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { requireAdminSession } from "@/lib/auth";

interface ProductVariation {
    id: number; // UUID
    producto_id: number; // UUID
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

export async function GET() {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    try {
        const result = await sql`
            SELECT p.id, p.nombre, p.descripcion, p.categoria_id, p.categoria_nombre, p.fotos, p.temporada, p.activo, p.en_venta,
                   pv.id AS variacion_id, pv.producto_id, pv.tamanio, pv.precio, pv.personas
            FROM productos p
            LEFT JOIN variaciones pv ON p.id = pv.producto_id;
        `;

        const products: Product[] = [];
        const rows = result.rows;

        // Group variations by product
        rows.forEach(row => {
            const { variacion_id, producto_id, tamanio, precio, personas, ...productData } = row;

            // Create a ProductVariation object
            const variation: ProductVariation = {
                id: variacion_id,
                producto_id,
                tamanio,
                precio,
                personas
            };

            // Check if product already exists
            const existingProduct = products.find(p => p.id === productData.id);
            if (existingProduct) {
                existingProduct.variaciones.push(variation);
            } else {
                // Construct the new Product object
                const newProduct: Product = {
                    id: productData.id,
                    nombre: productData.nombre,
                    descripcion: productData.descripcion,
                    categoria_id: productData.categoria_id,
                    categoria_nombre: productData.categoria_nombre,
                    fotos: productData.fotos,
                    temporada: productData.temporada,
                    activo: productData.activo,
                    en_venta: productData.en_venta,
                    variaciones: variation.id ? [variation] : [], // Ensure variations array even if no variations exist
                };
                products.push(newProduct);
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}
