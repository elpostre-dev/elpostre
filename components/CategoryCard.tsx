import Link from "next/link";

export default function CategoryCard({
    name, href, imageUrl,
}: {
    name: string;
    href: string;
    imageUrl: string;
}) {
    return (
        <Link href={href} className="relative group flex flex-col items-center w-full hover:cursor-pointer bg-mainRojo-100">
            <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
                <img className="object-center object-cover h-full w-full group-hover:opacity-50 transition duration-500" src={imageUrl} alt="categoria" />
            </div>
            <div className="absolute bottom-0 w-full">
                <button className="text-center text-xl uppercase focus:outline-none z-10 w-full py-2 lg:py-2 md:py-4 sm:py-4 bg-mainRosa-100 group-hover:bg-mainRojo-100 group-hover:text-white transition duration-500 text-mainRojo-100" style={{ fontWeight: 'bold' }}>
                    {name}
                </button>
            </div>
        </Link>


    )
}