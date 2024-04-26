'use client'

export default function Contacto() {

    return (
        <section className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 ">

                <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Visítanos en nuestra tienda
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Ven a conocernos y disfruta de nuestros productos
                    </p>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* mapa */}
                        <div className="rounded-lg overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14385.722870491869!2d-100.37111455568775!3d25.657013059902567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bde60aa0c2a5%3A0x16639dba4ea48a75!2sPasteler%C3%ADa%20El%20Postre!5e0!3m2!1ses-419!2smx!4v1713910947716!5m2!1ses-419!2smx"
                                width="100%" height="480" style={{ border: 0 }} allowFullScreen={false} loading="lazy"></iframe>
                        </div>

                        {/* datos */}
                        <div>
                            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                                    <p className="mt-1 text-gray-600">Rio Mississippi 409 Del Valle, 66220 San Pedro Garza García, N.L.</p>
                                </div>
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Horarios</h3>
                                    <p className="mt-1 text-gray-600">Lunes - Viernes: 9am - 8pm</p>
                                    <p className="mt-1 text-gray-600">Sábado: 9am - 7pm</p>
                                    <p className="mt-1 text-gray-600">Domingo: 11am - 4pm</p>
                                </div>
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Contacto</h3>
                                    <p className="mt-1 text-gray-600">Correo: pasteleriaelpostre@hotmail.com</p>
                                    <p className="mt-1 text-gray-600">Teléfono: 8356-1012 y 8356-2550</p>
                                    <p className="mt-1 text-gray-600">Whatsapp: 81 2001 6165</p>
                                    <button
                                        type="button"
                                        onClick={() => window.open('https://wa.me/message/7YGGKVWI2T4UJ1')}
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        className="mb-2 my-3 flex rounded bg-[#128c7e] hover:bg-[#359a8e] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                    >
                                        <span className="me-2 [&>svg]:h-4 [&>svg]:w-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 448 512">
                                                <path
                                                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                            </svg>
                                        </span>
                                        Whatsapp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}