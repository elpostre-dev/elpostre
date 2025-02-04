
import { Metadata } from 'next';
import SingleProductContent from './SingleProductContent';

async function fetchProduct(id: string) {
    console.log("Fetching product with id:", id);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProductWithId?productId=${id}`);
        console.log("Response:", res);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const producto = await fetchProduct(params.id);
    if (!producto) {
        return {
            title: 'Producto no encontrado',
        };
    }

    return {
        title: producto.nombre,
        description: producto.descripcion || 'Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.',
        openGraph: {
            title: producto.nombre,
            description: producto.descripcion || 'Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.',
            type: "website",
            locale: "es_ES",
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/${params.id}`,
            siteName: "Pastelería El Postre",
            images: producto.fotos.length > 0
                ? [{ url: producto.fotos[0], width: 800, height: 600, alt: `${producto.nombre} | Pastelería El Postre` }]
                : [],
        },
    };
}

export default async function SingleProduct({ params }: { params: { id: string } }) {
    const producto = await fetchProduct(params.id);
    return <SingleProductContent originalProduct={producto} />;
};
