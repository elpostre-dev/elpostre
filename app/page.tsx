'use client'

import React from "react";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contacto from "@/components/Contacto";
import bgImage from "../public/home.jpg";
import CategoryCard from "@/components/CategoryCard";

import Link from "next/link";
import Image from "next/image";

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

  // Get bestsellers
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


  return (
    <main className="flex min-h-screen flex-col">

      {/* NAVBAR */}
      <NavBar />


      {/* FOTO background y TEXTO */}
      <section
        className="bg-center bg-no-repeat bg-blend-multiply bg-cover"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          height: "91vh",
        }}
      >
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
            <p className="mb-4 text-lg md:text-base lg:text-lg font-light text-center">
              En la Pastelería El Postre contamos con más de veinte años de experiencia, satisfaciendo y endulzando los paladares de nuestros clientes. Nuestra prioridad es garantizar un excelente postre, utilizando ingredientes de la más alta calidad. Contamos con una amplia variedad de los más exquisitos pasteles, galletas y brownies. Esto nos ha llevado a ser una de las marcas más prestigiadas de nuestra región.
            </p>
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


    </main>
  );
}
