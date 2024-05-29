
import NavBar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Contacto from "@/components/Contacto";

export default function Nosotros() {

    return (
        <main className="flex min-h-screen flex-col">

            {/* NAVBAR */}
            <NavBar />

            {/* FOTO y TEXTO */}
            <div style={{ height: '92vh' }} className="bg-mainRosa-100 shadow-sm">
                <div className="mx-auto flex justify-center items-center h-full flex-col md:flex-row">

                    {/* Left Side */}
                    <div className="flex flex-col justify-center items-center px-7 py-10 md:w-1/2">
                        <div className="w-full flex justify-center py-4">
                            <div className="w-1/2 sm:w-1/2 md:w-1/2">
                                <Image
                                    src="/logos/logo_dorado_2.png"
                                    alt="logo"
                                    width={720}  // Tamaño original del logo
                                    height={360}
                                    layout="responsive"
                                />
                            </div>
                        </div>

                        {/* <h1 className="text-5xl text-mainRojo-100 font-bold mb-4 text-center">
                            Pastelería El Postre
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


            {/* Diferenciadores */}
            <div className="py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        {/* <h2 className="text-base font-semibold leading-7 text-mainRojo-100">Deploy faster</h2> */}
                        <p className="mt-2 text-3xl font-bold tracking-tight text-mainRojo-100 sm:text-4xl">
                            ¿Qué nos hace diferentes?
                        </p>
                        <hr className="bg-mainRojo-100 h-1 mt-5 mx-auto" style={{ width: '10%' }} />
                        {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                            En Pastelería El Postre, nuestro compromiso con la calidad y nuestra amplia experiencia nos distinguen. Utilizamos solo los mejores ingredientes, y cada postre es elaborado con técnicas perfeccionadas a lo largo de más de veinte años en el sector, asegurando un sabor excepcional en cada bocado.
                        </p> */}
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto py-10">

                        <div className="rounded-xl group p-8 text-center text-mainRojo-100 hover:bg-mainRojo-100 hover:text-white shadow-xl hover:cursor-pointer transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 mb-4 inline-block" viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                                    </clipPath>
                                </defs>
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="40" clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z" data-original="#000000" />
                                    <path d="M178 271.894 233.894 216 334 316.105" data-original="#000000" />
                                </g>
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">Calidad</h3>
                            <p className="text-gray-600 group-hover:text-gray-200 text-md">
                                Ingredientes de alta calidad para postres excepcionales.
                            </p>
                        </div>

                        <div className="rounded-xl group p-8 text-center text-mainRojo-100 hover:bg-mainRojo-100 hover:text-white shadow-xl hover:cursor-pointer transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 mb-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">Sabor</h3>
                            <p className="text-gray-600 group-hover:text-gray-200 text-md">
                                Mantenemos el auténtico sabor de los postres caseros que nos caracteriza.
                            </p>
                        </div>

                        <div className="rounded-xl group p-8 text-center text-mainRojo-100 hover:bg-mainRojo-100 hover:text-white shadow-xl hover:cursor-pointer transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 mb-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                            </svg>

                            <h3 className="text-xl font-semibold mb-2">Variedad</h3>
                            <p className="text-gray-600 group-hover:text-gray-200 text-md">
                                Amplia selección de pasteles, galletas y brownies, incluida la línea KETO.
                            </p>
                        </div>

                        {/* <div className="rounded-xl group p-8 text-center text-mainRojo-100 hover:bg-mainRojo-100 hover:text-white shadow-xl hover:cursor-pointer transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 mb-4 inline-block" viewBox="0 0 24 24">
                                <g fill-rule="evenodd" clip-rule="evenodd">
                                    <path d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z" data-original="#000000" />
                                    <path d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z" data-original="#000000" />
                                    <path d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z" data-original="#000000" />
                                </g>
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">Performance</h3>
                            <p className="text-gray-600 group-hover:text-gray-200 text-sm">Experience blazing-fast performance with our product.</p>
                        </div>

                        <div className="rounded-xl group p-8 text-center text-mainRojo-100 hover:bg-mainRojo-100 hover:text-white shadow-xl hover:cursor-pointer transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 mb-4 inline-block" viewBox="0 0 504.69 504.69">
                                <path d="M252.343 262.673c-49.32 0-89.447-40.127-89.447-89.447s40.127-89.447 89.447-89.447 89.447 40.127 89.447 89.447-40.121 89.447-89.447 89.447zm0-158.235c-37.926 0-68.787 30.861-68.787 68.787s30.861 68.787 68.787 68.787 68.787-30.861 68.787-68.787-30.855-68.787-68.787-68.787z" data-original="#000000" />
                                <path d="M391.787 405.309c-5.645 0-10.253-4.54-10.325-10.201-.883-70.306-58.819-127.503-129.15-127.503-49.264 0-93.543 27.405-115.561 71.52-8.724 17.473-13.269 36.31-13.517 55.988-.072 5.702-4.757 10.273-10.459 10.201s-10.273-4.757-10.201-10.459c.289-22.814 5.568-44.667 15.691-64.955 25.541-51.164 76.907-82.95 134.047-82.95 81.581 0 148.788 66.349 149.81 147.905.072 5.702-4.494 10.392-10.201 10.459-.046-.005-.087-.005-.134-.005z" data-original="#000000" />
                                <path d="M252.343 463.751c-116.569 0-211.408-94.834-211.408-211.408 0-116.569 94.839-211.408 211.408-211.408 116.574 0 211.408 94.839 211.408 211.408 0 116.574-94.834 211.408-211.408 211.408zm0-402.156c-105.18 0-190.748 85.568-190.748 190.748s85.568 190.748 190.748 190.748 190.748-85.568 190.748-190.748S357.523 61.595 252.343 61.595zM71.827 90.07 14.356 32.599c-4.034-4.034-4.034-10.573 0-14.607 4.029-4.034 10.573-4.034 14.607 0l57.466 57.471c4.034 4.034 3.951 10.49 0 14.607-3.792 3.951-11.039 3.698-14.602 0z" data-original="#000000" />
                                <path d="M14.717 92.254a10.332 10.332 0 0 1-10.299-9.653L.023 15.751a10.317 10.317 0 0 1 2.929-7.908 10.2 10.2 0 0 1 7.851-3.089L77.56 7.796c5.697.258 10.108 5.093 9.85 10.79s-5.041 10.154-10.79 9.85l-55.224-2.521 3.641 55.327c.377 5.692-3.936 10.614-9.628 10.986a7.745 7.745 0 0 1-.692.026zm403.541-2.184c-4.256-3.796-4.034-10.573 0-14.607l58.116-58.116c4.034-4.034 10.573-4.034 14.607 0s4.034 10.573 0 14.607L432.864 90.07c-4.085 3.951-9.338 4.7-14.606 0z" data-original="#000000" />
                                <path d="M489.974 92.254a9.85 9.85 0 0 1-.687-.021c-5.697-.372-10.01-5.294-9.633-10.986l3.641-55.327-55.224 2.515c-5.511.238-10.526-4.147-10.79-9.85-.258-5.702 4.153-10.531 9.85-10.79l66.757-3.042c2.934-.134 5.79.992 7.851 3.089s3.12 4.974 2.929 7.908l-4.401 66.85c-.361 5.465-4.896 9.654-10.293 9.654zM11.711 489.339c-3.791-4.266-4.034-10.573 0-14.607l60.115-60.11c4.029-4.034 10.578-4.034 14.607 0 4.034 4.034 4.034 10.573 0 14.607l-60.115 60.11c-3.827 3.884-11.156 3.884-14.607 0z" data-original="#000000" />
                                <path d="M10.327 499.947a10.33 10.33 0 0 1-7.376-3.104 10.312 10.312 0 0 1-2.929-7.902l4.401-66.85c.372-5.697 5.191-10.036 10.986-9.633 5.692.377 10.005 5.294 9.628 10.986l-3.641 55.332 55.224-2.515c5.645-.191 10.531 4.153 10.79 9.85.258 5.697-4.153 10.526-9.85 10.79l-66.763 3.037c-.155.004-.31.009-.47.009zm465.639-13.01-57.708-57.708c-4.034-4.034-4.034-10.573 0-14.607s10.573-4.034 14.607 0l57.708 57.708c4.034 4.034 3.962 10.5 0 14.607-3.817 3.951-10.062 3.951-14.607 0z" data-original="#000000" />
                                <path d="M494.359 499.947c-.155 0-.315-.005-.47-.01l-66.757-3.042c-5.702-.263-10.108-5.088-9.85-10.79.263-5.702 5.113-9.984 10.79-9.85l55.219 2.515-3.641-55.332c-.372-5.692 3.941-10.609 9.633-10.986 5.625-.398 10.609 3.946 10.986 9.633l4.401 66.85a10.33 10.33 0 0 1-2.929 7.902 10.323 10.323 0 0 1-7.382 3.11z" data-original="#000000" />
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                            <p className="text-gray-600 group-hover:text-gray-200 text-sm">Expand your reach with our global network.</p>
                        </div>

                        <div className="rounded-xl group p-8 text-center text-mainRojo-100 hover:bg-mainRojo-100 hover:text-white shadow-xl hover:cursor-pointer transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 mb-4 inline-block" viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                                    </clipPath>
                                </defs>
                                <g fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="30" clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30" data-original="#000000" />
                                </g>
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">Communication</h3>
                            <p className="text-gray-600 group-hover:text-gray-200 text-sm">Seamless communication for your team.</p>
                        </div> */}

                    </div>

                </div>
            </div>


            {/* DIRECCION y CONTACTO */}
            <Contacto />


            {/* FOOTER */}
            <Footer />


        </main >
    );
}
