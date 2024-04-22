'use client'

import NavBar from "../../../components/Navbar";
import { productos } from '../../../data/productos';
import { useState } from 'react';

export default function Galletas() {

    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {/* HERO */}
            <section>

                <div className="mx-auto max-w-2xl text-center py-10">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                        Galletas
                    </p>
                    <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {productos
                        .filter((producto) => producto.categoriaId === 4)
                        .map((producto) => (
                            <div
                                key={producto.id}
                                className="border border-gray-200 p-4 rounded-md hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer"
                                onMouseEnter={() => setHoveredProductId(producto.id)}
                                onMouseLeave={() => setHoveredProductId(null)}
                            >
                                <img
                                    src={hoveredProductId === producto.id && producto.fotos.length > 1 ? producto.fotos[1] : producto.fotos[0]}
                                    alt={producto.nombre}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <h2 className="text-lg font-semibold mt-2">{producto.nombre}</h2>
                                <p className="text-sm text-gray-600">{producto.descripcion}</p>
                            </div>
                        ))}
                </div>
            </section>


        </main>
    );
}
