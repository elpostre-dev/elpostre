'use client';

import useSWR from 'swr';
import { AdminCont } from "@/components/AdminContent";
import { Order } from "@/types/types";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminPage() {
    const { data, error } = useSWR('/api/admin-data', fetcher);

    if (error) return <div>Error al cargar los pedidos</div>;
    if (!data) return <div>Cargando...</div>;

    // Mapeo explícito al tipo Order[] si quieres seguir usando tu helper mapToOrders
    const orders: Order[] = data.orders;
    const stats = data.stats;

    return <AdminCont orders={orders} stats={stats} />;
}
