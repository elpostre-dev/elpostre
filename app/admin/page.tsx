// app/admin/page.tsx
'use client'

import { SessionProvider } from "next-auth/react";
import AdminContent from "@/components/AdminContent";
import useSWR from 'swr';
import { useEffect, useState } from "react";
import { set } from "date-fns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Admin() {
    const [AdminContentComponent, setAdminContentComponent] = useState(<></>)

    const { data, error } = useSWR('/api/admin/orders', fetcher, {
        refreshInterval: 5000, // Puedes ajustar el tiempo según tus necesidades
    });

    useEffect(() => {
        console.log('data:', data)
        if (data) {
            setAdminContentComponent(<AdminContent orders={data.orders} />)
        }
    }, [data])

    if (error) return <div>Failed to load orders</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <SessionProvider>
            {AdminContentComponent}
        </SessionProvider>
    );
}