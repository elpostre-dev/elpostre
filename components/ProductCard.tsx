import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    variaciones: ProductVariation[];
}

interface ProductCardProps {
    producto: Product;
}

// https://tailwindflex.com/@arya/responsive-products-grid
const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
    const productURL = `/productos/${producto.id}`;

    return (
        <div className="flex flex-col xl:w-64 lg:w-72 md:w-80 w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={producto.id}>
            <Link href={productURL} className="flex h-full flex-col">
                {/* foto */}
                <Image
                    src={producto.fotos[0]}
                    alt={producto.nombre}
                    className="xl:h-72 h-80 xl:w-64 lg:w-72 md:w-80 w-80 object-cover rounded-t-xl"
                    width={200}
                    height={200}
                />

                <div className="px-4 py-3 flex flex-col flex-grow xl:w-64 lg:w-72 md:w-80 w-80 text-center">

                    {/* categoría */}
                    <p className="text-gray-400 mr-3 uppercase text-xs">{producto.categoria_nombre}</p>

                    {/* nombre */}
                    <p className="text-lg font-bold text-black block capitalize">{producto.nombre}</p>


                    {/* variaciones */}
                    {/* <div className="flex-grow">
                        <p>
                            {producto.variaciones.map((vari) => (
                                <span key={vari.tamanio} className="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                    {vari.tamanio}
                                </span>
                            ))}
                        </p>
                    </div> */}
                    <div className="flex-grow" />
                    <hr className="my-2" />
                    <div>
                        <p>
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                {producto.variaciones.length} {producto.variaciones.length > 1 ? "tamaños" : "tamaño"}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default ProductCard;