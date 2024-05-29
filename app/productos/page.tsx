'use client'

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";

const categoryItem = [
    {
        name: "Pasteles",
        href: "/productos/pasteles",
        imageUrl: "/categorias/pastel-categoria.jpg",
    },
    {
        name: "Pays",
        href: "/productos/pays",
        imageUrl: "/categorias/pay-categoria.jpg",
    },
    {
        name: "Brownies",
        href: "/productos/brownies",
        imageUrl: "/categorias/brownies-categoria.jpg",
    },
    {
        name: "Galletas",
        href: "/productos/galletas",
        imageUrl: "/categorias/galletas-categoria.jpg",
    },
    {
        name: "Keto",
        href: "/productos/keto",
        imageUrl: "/categorias/keto-categoria.jpg",
    },
    {
        name: "Muffins y Panqués",
        href: "/productos/muffins-panques",
        imageUrl: "/categorias/muffinspanques-categoria.jpg",
    },
    {
        name: "Individuales",
        href: "/productos/individuales",
        imageUrl: "/categorias/individuales-categoria.jpg",
    },
    {
        name: "Temporada",
        href: "/productos/temporada",
        imageUrl: "/categorias/temporada-categoria.jpg",
    }
];


export default function Productos() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {/* HERO */}
            <div className="bg-mainRosa-100 py-10">

                <div className="mx-auto max-w-2xl text-center" id="productos">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Productos
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>

                <div className="flex justify-center items-center">
                    <div className="2xl:mx-auto 2xl:container pb-6 pt-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                        <div className="flex flex-col jusitfy-center items-center space-y-10">

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                {categoryItem.map((item, index) => (
                                    <CategoryCard
                                        key={index}
                                        name={item.name}
                                        href={item.href}
                                        imageUrl={item.imageUrl}
                                    />
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <Footer />

        </main>
    );
}
