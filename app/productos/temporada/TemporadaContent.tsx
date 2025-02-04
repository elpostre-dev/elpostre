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

import NavidadImage from "../../../public/Temporada/Navidad/Navidad_Portrait.jpg";
import SanValentinImage from "../../../public/Temporada/SanValentin/SanValentin_Portrait.jpg";
import BodasComunionesBautizosImage from "../../../public/Temporada/BodasComunionesBautizos/BodasComunionesBautizos_Portrait.jpg";
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

export default function TemporadaContent() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/getProductsByCategory?categoryId=${8}`);
                if (!res.ok) throw new Error(`Failed to fetch products for category ${8}`);

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

    // ✅ Separate products based on temporada
    const navidadProducts = products.filter(producto => producto.temporada === "Navidad");
    const sanValentinProducts = products.filter(producto => producto.temporada === "San Valentín");
    const bodasComunionesBautizosProducts = products.filter(producto => producto.temporada === "Bodas, Comuniones y Bautizos");

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
                            <BreadcrumbPage>Temporada</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>


            {/* TITLE */}
            <section>
                <div className="mx-auto max-w-2xl text-center py-10">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Temporada
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>
            </section>

            {
                loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mainRojo-100"></div>
                    </div>
                )
                    :
                    <>
                        {/* Navidad */}
                        <section
                            className="bg-center bg-no-repeat bg-blend-multiply bg-gray-500 bg-cover mb-10"
                            style={{
                                backgroundImage: `url(${NavidadImage.src})`,
                                height: "20vh",
                            }}
                        >
                            <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                                <h1 className="mb-4 text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                                    Navidad
                                </h1>
                            </div>
                        </section>

                        <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-12 mt-4 mb-14">
                            {navidadProducts.map((producto) => (
                                <ProductCard key={producto.id} producto={producto} />
                            ))}
                        </section>


                        {/* San Valentín */}
                        <section
                            className="bg-center bg-no-repeat bg-blend-multiply bg-gray-500 bg-cover mb-10"
                            style={{
                                backgroundImage: `url(${SanValentinImage.src})`,
                                height: "20vh",
                            }}
                        >
                            <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                                <h1 className="mb-4 text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                                    San Valentín
                                </h1>
                            </div>
                        </section>

                        <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-12 mt-4 mb-14">
                            {sanValentinProducts.map((producto) => (
                                <ProductCard key={producto.id} producto={producto} />
                            ))}
                        </section>


                        {/* Bodas, Comuniones y Bautizos */}
                        <section
                            className="bg-center bg-no-repeat bg-blend-multiply bg-gray-500 bg-cover mb-10"
                            style={{
                                backgroundImage: `url(${BodasComunionesBautizosImage.src})`,
                                height: "20vh",
                            }}
                        >
                            <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                                <h1 className="mb-4 text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                                    Bodas, Comuniones y Bautizos
                                </h1>
                            </div>
                        </section>

                        <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-12 mt-4 mb-14">
                            {bodasComunionesBautizosProducts.map((producto) => (
                                <ProductCard key={producto.id} producto={producto} />
                            ))}
                        </section>

                    </>
            }


            {/* FOOTER */}
            <Footer />


        </main>
    );
}
