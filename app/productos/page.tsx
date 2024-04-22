'use client'

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import Link from "next/link";

export default function Productos() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {/* HERO */}
            <div className="">

                <div className="mx-auto max-w-2xl text-center pt-10">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Productos por categoría
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>

                <div className="flex justify-center items-center">
                    <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                        <div className="flex flex-col jusitfy-center items-center space-y-10">
                            {/* <div className="flex flex-col justify-center items-center space-y-2">
                                <p className="text-xl leading-5 text-gray-600">2021 Trendsetters</p>
                                <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">Shop By Category</h1>
                            </div> */}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 w-full">
                                <div className="flex flex-col space-y-8 mt-4 md:mt-0 mb-4 md:mb-8">

                                    {/* Pasteles */}
                                    <Link href={'/productos/pasteles'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/pastel-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Pasteles
                                        </button>
                                    </Link>


                                    {/* Pays */}
                                    <Link href={'/productos/pays'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/pay-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Pays
                                        </button>
                                    </Link>

                                </div>

                                <div className="flex flex-col space-y-8 mt-4 md:mt-0 mb-4 md:mb-8">

                                    {/* Brownies */}
                                    <Link href={'/productos/brownies'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/brownies-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Brownies
                                        </button>
                                    </Link>

                                    {/* Galletas */}
                                    <Link href={'/productos/galletas'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/galletas-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Galletas
                                        </button>
                                    </Link>

                                </div>

                                <div className="flex flex-col space-y-8 mt-4 md:mt-0 mb-4 md:mb-8">

                                    {/* Keto */}
                                    <Link href={'/productos/keto'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/keto-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Keto
                                        </button>
                                    </Link>

                                    {/* Muffins y Panqués */}
                                    <Link href={'/productos/muffins-panques'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/muffinspanques-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Muffins y Panqués
                                        </button>
                                    </Link>

                                </div>

                                <div className="flex flex-col space-y-8 mt-4 md:mt-0 mb-4 md:mb-8">

                                    {/* Individuales */}
                                    <Link href={'/productos/individuales'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/individuales-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Individuales
                                        </button>
                                    </Link>

                                    {/* Temporada */}
                                    <Link href={'/productos/temporada'} className="relative group flex justify-center items-center h-full w-full hover:cursor-pointer bg-mainRojo-100">
                                        <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src="/categorias/temporada-categoria.jpg" alt="shoe-image" />
                                        <div className="absolute opacity-0 group-hover:opacity-50 transition duration-500 bottom-3 p-6 z-0 px-20 w-52 bg-mainRojo-100" />
                                        <button className="text-center focus:outline-none bottom-4 z-10 absolute md:text-base font-medium leading-none md:py-2 py-10 w-80 text-4xl md:w-48 bg-transparent group-hover:bg-mainRojo-100 bg-white text-black group-hover:text-white transition duration-500">
                                            Temporada
                                        </button>
                                    </Link>

                                </div>
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
