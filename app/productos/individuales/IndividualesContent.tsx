'use client'

import NavBar from "../../../components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEffect, useState } from "react";

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

export default function IndividualesContent() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/getProductsByCategory?categoryId=${7}`);
                if (!res.ok) throw new Error(`Failed to fetch products for category ${7}`);

                const data: Product[] = await res.json();

                // ✅ Filter only active products
                const activeProducts = data.filter(product => product.activo);

                setProducts(activeProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products by category:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />


            {/* BREADCRUMB */}
            <div className="px-10 py-5 bg-red-50">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Inicio</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/#productos">Productos</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Individuales</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>


            {/* TITLE */}
            <section>
                <div className="mx-auto max-w-2xl text-center py-10">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Individuales
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>
            </section>


            {/* PRODUCTOS */}
            {
                loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mainRojo-100"></div>
                    </div>
                )
                    :
                    <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-12 mt-4 mb-14">
                        {products.map((producto) => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))}
                    </section>
            }


            {/* FOOTER */}
            <Footer />


        </main>
    );
}
