
import NavBar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Nosotros() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {/* FOTO y TEXTO */}
            <div style={{ height: '92vh' }}>
                <div className="mx-auto flex justify-center items-center h-full flex-col md:flex-row">

                    {/* Left Side */}
                    <div className="flex flex-col justify-center items-center px-7 py-10 md:w-1/2">
                        <Image src={'/logos/logo_dorado.png'} alt="logo" height={120} width={240} />

                        {/* <h1 className="text-5xl font-bold mb-4 text-center">
                            Un poco de historia...
                        </h1> */}
                        <p className="text-lg md:text-base lg:text-lg mb-8 text-center px-4 md:px-5 lg:px-10 mt-4 text-slate-600 font-light">
                            En la Pastelería El Postre contamos con más de veinte años de experiencia, satisfaciendo y endulzando los paladares de nuestros clientes. Nuestra prioridad es garantizar un excelente postre, utilizando ingredientes de la más alta calidad. Contamos con una amplia variedad de los más exquisitos pasteles, galletas y brownies. Esto nos ha llevado a ser una de las marcas más prestigiadas de nuestra región.
                        </p>
                        {/* <Link href="/catalogo" className="text-black text-xl border-2 border-black bg-amarillito-100 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-bold rounded-full px-5 py-3 text-center inline-flex items-center">
                            Ver catálogo
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link> */}

                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/2 bg-slate-200 h-full relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/sucursal.jpg)' }}></div>
                    </div>

                </div>
            </div>


        </main>
    );
}
