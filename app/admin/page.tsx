// app/admin/page.tsx
'use client'

import { SessionProvider } from "next-auth/react";
import AdminContent from "@/components/AdminContent";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Admin() {

    const { data, error } = useSWR('/api/admin/orders', fetcher, {
        refreshInterval: 5000, // Puedes ajustar el tiempo según tus necesidades
    });

    if (error) return <div>Failed to load orders</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <SessionProvider>
            <AdminContent orders={data.orders} />
        </SessionProvider>
    );
}