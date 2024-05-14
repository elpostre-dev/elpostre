'use client'

import NavBar from "../../components/Navbar";
import { useCart } from "@/lib/CartContext";
import Footer from "@/components/Footer";
import Link from "next/link";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CartItemProduct from "@/components/CartItemProduct";
import { formatCurrency } from "@/lib/utils";
import { useState, useEffect, use } from "react";
import { cn } from "@/lib/utils"

import { loadStripe } from "@stripe/stripe-js";

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

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

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import { format } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz'
import { es } from 'date-fns/locale'; // Importa el locale español


export default function Carrito() {

    const { getCart, emptyCart, getTotal, getCartQuantity } = useCart();
    const cant = getCartQuantity();
    const cartItems = getCart();
    const total = getTotal();
    const [loadedCart, setLoadedCart] = useState(false);

    const [isCarritoOpen, setIsCarritoOpen] = useState(true);
    const [isDatosClienteOpen, setIsDatosClienteOpen] = useState(true);
    const [emptyFieldsError, setEmptyFieldsError] = useState(false);

    // Codigo de descuento
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [searchingDiscount, setSearchingDiscount] = useState(false);

    // Datos del cliente
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [pickupPerson, setPickupPerson] = useState('');
    const [date, setDate] = useState<Date>()
    const [pickupTime, setPickupTime] = useState('');
    const [messageClient, setMessageClient] = useState('');

    const horas = [
        "10:00 AM - 12:00 PM",
        "12:00 PM - 02:00 PM",
        "02:00 PM - 04:00 PM",
        "04:00 PM - 06:00 PM",
        "06:00 PM - 08:00 PM",
    ];

    const handleEmailChange = () => {
        if (validateEmail(email)) {
            setEmailError(false); // No error
        } else {
            setEmailError(true);
        }
    };

    const validateEmail = (email: any) => {
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expression.test(String(email).toLowerCase());
    };

    const handlePhoneChange = () => {
        if (validatePhone(phone)) {
            setPhoneError(false); // No error
        } else {
            setPhoneError(true);
        }
    };

    const validatePhone = (phoneNum: any) => {
        const isValid = /^\d+$/.test(phoneNum);
        return (isValid && phoneNum.length >= 7);
    };

    const validateCode = async () => {
        setSearchingDiscount(true);
        try {
            const response = await fetch(`/api/validate-discounts`, {
                method: "POST",
                body: JSON.stringify({ code: code })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Código válido. Descuento del ${data.percentage}% aplicado.`);
                setIsCodeValid(true);
                setDiscount(data.percentage / 100);
                setSearchingDiscount(false);
            } else {
                setMessage('Código inválido. Intente de nuevo.');
                setIsCodeValid(false);
                setDiscount(0);
                setSearchingDiscount(false);
            }

        } catch (error) {
            console.log('error', error);
        }
    };

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

    // const router = useRouter();

    const handleFinalizarCompra = async () => {

        if (name.length === 0 || email.length === 0 || phone.length === 0 || pickupPerson.length === 0 || !date || pickupTime.length === 0 || emailError || phoneError) {

            setEmptyFieldsError(true);

        } else {

            setEmptyFieldsError(false);
            // console.log('=====================================');
            // console.log('name', name)
            // console.log('email', email)
            // console.log('phone', phone)
            // console.log('pickupPerson', pickupPerson)
            const formattedDate = '';
            if (date) {
                const formattedDate = format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
                // console.log('date', formattedDate); // Ejemplo: 'martes 3 de abril, 2024'
            }
            // console.log('pickupTime', pickupTime)
            // console.log('messageClient', messageClient)
            // console.log('=====================================');

            const temp_prods = cartItems.map((item) => {
                return {
                    id: item.productId,
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.variacion.precio,
                    tamanio: item.variacion.tamanio,
                }
            });

            const order_info = {
                total: total * (1 - discount),
                name,
                email,
                phone,
                pickupPerson,
                formattedDate,
                pickupTime,
                messageClient,
            }

            try {
                const stripe = await asyncStripe;
                const res = await fetch(`/api/stripe/session`, {
                    method: "POST",
                    body: JSON.stringify({
                        products: temp_prods,
                        orderInfo: order_info,
                        code,
                    })
                });

                if (res.ok) {
                    console.log('response is ok')
                } else {
                    console.log('response is NOT ok')
                }

                const { sessionId } = await res.json();
                if (stripe) {
                    const { error } = await stripe.redirectToCheckout({ sessionId });
                    console.log(error);
                    if (error) {
                        // router.push("/error");
                        console.log("Stripe error 1", error.message)
                    }
                } else {
                    console.log("Stripe is null");
                }
            } catch (err) {
                console.log(err);
                // router.push("/error");
                console.log("Stripe error 2")
            }
        }
    }

    const handler = async () => {

        const temp_prods = cartItems.map((item) => {
            return {
                id: item.productId,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precio: item.variacion.precio,
                tamanio: item.variacion.tamanio,
            }
        });

        try {
            const stripe = await asyncStripe;
            const res = await fetch(`/api/stripe/session`, {
                method: "POST",
                body: JSON.stringify({
                    products: temp_prods,
                    total: total * (1 - discount),
                    name,
                    email,
                    phone,
                    pickupPerson,
                    date,
                    pickupTime,
                    messageClient,
                    code,
                })
            });

            if (res.ok) {
                // const data = await res.json();
                console.log('response is ok')
            } else {
                console.log('response is NOT ok')
            }

            const { sessionId } = await res.json();
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({ sessionId });
                console.log(error);
                if (error) {
                    // router.push("/error");
                    console.log("Stripe error 1", error.message)
                }
            } else {
                console.log("Stripe is null");
            }
        } catch (err) {
            console.log(err);
            // router.push("/error");
            console.log("Stripe error 2")
        }
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

                                <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-20 w-full max-xl:max-w-3xl max-xl:mx-auto">

                                    {/* CARRITO */}
                                    <Collapsible
                                        open={isCarritoOpen}
                                        onOpenChange={setIsCarritoOpen}
                                    >

                                        <CollapsibleTrigger className="flex items-center justify-between py-6 px-4 cursor-pointer w-full hover:bg-gray-100">
                                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Carrito de compras</h2>
                                            {isCarritoOpen ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                </svg>

                                            }

                                        </CollapsibleTrigger>

                                        <hr />

                                        <CollapsibleContent>

                                            {/* header */}
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

                                            {/* Botones */}
                                            <div className="flex items-center justify-between my-8">

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
                                                                stroke="gray" strokeWidth="1.6" strokeLinecap="round" />
                                                        </svg>
                                                    </Link>
                                                </div>

                                            </div>

                                        </CollapsibleContent>

                                    </Collapsible>

                                    {/* INFORMACION DEL PEDIDO */}
                                    {/* https://flowbite.com/blocks/e-commerce/checkout/ */}
                                    <Collapsible
                                        open={isDatosClienteOpen}
                                        onOpenChange={setIsDatosClienteOpen}
                                    >

                                        <CollapsibleTrigger className="flex items-center justify-between py-6 px-4 cursor-pointer w-full hover:bg-gray-100">
                                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Información del pedido</h2>
                                            {isDatosClienteOpen ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                </svg>

                                            }

                                        </CollapsibleTrigger>

                                        <hr />

                                        <CollapsibleContent>

                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8">

                                                {/* nombre */}
                                                <div>
                                                    <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900">Nombre <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        id="your_name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                                        placeholder="Ingresa nombre..."
                                                        required
                                                    />
                                                </div>

                                                {/* email */}
                                                <div>
                                                    <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-gray-900">
                                                        Email <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="your_email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        onBlur={handleEmailChange}
                                                        className={cn("block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500",
                                                            emailError && "border-red-500"
                                                        )}
                                                        placeholder="Ingresa email..."
                                                        required
                                                    />
                                                </div>

                                                {/* Número de teléfono */}
                                                <div>
                                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">Número de teléfono <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        onBlur={handlePhoneChange}
                                                        className={cn("block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500",
                                                            phoneError && "border-red-500"
                                                        )}
                                                        placeholder="Ingresa numero..."
                                                        required
                                                    />
                                                </div>

                                                {/* persona que recoge */}
                                                <div>
                                                    <label htmlFor="pickupPerson" className="mb-2 block text-sm font-medium text-gray-900">Persona que recoge <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        id="pickupPerson"
                                                        value={pickupPerson}
                                                        onChange={(e) => setPickupPerson(e.target.value)}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                                        placeholder="Ingresa nombre..."
                                                        required
                                                    />
                                                </div>

                                                {/* pickup date */}
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-900">Fecha de recogida <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "justify-start text-left font-normal w-full bg-gray-50 border-gray-300 focus:border-primary-500 focus:ring-primary-500",
                                                                    !date && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 h-4 w-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                                </svg>

                                                                {date ? format(date, "PPP") : <span>Selecciona fecha...</span>}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                onSelect={setDate}
                                                                disabled={(date) => {
                                                                    const today = new Date();
                                                                    formatInTimeZone(today, 'America/Monterrey', 'yyyy-MM-dd HH:mm:ss zzz');

                                                                    const startDate = new Date();
                                                                    startDate.setDate(today.getDate());
                                                                    formatInTimeZone(startDate, 'America/Monterrey', 'yyyy-MM-dd HH:mm:ss zzz');

                                                                    const endDate = new Date();
                                                                    endDate.setDate(today.getDate() + 9);
                                                                    formatInTimeZone(endDate, 'America/Monterrey', 'yyyy-MM-dd HH:mm:ss zzz');

                                                                    return date < startDate || date > endDate;
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                {/* pickup time */}
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-900">Hora de recogida <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <Select
                                                        value={pickupTime}
                                                        defaultValue={"producto.variaciones[0].tamanio"}
                                                        onValueChange={value => setPickupTime(value)}
                                                    >
                                                        <SelectTrigger
                                                            className={cn(
                                                                "w-full bg-gray-50 border-gray-300 focus:border-primary-500 focus:ring-primary-500 text-gray-900",
                                                                !pickupTime && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <SelectValue placeholder="Selecciona hora..." />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-gray-50 border-gray-300 focus:border-primary-500 focus:ring-primary-500">
                                                            <SelectGroup>
                                                                {/* <SelectLabel>Fruits</SelectLabel> */}
                                                                {horas.map((hora, index) => (
                                                                    <SelectItem
                                                                        className="bg-white"
                                                                        key={index}
                                                                        value={hora}>
                                                                        {hora}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-1 mt-4">

                                                {/* Comentarios */}
                                                <label htmlFor="comments" className="mb-2 block text-sm font-medium text-gray-900">Comentarios del pedido</label>
                                                <Textarea
                                                    value={messageClient}
                                                    onChange={(e) => setMessageClient(e.target.value)}
                                                    placeholder="Escribe un comentario..."
                                                    className="bg-gray-50 border-gray-300"
                                                />

                                            </div>

                                        </CollapsibleContent>

                                    </Collapsible>

                                </div>

                                {/* summary */}
                                <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 md:py-24 sm:py-14 py-10">
                                    <div className="sticky md:top-28 md:right-0">
                                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                                            Resumen del pedido
                                        </h2>

                                        <div className="mt-8">

                                            <div className="flex items-center justify-between pb-2">
                                                <p className="font-light text-lg leading-8 text-black">{cant} {cant > 1 ? "Productos" : "Producto"}</p>
                                                <p className="font-light text-lg leading-8 text-black">{formatCurrency(total)} MXN</p>
                                            </div>

                                            {discount > 0 &&
                                                <>
                                                    <div className="flex items-center justify-between pb-2">
                                                        <p className="font-light text-lg leading-8 text-black">Descuento {discount * 100}%</p>
                                                        <p className="font-light text-lg leading-8 text-black">-{formatCurrency(total * discount)} MXN</p>
                                                    </div>

                                                    <div className="flex items-center justify-between pb-6">
                                                        <p className="font-bold text-lg leading-8 text-black">Total</p>
                                                        <p className="font-bold text-lg leading-8 text-black">{formatCurrency(total * (1 - discount))} MXN</p>
                                                    </div>
                                                </>
                                            }

                                            <div>

                                                {/* DESCUENTO */}
                                                <label className="flex items-center mb-1.5 pt-4 text-gray-400 text-sm font-medium">
                                                    Código de descuento
                                                </label>
                                                <div className="flex pb-4 w-full">
                                                    <div className="relative w-full ">
                                                        <input type="text"
                                                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                                                            placeholder="Ingresa código..."
                                                            value={code}
                                                            disabled={searchingDiscount || isCodeValid}
                                                            onChange={(e) => setCode(e.target.value)} />
                                                    </div>
                                                </div>

                                                {message && <p className="mb-2 italic">{message}</p>}

                                                <div className="flex items-center border-b border-gray-200">
                                                    <button
                                                        type="button"
                                                        onClick={validateCode}
                                                        disabled={searchingDiscount || code.length <= 0 || isCodeValid}
                                                        className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/60 hover:shadow-lg"
                                                    >
                                                        {
                                                            searchingDiscount ?
                                                                'Validando...'
                                                                :
                                                                isCodeValid ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>
                                                                    :
                                                                    'Validar'
                                                        }
                                                    </button>
                                                </div>


                                                {/* FINALIZAR COMPRA */}
                                                <div className="flex items-center justify-between py-8">
                                                    <p className="font-medium text-xl leading-8 text-black">Total</p>
                                                    <p className="font-semibold text-xl leading-8 text-mainRojo-100">{formatCurrency(
                                                        discount > 0 ? total * (1 - discount) : total
                                                    )} MXN</p>
                                                </div>

                                                {emptyFieldsError && <p className="mb-2 italic text-red-500 flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                    </svg>
                                                    Favor de llenar correctamente todos los campos requeridos
                                                </p>}

                                                <button onClick={handleFinalizarCompra} className="w-full text-center bg-mainRojo-100 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-400 hover:shadow-lg">
                                                    Finalizar compra
                                                </button>
                                            </div>
                                        </div>
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
