'use client'

import NavBar from "../../../components/Navbar";
import { productos } from '../../../data/productos';
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

import NavidadImage from "../../../public/Temporada/Navidad/Navidad_Portrait.jpg";
import SanValentinImage from "../../../public/Temporada/SanValentin/SanValentin_Portrait.jpg";
import BodasComunionesBautizosImage from "../../../public/Temporada/BodasComunionesBautizos/BodasComunionesBautizos_Portrait.jpg";

export default function Temporada() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />


            {/* TITLE */}
            <section>
                <div className="mx-auto max-w-2xl text-center py-10">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Temporada
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>
            </section>


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
                {productos
                    .filter((producto) => producto.categoriaId === 8 && producto.temporada === 'Navidad')
                    .map((producto) => (
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
                {productos
                    .filter((producto) => producto.categoriaId === 8 && producto.temporada === 'San Valentín')
                    .map((producto) => (
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
                {productos
                    .filter((producto) => producto.categoriaId === 8 && producto.temporada === 'Bodas, Comuniones y Bautizos')
                    .map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
            </section>


            {/* FOOTER */}
            <Footer />


        </main>
    );
}
