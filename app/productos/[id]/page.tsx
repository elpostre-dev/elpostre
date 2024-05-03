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
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useCart } from '@/lib/CartContext';

export default function SingleProduct({ params }: { params: { id: string } }) {

    const id = params.id;
    const [producto, setProducto] = useState<Producto | null>(null);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [tamanio, setTamanio] = useState<any>("");
    const [categoria, setCategoria] = useState<string>("");
    const [productoAgregado, setProductoAgregado] = useState<Boolean>(false);

    const [cartImage, setCartImage] = useState<string>("");
    const [variacion, setVariacion] = useState<any>(null);
    const [productName, setProductName] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);

    useEffect(() => {
        const productoEncontrado = productos.find((p) => p.id === Number(id));
        if (productoEncontrado) {
            setProducto(productoEncontrado);
            setCartImage(productoEncontrado.fotos[0]);
            setCurrentImage(productoEncontrado.fotos[0]);
            setTamanio(productoEncontrado.variaciones[0].tamanio);
            setVariacion(productoEncontrado.variaciones[0]);
            setProductName(productoEncontrado.nombre);
            if (productoEncontrado.categoriaId == 1) {
                setCategoria("pasteles");
            } else if (productoEncontrado.categoriaId == 2) {
                setCategoria("pays");
            } else if (productoEncontrado.categoriaId == 3) {
                setCategoria("brownies");
            } else if (productoEncontrado.categoriaId == 4) {
                setCategoria("galletas");
            } else if (productoEncontrado.categoriaId == 5) {
                setCategoria("keto");
            } else if (productoEncontrado.categoriaId == 6) {
                setCategoria("muffins-panques");
            } else if (productoEncontrado.categoriaId == 7) {
                setCategoria("individuales");
            } else if (productoEncontrado.categoriaId == 8) {
                setCategoria("temporada");
            }
        }
    }, [id]);

    useEffect(() => {
        const variacionNueva = producto?.variaciones.find((v) => v.tamanio === tamanio);
        setVariacion(variacionNueva);
    }, [tamanio]);

    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        addToCart({
            productId: Number(id),
            nombre: productName,
            cantidad: cantidad,
            photo: cartImage,
            variacion: {
                tamanio: variacion.tamanio,
                precio: variacion.precio,
                personas: variacion.personas,
            }
        });
        toast.success('Producto agregado exitosamente', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            // theme: "colored",
        });
        // router.push("/pedido");
    };


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
                                    <BreadcrumbLink asChild>
                                        <Link href={`/productos/${categoria}`}>{producto.categoriaNombre}</Link>
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


                                    {/* nombre */}
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-mainRojo-100 uppercase">{producto.nombre}</h2>
                                        <p className="text-sm text-gray-400 mt-2">{producto.categoriaNombre}</p>
                                    </div>

                                    <hr className="my-8" />

                                    {/* descripcion */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Descripción</h3>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {producto.descripcion}
                                        </p>
                                    </div>

                                    <hr className="my-8" />

                                    {/* precio y personas */}
                                    <div className="flex flex-wrap gap-4 items-start">
                                        <div>
                                            <p className="text-gray-800 text-3xl font-bold">
                                                {variacion?.precio > 0 ? `$${variacion?.precio}` : ``}
                                            </p>
                                            <p className="text-gray-400 text-xl mt-1">
                                                {variacion?.tamanio}
                                                <br />
                                                <span className="text-lg">{variacion?.personas}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="my-8" />

                                    {/* cantidad */}
                                    <div className=''>
                                        <h3 className="text-lg font-bold text-gray-800">Cantidad</h3>
                                        <div className="relative flex items-center max-w-[8rem] mt-2">
                                            <button type="button" onClick={() => setCantidad(cantidad - 1)} disabled={cantidad == 1} className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <input type="text" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                                                placeholder="999" value={cantidad} required />
                                            <button type="button" onClick={() => setCantidad(cantidad + 1)} disabled={cantidad == 10} className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">Please select a 5 digit number from 0 to 9.</p> */}
                                    </div>

                                    {/* tamaño */}
                                    <div className='mt-6'>
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

                                    {/* Boton agregar - dialog success */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="flex flex-wrap gap-4">
                                                <button type="button" onClick={handleAddToCart} className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-500 hover:shadow-lg focus:ring-2 text-white text-sm font-bold rounded">
                                                    Agregar al carrito
                                                </button>
                                                <ToastContainer />
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md p-4 bg-white rounded-lg shadow">
                                            <DialogHeader>
                                                <DialogTitle style={{ display: 'flex', alignItems: 'center' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px', marginRight: '8px', color: 'green' }}>
                                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                                    </svg>
                                                    Producto agregado
                                                </DialogTitle>
                                            </DialogHeader>
                                            <hr />
                                            <div className="flex my-4">
                                                {/* Product Image */}
                                                <div className="w-1/3">
                                                    <img src={cartImage} alt={producto.nombre} className="rounded-lg shadow-lg" />
                                                </div>
                                                {/* Product Details */}
                                                <div className="w-2/3 ml-4">
                                                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                                                    <p>Cantidad: {cantidad}</p>
                                                    <p>Variación: {variacion?.tamanio}</p>
                                                    <p>Total: ${variacion?.precio * cantidad}</p>
                                                </div>
                                            </div>
                                            <DialogFooter className="flex justify-center mx-auto">
                                                <Link href={'/productos'} className="px-4 py-3 m-2 bg-gray-800 hover:bg-gray-600 hover:shadow-lg focus:ring-2 text-white text-sm font-bold rounded">
                                                    Seguir comprando
                                                </Link>
                                                <Link href={'/pedido'} className="text-center px-4 py-3 m-2 bg-gray-200 hover:bg-gray-300 hover:shadow-lg focus:ring-2 text-gray-800 text-sm font-bold rounded">
                                                    Ver carrito
                                                </Link>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

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
