import { CartItem } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CartItemProduct({ item }: { item: CartItem }) {

    const { editCartItem, removeCartItem } = useCart();

    const handleQuantityMinus = () => {
        editCartItem(item.productId, item.variacion.tamanio, { cantidad: item.cantidad - 1 });
    };

    const handleQuantityPlus = () => {
        editCartItem(item.productId, item.variacion.tamanio, { cantidad: item.cantidad + 1 });
    };

    const handleRemoveItem = () => {
        removeCartItem(item.productId, item.variacion.tamanio);
        toast.success("Producto eliminado", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <>
            <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group" key={item.nombre}>

                {/* photo */}
                <div className="w-full md:max-w-[126px]">
                    <img src={item.photo} alt="perfume bottle image" className="mx-auto w-full md:h-[100px] h-[200px] rounded object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 w-full">

                    {/* info */}
                    <div className="md:col-span-3">
                        <div className="flex flex-col max-[500px]:items-center gap-3">
                            <p className="font-semibold text-black">
                                {item.nombre} <br /> <span className="font-normal">{item.variacion.tamanio}</span>
                            </p>
                            {/* <p className="font-normal text-gray-500">{item.variacion.tamanio}</p> */}
                            <p className="font-medium text-gray-600 transition-all duration-300 group-hover:text-mainRojo-100">{formatCurrency(item.variacion.precio)} c/u</p>
                        </div>
                    </div>


                    {/* cantidad */}
                    <div className="flex items-center justify-between w-full md:h-full max-md:mt-3 md:col-span-2">

                        <div className="flex items-center h-full mx-auto md:mx-0">

                            {/* minus */}
                            <button
                                onClick={handleQuantityMinus}
                                disabled={item.cantidad == 1}
                                className="group rounded-l-xl px-3 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                    xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    viewBox="0 0 22 22" fill="none">
                                    <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                        strokeLinecap="round" />
                                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                        strokeLinecap="round" />
                                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                        strokeLinecap="round" />
                                </svg>
                            </button>

                            {/* number */}
                            <input type="text"
                                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[60px] min-w-[50px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                                value={item.cantidad} />

                            {/* plus */}
                            <button
                                onClick={handleQuantityPlus}
                                disabled={item.cantidad >= 10}
                                className="group rounded-r-xl px-3 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                    xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    viewBox="0 0 22 22" fill="none">
                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                        strokeLinecap="round" />
                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                        strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                        strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </button>

                        </div>
                    </div>

                    {/* precio */}
                    <div className="flex items-center justify-start max-md:mt-3 md:h-full md:col-span-1 mx-auto md:mx-0">
                        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-mainRojo-100">{formatCurrency(item.variacion.precio * item.cantidad)}</p>
                    </div>

                    {/* borrar */}
                    <div className="flex items-center md:justify-center max-md:mt-3 md:h-full md:col-span-1 mx-auto md:mx-0">
                        <button onClick={handleRemoveItem} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-800 hover:shadow-lg text-white text-sm font-medium rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 md:m-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="block md:hidden">Eliminar</span>
                        </button>
                    </div>

                    <ToastContainer />

                </div>
            </div>
        </>
    )
}