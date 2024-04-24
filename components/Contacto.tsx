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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}