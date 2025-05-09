
// app/admin/page.tsx
'use client';

import { SessionProvider, useSession, signIn } from "next-auth/react";
import NavBarAdmin from "@/components/NavBarAdmin";
import OrdersTable from "@/components/OrdersTable";
import { useEffect, useState } from 'react';
import bgImage from "../public/sucursal.jpg";
import { Order } from '@/types/types';
import { useRouter } from "next/navigation";
import { formatCurrencyShort, formatCurrency } from "@/lib/utils";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import ProductosAdmin from "./ProductosAdmin";

interface AdminContentProps {
    orders: Order[];
    stats: any;
}

export const AdminCont: React.FC<AdminContentProps> = ({ orders, stats }) => {

    return (
        <SessionProvider>
            <AdminContent orders={orders} stats={stats} />
        </SessionProvider>
    );
}

interface AdminContentProps {
    orders: Order[];
}

const AdminContent: React.FC<AdminContentProps> = ({ orders, stats }) => {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!session) {
            signIn(undefined, { callbackUrl: '/admin' });
        }
        if (session) {
            router.refresh()
        }
    }, [session, status]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center" style={{ height: '60vh' }}>
                <div role="status" className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-gray-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Cargando...</span>
                </div>
                <p className="text-lg ml-2 text-gray-500">Cargando...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center" style={{ height: '60vh' }}>
                <div role="status" className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-gray-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Redirigiendo...</span>
                </div>
                <p className="text-lg ml-2 text-gray-500">Redirigiendo...</p>
            </div>
        );
    }

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

                {/* <div className="flex flex-col items-center justify-center p-4 pb-0">
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4 w-full container">

                        <div className="p-4 bg-white rounded-lg shadow-lg border">
                            <h3 className="text-lg font-semibold text-gray-800">Pedidos Totales</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.total_orders}</p>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-lg border">
                            <h3 className="text-lg font-semibold text-gray-800">Ingresos totales</h3>
                            <p className="text-3xl font-bold text-gray-800">{formatCurrencyShort(stats.total_revenue)}</p>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-lg border">
                            <h3 className="text-lg font-semibold text-gray-800">Productos vendidos</h3>
                            <p className="text-3xl font-bold text-gray-800">{stats.total_products_sold}</p>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-lg border">
                            <h3 className="text-lg font-semibold text-gray-800">Promedio de venta</h3>
                            <p className="text-3xl font-bold text-gray-800">{formatCurrency(stats.average_order_cost)}</p>
                        </div>

                    </div>
                </div> */}

                <TabsContent value="Ordenes">
                    <OrdersTable orders={orders} />
                </TabsContent>

                <TabsContent value="Productos">
                    <ProductosAdmin />
                </TabsContent>

            </Tabs>
        </main>
    );
}