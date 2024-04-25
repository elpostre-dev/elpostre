'use client'

import React, { useEffect, useState } from 'react';
import { Producto } from '../../../data/productos'; // Asegúrate de que la ruta es correcta
import { productos } from '../../../data/productos';
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SingleProduct({ params }: { params: { id: string } }) {

    const id = params.id;
    const [producto, setProducto] = useState<Producto | null>(null);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [tamanio, setTamanio] = useState<any>("");
    const [variacion, setVariacion] = useState<any>(null);

    useEffect(() => {
        const productoEncontrado = productos.find((p) => p.id === Number(id));
        if (productoEncontrado) {
            setProducto(productoEncontrado);
            setCurrentImage(productoEncontrado.fotos[0]);
            setTamanio(productoEncontrado.variaciones[0].tamanio);
            setVariacion(productoEncontrado.variaciones[0]);
        }
    }, [id]);

    useEffect(() => {
        const variacionNueva = producto?.variaciones.find((v) => v.tamanio === tamanio);
        setVariacion(variacionNueva);
    }, [tamanio]);


    // https://readymadeui.com/tailwind/ecommerce/ecommerce-product-view-template
    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {!producto ? <div className='h-screen p-5'>Cargando...</div> :

                <>

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
                                        <Link href="/productos">Productos</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{producto.nombre}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Product */}
                    <div className="font-[sans-serif]">
                        <div className="p-6 py-10 lg:max-w-7xl max-w-2xl mx-auto">
                            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">

                                {/* Fotos */}
                                <div className="w-full lg:sticky top-0 text-center">
                                    <div style={{ height: "420px" }} className='border my-auto rounded-xl flex items-center justify-center'>
                                        <img src={currentImage} alt="Product" className="rounded-xl object-contain max-h-[420px]" />
                                    </div>
                                    <div className="flex flex-wrap gap-x-8 gap-y-6 justify-center mx-auto mt-6">
                                        {producto.fotos.map((foto, index) => (
                                            <img key={index} src={foto} alt="Product" className="w-20 cursor-pointer rounded-xl object-contain border" onClick={() => setCurrentImage(foto)} />
                                        ))}
                                    </div>
                                </div>

                                {/* Detalles */}
                                <div>

                                    <div className="flex flex-wrap items-start gap-4">

                                        {/* nombre */}
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-mainRojo-100 uppercase">{producto.nombre}</h2>
                                            <p className="text-sm text-gray-400 mt-2">{producto.categoriaNombre}</p>
                                        </div>

                                    </div>

                                    <hr className="my-8" />

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Descripción</h3>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {producto.descripcion}
                                        </p>
                                    </div>

                                    <hr className="my-8" />

                                    <div className="flex flex-wrap gap-4 items-start">
                                        <div>
                                            <p className="text-gray-800 text-3xl font-bold">${variacion?.precio}</p>
                                            <p className="text-gray-400 text-xl mt-1">
                                                {variacion?.tamanio}
                                                <br />
                                                <span className="text-lg">{variacion?.personas}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="my-8" />

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Tamaño</h3>
                                        <div className='mt-2 w-full'>
                                            <Select
                                                value={tamanio}
                                                defaultValue={producto.variaciones[0].tamanio}
                                                onValueChange={value => setTamanio(value)}
                                            >
                                                <SelectTrigger className="w-[350px]">
                                                    <SelectValue placeholder="Elige un tamaño..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {/* <SelectLabel>Fruits</SelectLabel> */}
                                                        {producto.variaciones.map((variacion, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={variacion.tamanio}>{variacion.tamanio} {variacion.precio > 0 ? `- $${variacion.precio}` : ``}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <hr className="my-8" />

                                    <div className="flex flex-wrap gap-4">
                                        <button type="button" className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold rounded">Comprar ahora</button>
                                        <button type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-bold rounded">Agregar al carrito</button>
                                    </div>

                                </div>
                            </div>


                            {/* <div className="mt-24 max-w-4xl">
                                <ul className="flex border-b">
                                    <li
                                        className="text-gray-800 font-bold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">
                                        Description</li>
                                    <li className="text-gray-400 font-bold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">Reviews</li>
                                </ul>
                                <div className="my-8">
                                    <h3 className="text-lg font-bold text-gray-800">Descripción del producto</h3>
                                    <p className="text-sm text-gray-400 mt-4">
                                        {producto.descripcion}
                                    </p>
                                </div>
                            </div> */}


                        </div>
                    </div>

                </>
            }



            {/* FOOTER */}
            <Footer />


        </main>
    );
};
