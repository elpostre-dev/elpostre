'use client'

import NavBar from "../../components/Navbar";
import { useCart } from "@/lib/CartContext";
import Footer from "@/components/Footer";
import Link from "next/link";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

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
import { Button } from "@/components/ui/button"

export default function Pedido() {

    const { getCart, emptyCart, getTotal, getCartQuantity } = useCart();
    const cant = getCartQuantity();
    const cartItems = getCart();
    const total = getTotal();

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
            // theme: "colored",
        })
    };

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />


            {/* MAIN CONTENT */}
            <section
                className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">

                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Carrito de compras</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cant} Productos</h2>
                            </div>

                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Detalles del producto</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Cantidad</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Productos */}
                            {cartItems.map((item, index) => (
                                <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">

                                    {/* photo */}
                                    <div className="w-full md:max-w-[126px]">
                                        <img src={item.photo} alt="perfume bottle image" className="mx-auto w-full md:h-[100px] h-[200px] rounded object-cover" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">

                                        {/* info */}
                                        <div className="md:col-span-2">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                <p className="font-semibold text-black">
                                                    {item.nombre} <br /> <span className="font-normal">{item.variacion.tamanio}</span>
                                                </p>
                                                {/* <p className="font-normal text-gray-500">{item.variacion.tamanio}</p> */}
                                                <p className="font-medium text-gray-600 transition-all duration-300 group-hover:text-mainRojo-100">{formatCurrency(item.variacion.precio)}</p>
                                            </div>
                                        </div>

                                        {/* cantidad */}
                                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                            <div className="flex items-center h-full">
                                                <button
                                                    className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                        viewBox="0 0 22 22" fill="none">
                                                        <path d="M16.5 11H5.5" stroke="" stroke-width="1.6"
                                                            stroke-linecap="round" />
                                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                            stroke-linecap="round" />
                                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                            stroke-linecap="round" />
                                                    </svg>
                                                </button>
                                                <input type="text"
                                                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                                                    value={item.cantidad} />
                                                <button
                                                    className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                        viewBox="0 0 22 22" fill="none">
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                                            stroke-linecap="round" />
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                                            stroke-width="1.6" stroke-linecap="round" />
                                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                                            stroke-width="1.6" stroke-linecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* precio */}
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-mainRojo-100">{formatCurrency(item.variacion.precio * item.cantidad)}</p>
                                        </div>

                                    </div>
                                </div>
                            ))}


                            <div className="flex items-center justify-between mt-8">

                                <div className="flex flex-items-center">
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

                                <ToastContainer />
                                {/* <button
                                    className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-mainRojo-100 shadow-sm shadow-transparent transition-all duration-500 hover:text-mainRojo-100">
                                    Código de descuento
                                    <svg className="transition-all duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
                                        <path
                                            d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                                            stroke="#ee4542" stroke-width="1.6" stroke-linecap="round" />
                                    </svg>
                                </button> */}
                            </div>
                        </div>

                        {/* summary */}
                        <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                                Resumen del pedido
                            </h2>

                            <div className="mt-8">

                                <div className="flex items-center justify-between pb-6">
                                    <p className="font-normal text-lg leading-8 text-black">{cant} Productos</p>
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
                                        <p className="font-medium text-xl leading-8 text-black">{cant} Productos</p>
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



            {/* FOOTER */}
            <Footer />


        </main>
    );
}
