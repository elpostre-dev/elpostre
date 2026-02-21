'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Modal from '@/components/Modal';

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

export default function SingleProduct({ originalProduct }: { originalProduct: Product | null }) {

    const [producto, setProducto] = useState<Product | null>(null);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [tamanio, setTamanio] = useState<any>("");
    const [categoria, setCategoria] = useState<string>("");
    const [productoCargado, setProductoCargado] = useState<Boolean>(false);

    const [cartImage, setCartImage] = useState<string>("");
    const [variacion, setVariacion] = useState<any>(null);
    const [productName, setProductName] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        console.log("originalProduct", originalProduct);
        if (originalProduct) {
            setProductoCargado(true);
            setProducto(originalProduct);
            setCartImage(originalProduct.fotos[0]);
            setCurrentImage(originalProduct.fotos[0]);
            setTamanio(originalProduct.variaciones[0].tamanio);
            setVariacion(originalProduct.variaciones[0]);
            setProductName(originalProduct.nombre);
            if (originalProduct.categoria_id == 1) {
                setCategoria("pasteles");
            } else if (originalProduct.categoria_id == 2) {
                setCategoria("pays");
            } else if (originalProduct.categoria_id == 3) {
                setCategoria("brownies");
            } else if (originalProduct.categoria_id == 4) {
                setCategoria("galletas");
            } else if (originalProduct.categoria_id == 5) {
                setCategoria("keto");
            } else if (originalProduct.categoria_id == 6) {
                setCategoria("muffins-panques");
            } else if (originalProduct.categoria_id == 7) {
                setCategoria("individuales");
            } else if (originalProduct.categoria_id == 8) {
                setCategoria("temporada");
            }
        } else {
            setProductoCargado(true);
            setProducto(null);
        }
    }, [originalProduct]);

    useEffect(() => {
        const variacionNueva = producto?.variaciones.find((v) => v.tamanio === tamanio);
        setVariacion(variacionNueva);
    }, [tamanio]);

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            productId: Number(producto?.id),
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
        // router.push("/carrito");
    };


    // https://readymadeui.com/tailwind/ecommerce/ecommerce-product-view-template
    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {!productoCargado ?

                <div className="flex-grow flex items-center justify-center">
                    <div role="status" className="flex flex-col items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>

                :

                producto == null ?

                    <div className="flex flex-col bg-white" style={{ height: '60vh' }}>

                        <div className="flex flex-1 items-center justify-center">
                            <div className="mx-auto max-w-xl px-4 text-center">
                                <h1 className="text-9xl font-extrabold text-gray-500 opacity-50">404</h1>
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Lo sentimos
                                </h1>

                                <p className="mt-4 text-gray-500">
                                    La página que buscas no existe o fue eliminada.
                                </p>

                                <a
                                    href="/"
                                    className="mt-6 inline-block rounded bg-mainAmarillo-100 px-5 py-3 text-sm font-medium text-white hover:bg-yellow-700 hover:shadow-lg focus:outline-none focus:ring"
                                >
                                    Volver al inicio
                                </a>
                            </div>
                        </div>
                    </div>

                    :

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
                                            <Link href="/#productos">Productos</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={`/productos/${categoria}`}>{producto.categoria_nombre}</Link>
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
                                            <Image
                                                src={currentImage || "/placeholder.svg"}
                                                alt="Product"
                                                className="rounded-xl object-contain max-h-[420px]"
                                                width={900}
                                                height={900}
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-x-8 gap-y-6 justify-center mx-auto mt-6">
                                            {producto.fotos.map((foto, index) => (
                                                <Image
                                                    key={index}
                                                    src={foto || "/placeholder.svg"}
                                                    alt="Product"
                                                    className="w-20 cursor-pointer rounded-xl object-contain border"
                                                    onClick={() => setCurrentImage(foto)}
                                                    width={80}
                                                    height={80}
                                                    sizes="80px"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Detalles */}
                                    <div>


                                        {/* nombre */}
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-mainRojo-100 uppercase">{producto.nombre}</h2>
                                            <p className="text-md text-gray-400 mt-2">{producto.categoria_nombre}</p>
                                        </div>

                                        <hr className="my-8" />

                                        {/* descripcion */}
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">Descripción</h3>
                                            <p className="text-gray-400 text-lg my-2">
                                                {producto.descripcion}
                                            </p>
                                            {
                                                producto.categoria_id == 1 || producto.id == 37 || producto.id == 38 ?
                                                    <div className="flex flex-wrap gap-4">
                                                        <button
                                                            type="button"
                                                            className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-500 hover:shadow-lg focus:ring-2 text-white text-sm font-bold rounded"
                                                            onClick={openModal}
                                                        >
                                                            Ver tamaños
                                                        </button>
                                                        <Modal
                                                            isOpen={isModalOpen}
                                                            onClose={closeModal}
                                                            title={"Referencia de tamaños"}
                                                            imageSrc={producto.categoria_id == 1 ? "/tamanios/tamanios_pasteles.jpg" : "/tamanios/tamanios_galletas.jpg"}
                                                        />
                                                    </div>
                                                    :
                                                    <></>
                                            }
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
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                                                    placeholder="999" value={cantidad} required />
                                                <button type="button" onClick={() => setCantidad(cantidad + 1)} disabled={cantidad == 5} className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                    <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
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
                                        {producto?.en_venta ?
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="flex flex-wrap gap-4">
                                                        <button type="button" onClick={handleAddToCart} className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-500 hover:shadow-lg focus:ring-2 text-white text-sm font-bold rounded">
                                                            Agregar al carrito
                                                        </button>
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
                                                            <Image
                                                                src={cartImage || "/placeholder.svg"}
                                                                alt={producto.nombre}
                                                                className="rounded-lg shadow-lg"
                                                                width={600}
                                                                height={600}
                                                                sizes="33vw"
                                                            />
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
                                                        <Link href={'/carrito'} className="text-center px-4 py-3 m-2 bg-gray-200 hover:bg-gray-300 hover:shadow-lg focus:ring-2 text-gray-800 text-sm font-bold rounded">
                                                            Ver carrito
                                                        </Link>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            :
                                            <></>
                                        }

                                        <ToastContainer />

                                    </div>
                                </div>


                            </div>
                        </div>

                    </>

            }



            {/* FOOTER */}
            <Footer />


        </main>
    );
};
