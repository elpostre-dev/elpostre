
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

            {/* HERO */}
            <section className="flex flex-col items-center justify-center text-mainRojo-100" style={{ height: '60vh' }}>
                <h1 className="text-4xl font-bold">¡Gracias por tu compra!</h1>
                <p className="text-lg">Tu pedido ha sido procesado con éxito.</p>
            </section>


            {/* FOOTER */}
            <Footer />


        </main >
    );
}
