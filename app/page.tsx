'use client'

import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contacto from "@/components/Contacto";
import bgImage from "../public/home.jpg";
import CategoryCard from "@/components/CategoryCard";

import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useState, useEffect } from "react";

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
  variaciones: ProductVariation[]; // Include variations
}


export default function Home() {

  const bestsellerIds = [2, 29, 35, 37]; // IDs of bestsellers
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const fetchedProducts: Product[] = await Promise.all(
          bestsellerIds.map(async (id) => {
            const res = await fetch(`/api/getProductWithId?productId=${id}`);
            if (!res.ok) throw new Error(`Failed to fetch product with ID: ${id}`);
            return await res.json();
          })
        );

        setBestsellers(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);


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

  const categoryItem = [
    {
      name: "Pasteles",
      href: "/productos/pasteles",
      imageUrl: "/categorias/pastel-categoria.jpg",
    },
    {
      name: "Pays",
      href: "/productos/pays",
      imageUrl: "/categorias/pay-categoria.jpg",
    },
    {
      name: "Brownies",
      href: "/productos/brownies",
      imageUrl: "/categorias/brownies-categoria.jpg",
    },
    {
      name: "Galletas",
      href: "/productos/galletas",
      imageUrl: "/categorias/galletas-categoria.jpg",
    },
    {
      name: "Keto",
      href: "/productos/keto",
      imageUrl: "/categorias/keto-categoria.jpg",
    },
    {
      name: "Muffins y Panqués",
      href: "/productos/muffins-panques",
      imageUrl: "/categorias/muffinspanques-categoria.jpg",
    },
    {
      name: "Individuales",
      href: "/productos/individuales",
      imageUrl: "/categorias/individuales-categoria.jpg",
    },
    {
      name: "Temporada",
      href: "/productos/temporada",
      imageUrl: "/categorias/temporada-categoria.jpg",
    }
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


      {/* Categorías */}
      <div className="bg-mainRosa-100 pt-10">

        <div className="mx-auto max-w-2xl text-center" id="productos">
          <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
            Productos
          </p>
          <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
        </div>

        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container pb-6 pt-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
            <div className="flex flex-col jusitfy-center items-center space-y-10">
              {/* <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-xl leading-5 text-gray-600">2021 Trendsetters</p>
                <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">Shop By Category</h1>
            </div> */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {categoryItem.map((item, index) => (
                  <CategoryCard
                    key={index}
                    name={item.name}
                    href={item.href}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>



            </div>
          </div>
        </div>
        <hr className="bg-white h-2 mb-3 mx-auto border-0" style={{ width: '80%' }} />
        <hr className="bg-white h-2 mb-3 mx-auto border-0" style={{ width: '80%' }} />
        <hr className="bg-white h-2 mb-8 mx-auto border-0" style={{ width: '80%' }} />
      </div>


      {/* Nosotros */}
      {/* TEXTO y FOTOS */}
      <section className="pt-4 bg-mainAmarillo-200 items-center" id="nosotros">
        <div className="gap-16 items-center py-10 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:px-6">
          <div className="text-gray-500 text-xl">
            <div className="w-full flex justify-center py-4">
              <div className="w-1/2 sm:w-1/2 md:w-1/2">
                <Image
                  src="/logos/logo_dorado.png"
                  alt="logo"
                  width={720}  // Tamaño original del logo
                  height={360}
                  layout="responsive"
                  className="mb-3"
                />
              </div>
            </div>
            {/* <h2 className="mb-4 text-4xl tracking-tight font-bold text-center lg:text-left text-mainRojo-100">
              Pastelería El Postre
            </h2> */}
            <p className="mb-4 text-lg md:text-base lg:text-lg font-light text-center">
              En la Pastelería El Postre contamos con más de veinte años de experiencia, satisfaciendo y endulzando los paladares de nuestros clientes. Nuestra prioridad es garantizar un excelente postre, utilizando ingredientes de la más alta calidad. Contamos con una amplia variedad de los más exquisitos pasteles, galletas y brownies. Esto nos ha llevado a ser una de las marcas más prestigiadas de nuestra región.
            </p>
            {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
          </div>
          <div className="grid grid-cols-2 gap-4 my-8">
            <Image
              className="w-full rounded-lg"
              src="/sucursal2.jpg"
              alt="sucursal"
              width={704}
              height={1024}
              sizes="50vw"
            />
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="/galletas.png"
              alt="galletas"
              width={704}
              height={1024}
              sizes="50vw"
            />
          </div>
        </div>
      </section>


      {/* CAROUSEL promociones */}
      {/* <div className="mx-auto w-full">

        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-mainRojo-100">
            Promociones
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
                  <div className="flex justify-center items-center">
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-azulito-100 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-azulito-100 py-2 sm:py-4 text-sm">Get Started</button>
                    <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulito-100 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-azulito-100 text-azulito-100 px-4 sm:px-10 py-2 sm:py-4 text-sm">Live Demo</button>
                  </div>
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
      </div> */}


      {/* OPINIONES */}
      {/* <div className="container my-10 mt-14 mb-24 mx-auto md:px-6">

        <div className="mx-auto max-w-2xl px-4 py-8 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-mainRojo-100">
            Opiniones de clientes
            <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
          </h2>
        </div>

        <section className="text-center">

          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">


            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/logos/logo_rojo.jpg"
                  alt="logo"
                  className="w-20 rounded-full shadow-lg"
                  width={80}
                  height={80}
                  sizes="80px"
                />
              </div>
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


            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/logos/logo_rojo.jpg"
                  alt="logo"
                  className="w-20 rounded-full shadow-lg"
                  width={80}
                  height={80}
                  sizes="80px"
                />
              </div>
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


            <div className="mb-0">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/logos/logo_rojo.jpg"
                  alt="logo"
                  className="w-20 rounded-full shadow-lg"
                  width={80}
                  height={80}
                  sizes="80px"
                />
              </div>
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
      </div> */}

      {/* OPCIONES DE COMPRA */}
      {/* <div className="flex flex-col my-10 pt-10">
        <div className="container max-w-7xl px-4">

          <div className="flex flex-wrap justify-center">

            <div className="w-full md:w-4/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
              <div className="flex flex-col">
                <a className="mx-auto">
                  <Image
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 shadow p-10 object-contain"
                    src="logos/sucursal.png"
                    alt="Sucursal"
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    style={{ height: '200px' }}
                  />
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
                  <Image
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 shadow p-10 object-contain"
                    src="logos/rappi_2.png"
                    alt="Rappi"
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    style={{ height: '200px' }}
                  />
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
                  <Image
                    className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 shadow p-10 object-contain"
                    src="logos/devices.png"
                    alt="Devices"
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    style={{ height: '200px' }}
                  />
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


      {/* TAMANIOS DE PASTELES */}
      <section className="w-full py-14 bg-mainRosa-100">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 md:px-6">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-mainRojo-100">
              Conoce nuestros tamaños de pasteles
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              Contamos con una amplia variedad de tamaños de pasteles, desde individuales hasta pasteles para grandes eventos.
            </p>
          </div>
          <Image
            src="/tamanios_pasteles.jpg"
            alt="Hero Image"
            width={1113}
            height={846}
            className="w-full max-w-3xl rounded-xl"
            sizes="(min-width: 1024px) 768px, 100vw"
          />
        </div>
      </section>


      {/* Best Sellers */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 pb-20 lg:max-w-7xl lg:px-8">

          <h2 className="text-3xl font-semibold tracking-tight text-mainRojo-100 text-center">
            Explora nuestros bestsellers
            <hr className="bg-mainRojo-100 h-1 my-5 mb-10 mx-auto" style={{ width: '10%' }} />
          </h2>

          {
            loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mainRojo-100"></div>
              </div>
            )
              :
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                {bestsellers.map((producto) => (
                  <Link href={`/productos/${producto.id}`} className="group relative" key={producto.id}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-50 h-60 lg:h-80">
                      <Image
                        src={producto.fotos[0] || "/placeholder.svg"}
                        alt={producto.nombre}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        width={600}
                        height={600}
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-md text-gray-700 font-semibold">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {producto.nombre}
                        </h3>
                        <p className="mt-1 text-sm font text-gray-500">{producto.categoria_nombre}</p>
                      </div>
                    </div>
                  </Link>
                ))}

              </div>
          }

        </div>
      </div>


      {/* FOOTER */}
      <Footer />


      {/* BANNER */}
      {/* {isVisible && (
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
      )} */}


    </main>
  );
}
