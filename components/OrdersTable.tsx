'use client';

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Order } from "@/types/types";
import OrdersTableItem from "./OrdersTableItem";

type AdminDataResponse = {
    incompleteOrders: Order[];
    completeOrders: Order[];
    completeTotalCount: number;
    page: number;
    pageSize: number;
    q: string;
    days: 30 | 60 | 90;
    fromDate: string;
    toDate: string;
    isGlobalSearch: boolean;
};

const fetcher = async (url: string): Promise<AdminDataResponse> => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Error al cargar las órdenes");
    }
    return response.json();
};

const OrdersTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchInput, setSearchInput] = useState("");
    const [q, setQ] = useState("");
    const [days, setDays] = useState(30);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPage(1);
            setQ(searchInput.trim());
        }, 350);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    const query = `/api/admin-data?page=${page}&pageSize=${pageSize}&q=${encodeURIComponent(q)}&days=${days}&from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}`;
    const { data, error, isLoading, mutate } = useSWR(query, fetcher);

    const incompleteOrders = data?.incompleteOrders ?? [];
    const completeOrders = data?.completeOrders ?? [];
    const totalCount = data?.completeTotalCount ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const handleChangeDays = (value: number) => {
        setPage(1);
        setDays(value);
        if (!fromDate && !toDate) return;
        setFromDate("");
        setToDate("");
    };

    const tableHeader = (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-4 py-3">Cliente</th>
                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Precio final</th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">Fecha de Orden</th>
                <th scope="col" className="px-4 py-3">Fecha de Recogida</th>
                <th scope="col" className="px-4 py-3 hidden sm:table-cell">Hora de Recogida</th>
                <th scope="col" className="px-4 py-3 text-center">Detalles</th>
            </tr>
        </thead>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[45vh]">
                <div className="flex items-center gap-3 text-gray-500">
                    <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin fill-gray-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p>Cargando órdenes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-6 py-10">
                <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    Error al cargar las órdenes. Recarga la página e intenta de nuevo.
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 py-6 mb-20">
            <h2 className="text-2xl md:text-4xl font-semibold pb-4 md:pb-6 px-4 md:px-8">Órdenes Incompletas</h2>
            {incompleteOrders.length === 0 ? (
                <div className="flex justify-center items-center bg-gray-100 mx-auto rounded-lg border" style={{ height: "20vh", width: "95%" }}>
                    <p className="text-lg text-gray-500">No hay órdenes incompletas por ahora.</p>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-lg border rounded-lg mb-8 mx-auto bg-white" style={{ width: "95%" }}>
                    <table className="w-full text-sm text-left text-gray-500">
                        {tableHeader}
                        <tbody>
                            {incompleteOrders.map((order) => (
                                <OrdersTableItem key={order.order_id} order={order} onOrderCompleted={() => mutate()} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <h2 className="text-2xl md:text-4xl font-semibold pt-10 pb-4 px-4 md:px-8">Órdenes Anteriores</h2>
            <div className="mx-auto mb-4 flex w-[95%] flex-col gap-3 rounded-lg border bg-white p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full flex-col gap-3">
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Buscar por cliente, email, teléfono o ID"
                        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500 md:max-w-md"
                    />
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => {
                                setPage(1);
                                setFromDate(e.target.value);
                            }}
                            className="h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500"
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => {
                                setPage(1);
                                setToDate(e.target.value);
                            }}
                            className="h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500"
                        />
                        {(fromDate || toDate) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPage(1);
                                    setFromDate("");
                                    setToDate("");
                                }}
                                className="h-10 rounded-md border px-3 text-sm hover:bg-gray-100"
                            >
                                Limpiar fechas
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        type="button"
                        onClick={() => handleChangeDays(30)}
                        className={`rounded-md border px-3 py-2 text-sm ${days === 30 ? "bg-gray-900 text-white border-gray-900" : "bg-white hover:bg-gray-100"}`}
                    >
                        Últimos 30 días
                    </button>
                    <button
                        type="button"
                        onClick={() => handleChangeDays(60)}
                        className={`rounded-md border px-3 py-2 text-sm ${days === 60 ? "bg-gray-900 text-white border-gray-900" : "bg-white hover:bg-gray-100"}`}
                    >
                        Últimos 60 días
                    </button>
                    <button
                        type="button"
                        onClick={() => handleChangeDays(90)}
                        className={`rounded-md border px-3 py-2 text-sm ${days === 90 ? "bg-gray-900 text-white border-gray-900" : "bg-white hover:bg-gray-100"}`}
                    >
                        Últimos 90 días
                    </button>
                </div>
            </div>
            {data?.isGlobalSearch && (
                <p className="mx-auto mb-4 w-[95%] rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
                    Búsqueda global activa: los resultados incluyen todas las órdenes anteriores, sin límite de fechas.
                </p>
            )}

            {completeOrders.length === 0 ? (
                <div className="flex justify-center items-center bg-gray-100 mx-auto rounded-lg border" style={{ height: "20vh", width: "95%" }}>
                    <p className="text-lg text-gray-500">No hay órdenes anteriores para este filtro.</p>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-lg border rounded-lg mb-4 mx-auto bg-white" style={{ width: "95%" }}>
                    <table className="w-full text-sm text-left text-gray-500">
                        {tableHeader}
                        <tbody>
                            {completeOrders.map((order) => (
                                <OrdersTableItem key={order.order_id} order={order} onOrderCompleted={() => mutate()} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mx-auto flex w-[95%] items-center justify-between rounded-lg border bg-white px-4 py-3">
                <p className="text-sm text-gray-600">
                    Página {page} de {totalPages} · {totalCount} órdenes
                </p>
                <div className="flex gap-2 items-center">
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPage(1);
                            setPageSize(Number(e.target.value));
                        }}
                        className="h-10 rounded-md border border-gray-300 px-2 text-sm outline-none focus:border-gray-500"
                    >
                        <option value={10}>10 por página</option>
                        <option value={25}>25 por página</option>
                        <option value={50}>50 por página</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page <= 1}
                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Anterior
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={page >= totalPages}
                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrdersTable;
