'use client'

import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"

import NavBar from "./components/Navbar";
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


export default function Home() {

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

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

  const images = [
    {
      url: "/home.jpg",
      title: '"Coolest t-shirts in town"',
      description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    },
    {
      url: "/home.jpg",
      title: "Encuéntranos en tienda",
      description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    },
    {
      url: "/home.jpg",
      title: "Autenticidad, comodidad y simpleza",
      description: "A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online",
    },
  ];

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
          height: "90vh",
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

            {/* Producto #1 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-50 lg:h-80">
                <img src="/Brownies/BROWNIES_GLASS.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700 font-semibold">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Brownie Glass
                    </a>
                  </h3>
                  <p className="mt-1 text-sm font text-gray-500">Brownies</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

            {/* Producto #2 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-50 lg:h-80">
                <img src="/Galletas/CHOCOCHIP.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700 font-semibold">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Chocochips
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Galletas</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

            {/* Producto #3 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-50 lg:h-80">
                <img src="/Pasteles/PASTEL_BROWNIE.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700 font-semibold">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Pastel Brownie
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Pastel</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

            {/* Producto #4 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-50 lg:h-80">
                <img src="/Individuales/COPITAS.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700 font-semibold">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Copitas
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Individuales</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* CAROUSEL */}
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
                className="bg-center bg-no-repeat bg-blend-multiply bg-neutral-500 bg-cover"
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
                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
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
      <div className="container my-10 mt-14 mb-28 mx-auto md:px-6">

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
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                  className="w-32 rounded-full shadow-lg" />
              </div>
              <h5 className="text-lg font-bold">Maria Smantha</h5>
              <h6 className="mb-4 font-medium text-slate-800">
                Web Developer
              </h6>
              <p className="mb-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
                id officiis hic tenetur quae quaerat ad velit ab hic.
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
                      d="m480 757 157 95-42-178 138-120-182-16-71-168v387ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                  </svg>
                </li>
              </ul>

            </div>


            {/* Rating #2 */}
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg"
                  className="w-32 rounded-full shadow-lg" />
              </div>
              <h5 className="text-lg font-bold">Lisa Cudrow</h5>
              <h6 className="mb-4 font-medium text-slate-800">
                Graphic Designer
              </h6>
              <p className="mb-4 text-gray-700">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam
                corporis suscipit laboriosam, nisi ut aliquid commodi.
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
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
                  className="w-32 rounded-full shadow-lg" />
              </div>
              <h5 className="text-lg font-bold">John Smith</h5>
              <h6 className="mb-4 font-medium text-slate-800">
                Marketing Specialist
              </h6>
              <p className="mb-4 text-gray-700">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti.
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
                      d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z" />
                  </svg>
                </li>
              </ul>

            </div>


          </div>
        </section>
      </div>


      {/* DIRECCION */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 ">

          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Visit Our Location</h2>
            <p className="mt-4 text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                  width="100%" height="480" style={{ border: 0 }} allowFullScreen={false} loading="lazy"></iframe>
              </div>
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Our Address</h3>
                    <p className="mt-1 text-gray-600">123 Main St, San Francisco, CA 94105</p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                    <p className="mt-1 text-gray-600">Monday - Friday: 9am - 5pm</p>
                    <p className="mt-1 text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="mt-1 text-gray-600">Sunday: Closed</p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                    <p className="mt-1 text-gray-600">Email: info@example.com</p>
                    <p className="mt-1 text-gray-600">Phone: +1 23494 34993</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-gray-100 p-10">
        <div className="mx-auto max-w-screen-xl text-center">

          <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900">
            <Image src="/logos/logo_dorado.png" height={80} width={160} alt="icon"></Image>
          </a>


          {/* <p className="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p> */}
          <ul className="flex flex-wrap justify-center items-center my-3 text-gray-900 dark:text-white">
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">Inicio</a>
            </li>
            <li>
              <a href="/productos" className="mr-4 hover:underline md:mr-6">Productos</a>
            </li>
            <li>
              <a href="/nosotros" className="mr-4 hover:underline md:mr-6 ">Nosotros</a>
            </li>
            <li>
              <a href="/pedido" className="mr-4 hover:underline md:mr-6 ">Haz tu pedido</a>
            </li>
          </ul>

          <div className="flex my-5 justify-center gap-x-2">

            {/* Instagram */}
            <Link aria-label="instagram" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-500 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center" href="https://www.instagram.com" target="blank">
              <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.00081 0.233398C6.68327 0.233398 6.39243 0.243215 5.48219 0.283343C4.57374 0.323644 3.95364 0.462973 3.41106 0.667403C2.84981 0.87855 2.37372 1.161 1.8994 1.62066C1.42473 2.08016 1.13317 2.54137 0.914502 3.08491C0.702944 3.61071 0.558942 4.2116 0.518053 5.09132C0.477342 5.97311 0.466675 6.25504 0.466675 8.50015C0.466675 10.7453 0.476986 11.0262 0.518231 11.9079C0.560009 12.788 0.703833 13.3887 0.914679 13.9144C1.13282 14.4581 1.42437 14.9193 1.89887 15.3788C2.37301 15.8386 2.8491 16.1218 3.40999 16.3329C3.95293 16.5373 4.57321 16.6767 5.48148 16.717C6.39171 16.7571 6.68238 16.7669 8.99974 16.7669C11.3175 16.7669 11.6074 16.7571 12.5176 16.717C13.4261 16.6767 14.0469 16.5373 14.5898 16.3329C15.1509 16.1218 15.6263 15.8386 16.1004 15.3788C16.5751 14.9193 16.8667 14.4581 17.0853 13.9145C17.2951 13.3887 17.4391 12.7878 17.4818 11.9081C17.5227 11.0263 17.5333 10.7453 17.5333 8.50015C17.5333 6.25504 17.5227 5.97328 17.4818 5.09149C17.4391 4.21143 17.2951 3.61071 17.0853 3.08508C16.8667 2.54137 16.5751 2.08016 16.1004 1.62066C15.6258 1.16082 15.1511 0.878377 14.5893 0.667403C14.0453 0.462973 13.4249 0.323644 12.5164 0.283343C11.6062 0.243215 11.3164 0.233398 8.99814 0.233398H9.00081ZM8.23525 1.72311C8.46245 1.72277 8.71597 1.72311 9.00077 1.72311C11.2792 1.72311 11.5492 1.73104 12.449 1.77065C13.281 1.8075 13.7326 1.94218 14.0334 2.05533C14.4316 2.20517 14.7155 2.38428 15.014 2.67362C15.3127 2.96295 15.4976 3.23851 15.6526 3.62429C15.7694 3.91535 15.9086 4.3528 15.9464 5.15881C15.9873 6.03026 15.9962 6.29204 15.9962 8.49823C15.9962 10.7044 15.9873 10.9662 15.9464 11.8377C15.9084 12.6437 15.7694 13.0811 15.6526 13.3722C15.4979 13.758 15.3127 14.0327 15.014 14.3218C14.7153 14.6112 14.4318 14.7903 14.0334 14.9401C13.7329 15.0538 13.281 15.1881 12.449 15.225C11.5494 15.2646 11.2792 15.2732 9.00077 15.2732C6.72217 15.2732 6.45212 15.2646 5.55256 15.225C4.72055 15.1878 4.26899 15.0531 3.96801 14.9399C3.56978 14.7901 3.28533 14.611 2.98666 14.3216C2.68799 14.0323 2.5031 13.7574 2.34808 13.3715C2.23128 13.0804 2.09208 12.643 2.05421 11.837C2.01332 10.9655 2.00514 10.7037 2.00514 8.49617C2.00514 6.2886 2.01332 6.0282 2.05421 5.15674C2.09226 4.35073 2.23128 3.91329 2.34808 3.62188C2.50275 3.2361 2.68799 2.96054 2.98666 2.67121C3.28533 2.38187 3.56978 2.20276 3.96801 2.05258C4.26881 1.93891 4.72055 1.80457 5.55256 1.76755C6.33977 1.7331 6.64484 1.72277 8.23525 1.72105V1.72311ZM13.5558 3.09574C12.9905 3.09574 12.5318 3.53956 12.5318 4.08741C12.5318 4.63508 12.9905 5.07942 13.5558 5.07942C14.1212 5.07942 14.5799 4.63508 14.5799 4.08741C14.5799 3.53974 14.1212 3.09574 13.5558 3.09574ZM9.00082 4.25481C6.58071 4.25481 4.61855 6.15564 4.61855 8.50013C4.61855 10.8446 6.58071 12.7446 9.00082 12.7446C11.4209 12.7446 13.3824 10.8446 13.3824 8.50013C13.3824 6.15564 11.4209 4.25481 9.00082 4.25481ZM9.00079 5.74454C10.5717 5.74454 11.8453 6.97818 11.8453 8.50013C11.8453 10.0219 10.5717 11.2557 9.00079 11.2557C7.42975 11.2557 6.15632 10.0219 6.15632 8.50013C6.15632 6.97818 7.42975 5.74454 9.00079 5.74454Z"
                  fill="white"
                />
              </svg>
            </Link>

            {/* Linkedin */}
            <Link aria-label="linked-in" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-500 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center" href="https://www.linkedin.com/company/cassad-proptech/" target="blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30" fill="white">
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
              </svg>
            </Link>

            {/* Email */}
            <a aria-label="email" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-500 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center" href="mailto:mmca@cassad.com.mx" target="blank">
              <svg width="20" height="20" viewBox="0 0 25 25" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </a>

            {/* Twitter */}
            <Link aria-label="twitter" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-500 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center" href="https://twitter.com/" target="blank">
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5208 3.59864L7.55438 4.13498L6.99479 4.0693C4.95791 3.81755 3.17843 2.9638 1.66756 1.52992L0.928908 0.818458L0.73865 1.34385C0.33575 2.51503 0.593158 3.75188 1.43253 4.58375C1.8802 5.04346 1.77948 5.10914 1.00725 4.8355C0.73865 4.74793 0.503625 4.68226 0.481242 4.71509C0.4029 4.79171 0.6715 5.78776 0.884142 6.18181C1.17513 6.72909 1.76828 7.26542 2.4174 7.58284L2.96579 7.83459L2.31668 7.84554C1.68994 7.84554 1.66756 7.85648 1.73471 8.08634C1.95854 8.79781 2.84268 9.55305 3.82755 9.88142L4.52143 10.1113L3.91708 10.4615C3.02175 10.965 1.96973 11.2496 0.917717 11.2715C0.414092 11.2825 0 11.3262 0 11.3591C0 11.4685 1.36538 12.0815 2.15999 12.3223C4.54382 13.0338 7.37531 12.7273 9.50173 11.5123C11.0126 10.6476 12.5235 8.92915 13.2286 7.26542C13.6091 6.37883 13.9896 4.75888 13.9896 3.98174C13.9896 3.47824 14.0232 3.41257 14.6499 2.81056C15.0192 2.4603 15.3662 2.0772 15.4333 1.96775C15.5452 1.75978 15.534 1.75978 14.9633 1.94586C14.012 2.27422 13.8777 2.23044 14.3477 1.73789C14.6947 1.38763 15.1088 0.752784 15.1088 0.566709C15.1088 0.533872 14.9409 0.5886 14.7506 0.68711C14.5492 0.796566 14.1015 0.96075 13.7658 1.05926L13.1614 1.24534L12.613 0.884131C12.3108 0.68711 11.8856 0.468198 11.6617 0.402524C11.0909 0.249286 10.218 0.271177 9.70318 0.446307C8.30422 0.938859 7.42008 2.20855 7.5208 3.59864Z"
                  fill="white"
                />
              </svg>
            </Link>

            {/* YouTube */}
            <Link aria-label="youtube" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 bg-gray-500 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center" href="https://www.youtube.com/" target="blank">
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6677 1.17143C16.4021 1.36664 16.9804 1.94183 17.1767 2.67227C17.5333 3.99611 17.5333 6.75832 17.5333 6.75832C17.5333 6.75832 17.5333 9.52043 17.1767 10.8444C16.9804 11.5748 16.4021 12.15 15.6677 12.3453C14.3369 12.7 9.00001 12.7 9.00001 12.7C9.00001 12.7 3.66309 12.7 2.33218 12.3453C1.59783 12.15 1.0195 11.5748 0.823232 10.8444C0.466675 9.52043 0.466675 6.75832 0.466675 6.75832C0.466675 6.75832 0.466675 3.99611 0.823232 2.67227C1.0195 1.94183 1.59783 1.36664 2.33218 1.17143C3.66309 0.81665 9.00001 0.81665 9.00001 0.81665C9.00001 0.81665 14.3369 0.81665 15.6677 1.17143ZM7.40002 4.43326V9.59993L11.6667 7.01669L7.40002 4.43326Z"
                  fill="white"
                />
              </svg>
            </Link>

          </div>

          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 El Postre. All Rights Reserved.</span>

        </div>
      </footer>

    </main>
  );
}
