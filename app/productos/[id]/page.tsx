
import { Metadata } from 'next';
import SingleProductContent from './SingleProductContent';
import { productos } from '../../../data/productos';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const productoEncontrado = productos.find((p) => p.id === Number(params.id));

    if (!productoEncontrado) {
        return {
            title: 'Producto no encontrado',
        };
    }

    return {
        title: `${productoEncontrado.nombre}`,
        description: `${productoEncontrado.descripcion ? productoEncontrado.descripcion : 'Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.'}`,
        openGraph: {
            title: `${productoEncontrado.nombre}`,
            description: `${productoEncontrado.descripcion ? productoEncontrado.descripcion : 'Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.'}`,
            type: "website",
            locale: "es_ES",
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/${params.id}`,
            siteName: "Pastelería El Postre",
            images: [
                {
                    url: `${productoEncontrado.fotos[0]}`,
                    width: 800,
                    height: 600,
                    alt: `${productoEncontrado.nombre} | Pastelería El Postre`,
                }
            ]
        },
    };
}

export default function SingleProduct({ params }: { params: { id: string } }) {
    return <SingleProductContent id={params.id} />;
};
