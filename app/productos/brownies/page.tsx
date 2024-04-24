'use client'

import NavBar from "../../../components/Navbar";
import { productos } from '../../../data/productos';
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

export default function Brownies() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />


            {/* TITLE */}
            <section>
                <div className="mx-auto max-w-2xl text-center py-10">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Brownies
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>
            </section>


            {/* PRODUCTOS */}
            <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-12 mt-4 mb-14">
                {productos
                    .filter((producto) => producto.categoriaId === 3)
                    .map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
            </section>


            {/* FOOTER */}
            <Footer />


        </main>
    );
}
