import React from 'react';
import { Producto } from "@/data/productos"
import Link from 'next/link';

interface ProductCardProps {
    producto: Producto;
}

// https://tailwindflex.com/@arya/responsive-products-grid
const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {

    const productURL = `/productos/${producto.id}`;

    return (
        <div className="flex flex-col xl:w-64 lg:w-72 md:w-80 w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={producto.id}>
            <Link href={productURL} className="flex flex-col h-full">

                {/* foto */}
                <img src={producto.fotos[0]}
                    alt={producto.nombre}
                    className="xl:h-72 h-80 xl:w-64 lg:w-72 md:w-80 w-80 object-cover rounded-t-xl"
                />

                <div className="px-4 py-3 flex flex-col flex-grow xl:w-64 lg:w-72 md:w-80 w-80">

                    {/* categoría */}
                    <p className="text-gray-400 mr-3 uppercase text-xs">{producto.categoriaNombre}</p>

                    {/* nombre */}
                    <p className="text-lg font-bold text-black block capitalize">{producto.nombre}</p>

                    <hr className="my-2" />

                    {/* variaciones */}
                    <div className="flex-grow">
                        <p>
                            {producto.variaciones.map((vari) => (
                                <span key={vari.tamanio} className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                    {vari.tamanio}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Aquí puede ir la sección de precios o cualquier otro contenido adicional */}
                </div>
            </Link>
        </div>
    )
}

export default ProductCard;