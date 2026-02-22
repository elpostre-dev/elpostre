'use client';

import NavBarAdmin from "@/components/NavBarAdmin";
import OrdersTable from "@/components/OrdersTable";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import ProductosAdmin from "@/components/ProductosAdmin";
import bgImage from "../../public/sucursal.jpg";

export default function AdminDashboard() {
    return (
        <main className="flex min-h-screen flex-col">
            <NavBarAdmin />
            <section
                className="bg-center bg-no-repeat bg-blend-multiply bg-slate-500 bg-cover"
                style={{
                    backgroundImage: `url(${bgImage.src})`,
                    height: "20vh",
                }}
            >
                <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
                    <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white">
                        Panel de Administrador
                    </h1>
                </div>
            </section>

            <Tabs defaultValue="Ordenes" className="w-full">
                <div className="bg-gray-300 py-2">
                    <TabsList className="grid w-2/3 md:w-1/2 mx-auto grid-cols-2 bg-transparent border border-white">
                        <TabsTrigger value="Ordenes" className="hover:text-gray-200">Órdenes</TabsTrigger>
                        <TabsTrigger value="Productos" className="hover:text-gray-200">Productos</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="Ordenes">
                    <OrdersTable />
                </TabsContent>

                <TabsContent value="Productos">
                    <ProductosAdmin />
                </TabsContent>
            </Tabs>
        </main>
    );
}
