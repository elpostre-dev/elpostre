'use client'

import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contacto from "@/components/Contacto";
import bgImage from "../public/home.jpg";

import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { productos } from "@/data/productos";
import { useState, useEffect } from "react";


export default function Home() {

  // const bestsellerIds = [2, 29, 35, 16, 37, 38, 14];
  const bestsellerIds = [2, 29, 16, 14];
  const bestsellers = productos.filter(producto => bestsellerIds.includes(producto.id));

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Efecto para actualizar el contador de imágenes en el carousel
  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Imágenes y textos para el carousel de promociones
  const images = [
    {
      url: "/Individuales/COPITAS.jpg",
      title: 'Martes de Copitas',
      description: "¡Disfruta de un pastel mediano o grande y recibe una copita gratis! Solo válida en sucursal los martes.",
    },
    // {
    //   url: "/sucursal.jpg",
    //   title: "Descuento de Cumpleaños",
    //   description: "Celebra tu cumpleaños con un 20% de descuento en cualquier pastel grande. Solo válida en sucursal con identificación.",
    // },
    // {
    //   url: "/home.jpg",
    //   title: "Autenticidad, comodidad y simpleza",
    //   description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    // },
  ];

  // Estado para controlar la visibilidad del banner
  const [isVisible, setIsVisible] = useState(false);

  // Al montar el componente, verifica si el banner ya fue cerrado anteriormente
  useEffect(() => {
    const isBannerClosed = localStorage.getItem('bannerClosed');
    if (isBannerClosed != 'true') {
      setIsVisible(true);
    }
  }, []);

  // Función para ocultar el banner y guardar esta información en el localStorage
  const hideBanner = () => {
    setIsVisible(false);
    localStorage.setItem('bannerClosed', 'true');
  };

  return (
    <main className="flex min-h-screen flex-col">

      {/* NAVBAR */}
      <NavBar />


      {/* FOTO background y TEXTO */}
      <section
        className="bg-center bg-no-repeat bg-blend-multiply bg-cover"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          // backgroundColor: "rgba(12, 64, 104, 0.8)",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundAttachment: "fixed",
          // opacity: "0.5",
          height: "91vh",
        }}
      >
        {/* <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Expertos en soluciones legales e inmobiliarias
          </h1>
          <p className="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Nos diferenciamos en estrategias y soluciones de diagnóstico inmobiliario para ayudar a los clientes en situaciones personales y problemáticas de negocio.
          </p>
        </div> */}
      </section>


      {/* Best Sellers */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">

          <h2 className="text-3xl font-semibold tracking-tight text-mainRojo-100 text-center">
            Conoce nuestros bestsellers
            <hr className="bg-mainRojo-100 h-1 my-5 mb-10 mx-auto" style={{ width: '10%' }} />
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {bestsellers.map(producto => (
              <>
                <Link href={`/productos/${producto.id}`} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-50 h-80">
                    <img src={producto.fotos[0]} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-md text-gray-700 font-semibold">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {producto.nombre}
                      </h3>
                      <p className="mt-1 text-sm font text-gray-500">{producto.categoriaNombre}</p>
                    </div>
                    {/* <p className="text-md font-medium text-gray-900">$500</p> */}
                  </div>
                </Link>
              </>

            ))}


          </div>

        </div>
      </div>


      {/* CAROUSEL promociones */}
      <div className="mx-auto w-full">

        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-mainRojo-100">
            Promociones actuales
            <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
          </h2>
        </div>

        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          setApi={setApi}
          className="bg-slate-50"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="bg-center bg-no-repeat bg-blend-multiply bg-neutral-600 bg-cover"
                style={{
                  backgroundImage: `url(${image.url})`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                  // backgroundAttachment: "fixed",
                  // opacity: "0.5",
                  height: "50vh",
                }}>
                <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                  <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-black text-gray-100">
                      {image.title}
                    </h1>
                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center sm:text-xl text-lg">
                      {image.description}
                    </p>
                  </div>
                  {/* <div className="flex justify-center items-center">
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-azulito-100 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-azulito-100 py-2 sm:py-4 text-sm">Get Started</button>
                    <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-azulito-100 text-azulito-100 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button>
                  </div> */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center my-4">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 mx-1 md:w-4 md:h-4 md:mx-2 rounded-full ${index === current - 1 ? "bg-mainRojo-100" : "bg-gray-400"
                }`}
            ></span>
          ))}
        </div>
      </div>


      {/* OPINIONES */}
      <div className="container my-10 mt-14 mb-24 mx-auto md:px-6">

        <div className="mx-auto max-w-2xl px-4 py-8 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-mainRojo-100">
            Opiniones de clientes
            <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
          </h2>
        </div>

        <section className="text-center">

          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">


            {/* Rating #1 */}
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img src="/logos/logo_rojo.jpg"
                  className="w-20 rounded-full shadow-lg" />
              </div>
              {/* <h5 className="text-lg font-bold">Lisa Cudrow</h5> */}
              <h6 className="mb-4 font-medium text-slate-800">
                Opiniones de Google
              </h6>
              <p className="mb-4 text-gray-700">
                Los pasteles más ricos de Monterrey! Pasteles, pays de queso con fruta o de chocolate, brownies y más! Perfecto para cualquier antojo!
              </p>

              <ul className="mb-0 flex justify-center">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>


            {/* Rating #2 */}
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img src="/logos/logo_rojo.jpg"
                  className="w-20 rounded-full shadow-lg" />
              </div>
              {/* <h5 className="text-lg font-bold">Maria Smantha</h5> */}
              <h6 className="mb-4 font-medium text-slate-800">
                Opiniones de Google
              </h6>
              <p className="mb-4 text-gray-700">
                Siempre es calidad lo que llevamos a casa y si quieres quedar bien con un detalle, es garantía las galletas o un pastelito. Pudiera parecer costoso pero vale la pena. Sin duda gran sabor y calidad.
              </p>

              <ul className="mb-0 flex justify-center">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>


            {/* Rating #3 */}
            <div className="mb-0">
              <div className="mb-6 flex justify-center">
                <img src="/logos/logo_rojo.jpg"
                  className="w-20 rounded-full shadow-lg" />
              </div>
              {/* <h5 className="text-lg font-bold">John Smith</h5> */}
              <h6 className="mb-4 font-medium text-slate-800">
                Opiniones de Google
              </h6>
              <p className="mb-4 text-gray-700">
                Deliciosos pasteles, hace 3 años que siempre venimos aqui a comprar para los cumpleaños de todos.
              </p>

              <ul className="mb-0 flex justify-center">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-mainAmarillo-100">
                    <path fill="currentColor"
                      d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>


          </div>
        </section>
      </div>

      {/* OPCIONES DE COMPRA */}
      {/* <div className="flex flex-col my-10 pt-10">
        <div className="container max-w-7xl px-4">

          <div className="flex flex-wrap justify-center">

            <div className="w-full md:w-4/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col">
                <a className="mx-auto">
                  <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 shadow p-10 object-contain"
                    src="logos/sucursal.png" style={{ height: '200px' }} />
                </a>

                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1">
                    Rappi
                  </h1>

                  <div className="text-gray-700 font-light mb-2">
                    Pide a domicilio y recibelo de inmediato.
                  </div>

                  <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                    <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                      <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                    </a>

                    <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                      <i className="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                    </a>

                    <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
                      <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col">
                <a className="mx-auto">
                  <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 shadow p-10 object-contain"
                    src="logos/rappi_2.png" style={{ height: '200px' }} />
                </a>

                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1">
                    Rappi
                  </h1>

                  <div className="text-gray-700 font-light mb-2">
                    Pide a domicilio y recibelo de inmediato.
                  </div>

                  <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                    <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                      <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                    </a>

                    <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                      <i className="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                    </a>

                    <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
                      <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col">
                <a className="mx-auto">
                  <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 shadow p-10 object-contain"
                    src="logos/devices.png" style={{ height: '200px' }} />
                </a>

                <div className="text-center mt-6">
                  <h1 className="text-gray-900 text-xl font-bold mb-1">
                    Rappi
                  </h1>

                  <div className="text-gray-700 font-light mb-2">
                    Pide a domicilio y recibelo de inmediato.
                  </div>

                  <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                    <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                      <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                    </a>

                    <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                      <i className="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                    </a>

                    <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
                      <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> */}


      {/* DIRECCION y CONTACTO */}
      <Contacto />


      {/* FOOTER */}
      <Footer />


      {/* BANNER */}
      {isVisible && (
        <div id="bottom-banner" tabIndex={1} className="fixed bottom-0 start-0 z-50 flex justify-between w-full p-6 bg-mainRojo-100">
          <div className="flex items-center mx-auto">
            <p className="flex items-center text-lg font-normal text-gray-200">
              <span className="inline-flex p-1 me-3 bg-mainRosa-100 rounded-full w-8 h-8 items-center justify-center">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18.435 7.546A2.32 2.32 0 0 1 17.7 5.77a3.354 3.354 0 0 0-3.47-3.47 2.322 2.322 0 0 1-1.776-.736 3.357 3.357 0 0 0-4.907 0 2.281 2.281 0 0 1-1.776.736 3.414 3.414 0 0 0-2.489.981 3.372 3.372 0 0 0-.982 2.49 2.319 2.319 0 0 1-.736 1.775 3.36 3.36 0 0 0 0 4.908A2.317 2.317 0 0 1 2.3 14.23a3.356 3.356 0 0 0 3.47 3.47 2.318 2.318 0 0 1 1.777.737 3.36 3.36 0 0 0 4.907 0 2.36 2.36 0 0 1 1.776-.737 3.356 3.356 0 0 0 3.469-3.47 2.319 2.319 0 0 1 .736-1.775 3.359 3.359 0 0 0 0-4.908ZM8.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 9.063a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.207-6.856-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Discount</span>
              </span>
              <span>
                Visita nuestra nueva
                <a href="/productos" className="items-center text-lg font-bold text-gray-200 ms-1 inline-flex hover:underline">
                  tienda en línea
                  <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <button onClick={hideBanner} type="button" className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      )}


    </main>
  );
}
