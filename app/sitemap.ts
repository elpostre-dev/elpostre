import { MetadataRoute } from "next";
import { productos } from "@/data/productos";
import { Producto, Variacion } from "@/data/productos";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const productUrls = productos.map((p: Producto) => {
        return {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/${p.id}`,
            lastModified: new Date(),
        }
    });


    return [
        {
            url: `${process.env.NEXT_PUBLIC_HOST}`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/pasteles`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/pays`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/brownies`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/galletas`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/keto`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/muffins-panques`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/individuales`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/productos/temporada`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/carrito`,
            lastModified: new Date(),
        },
        ...productUrls,
    ]
}