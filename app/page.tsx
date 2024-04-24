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


      {/* DIRECCION y CONTACTO */}
      <Contacto />


      {/* FOOTER */}
      <Footer />


    </main>
  );
}
