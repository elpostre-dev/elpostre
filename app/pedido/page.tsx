'use client'

import NavBar from "../../components/Navbar";
import { useCart } from "@/lib/CartContext";
import Footer from "@/components/Footer";
import Link from "next/link";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CartItemProduct from "@/components/CartItemProduct";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Pedido() {

    const { getCart, emptyCart, getTotal, getCartQuantity } = useCart();
    const cant = getCartQuantity();
    const cartItems = getCart();
    const total = getTotal();
    const [loadedCart, setLoadedCart] = useState(false);

    useEffect(() => {
        if (cartItems) {
            setLoadedCart(true);
        }
    }, []);

    const handleEmptyCart = () => {
        emptyCart();
        toast.success("Carrito vaciado", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    };

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />


            {/* MAIN CONTENT */}
            {/* https://pagedone.io/blocks/e-commerce/shopping-cart */}
            {loadedCart == false ?

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

                cartItems.length === 0 ?

                    <>
                        <div className="flex flex-col bg-white" style={{ height: '70vh' }}>
                            <div className="flex flex-1 items-center justify-center">
                                <div className="mx-auto max-w-xl px-4 text-center">
                                    <div className="flex justify-center items-center">
                                        <img className="w-32 h-32 mb-8 rounded-full object-cover"
                                            src="/logos/logo_rojo.jpg"
                                            alt="image empty states" />
                                    </div>
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        Tu carrito esta vacío
                                    </h1>

                                    <p className="mt-2 text-gray-500">
                                        Descubre los productos que tenemos para ti.
                                    </p>

                                    <Link
                                        href="/productos"
                                        className="mt-6 inline-block rounded bg-mainRojo-100 px-5 py-3 text-sm font-medium text-white hover:bg-red-400 hover:shadow-lg focus:outline-none focus:ring"
                                    >
                                        Explorar productos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>

                    :

                    <section
                        className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">

                                    <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Carrito de compras</h2>
                                        {/* <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cant} {cant > 1 ? "Productos" : "Producto"}</h2> */}
                                    </div>

                                    <div className="grid grid-cols-8 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                        <div className="col-span-12 md:col-span-4">
                                            <p className="font-normal text-lg leading-8 text-gray-400">Detalles del producto</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Cantidad</p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center"></p>
                                        </div>
                                    </div>

                                    {/* Productos */}
                                    {cartItems.map((item, index) => (
                                        <CartItemProduct key={index} item={item} />
                                    ))}


                                    <div className="flex items-center justify-between mt-8">

                                        <div className="flex flex-items-center">
                                            <ToastContainer />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button type="button" className="px-4 py-2 m-2 bg-white hover:bg-gray-100 border-red-500 border hover:shadow-lg focus:ring-2 text-red-500 text-sm rounded">
                                                        Vaciar carrito
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>¿Vaciar carrito?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta acción no se puede deshacer.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-red-500" onClick={handleEmptyCart}>Vaciar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                            <Link href={'/productos'} className="flex items-center px-4 py-2 m-2 bg-white hover:bg-gray-100 border-gray-500 border hover:shadow-lg focus:ring-2 text-gray-500 text-sm rounded">
                                                Seguir comprando
                                                <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                                    fill="none">
                                                    <path
                                                        d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                                                        stroke="gray" stroke-width="1.6" stroke-linecap="round" />
                                                </svg>
                                            </Link>
                                        </div>

                                    </div>
                                </div>

                                {/* summary */}
                                <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                                        Resumen del pedido
                                    </h2>

                                    <div className="mt-8">

                                        <div className="flex items-center justify-between pb-6">
                                            <p className="font-normal text-lg leading-8 text-black">{cant} {cant > 1 ? "Productos" : "Producto"}</p>
                                            <p className="font-medium text-lg leading-8 text-black">{formatCurrency(total)} MXN</p>
                                        </div>

                                        <form>
                                            <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                                                Código de descuento
                                            </label>
                                            <div className="flex pb-4 w-full">
                                                <div className="relative w-full ">
                                                    <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">

                                                    </div>
                                                    <input type="text"
                                                        className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                                                        placeholder="xxxx xxxx xxxx" />
                                                </div>
                                            </div>

                                            <div className="flex items-center border-b border-gray-200">
                                                <button onClick={() => console.log('validar')} className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/60 hover:shadow-lg">
                                                    Validar
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between py-8">
                                                <p className="font-medium text-xl leading-8 text-black">{cant} {cant > 1 ? "Productos" : "Producto"}</p>
                                                <p className="font-semibold text-xl leading-8 text-mainRojo-100">{formatCurrency(total)} MXN</p>
                                            </div>

                                            <button onClick={() => console.log('pagar')} className="w-full text-center bg-mainRojo-100 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-400 hover:shadow-lg">
                                                Ir al pago
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

            }



            {/* FOOTER */}
            <Footer />


        </main >
    );
}
