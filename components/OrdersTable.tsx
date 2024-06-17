'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/types/types';
import OrdersTableItem from './OrdersTableItem';

const OrdersTable = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    async function fetchOrders() {
        console.log('** fetchOrders() - Fetching orders...');
        const res = await fetch('/api/admin/orders', { cache: 'no-store' });
        const data = await res.json();
        setOrders(data.orders);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const incompleteOrders = orders.filter(order => !order.completed);
    const completeOrders = orders.filter(order => order.completed);

    return (
        <div className="p-6 mb-20">
            {/* Ordenes Incompletas */}
            <h2 className="text-4xl font-semibold py-8 px-8">Órdenes Incompletas</h2>
            {incompleteOrders.length === 0
                ? (
                    <div className="flex justify-center items-center bg-gray-200 mx-auto rounded-lg" style={{ height: '20vh', width: '95%' }}>
                        <p className="text-xl text-gray-500">No hay órdenes incompletas.</p>
                    </div>
                )
                : (
                    <div className="relative overflow-x-auto shadow-lg border rounded-lg mb-8 mx-auto" style={{ width: '95%' }}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                            <tbody>
                                {incompleteOrders.map(order => (
                                    <OrdersTableItem key={order.order_id} order={order} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            {/* Ordenes Anteriores */}
            <h2 className="text-4xl font-semibold py-8 px-8">Órdenes Anteriores</h2>
            {completeOrders.length === 0
                ? (
                    <div className="flex justify-center items-center bg-gray-200 mx-auto rounded-lg" style={{ height: '20vh', width: '95%' }}>
                        <p className="text-xl text-gray-500">No hay órdenes anteriores.</p>
                    </div>
                )
                : (
                    <div className="relative overflow-x-auto shadow-lg border rounded-lg mb-8 mx-auto" style={{ width: '95%' }}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                            <tbody>
                                {completeOrders.map(order => (
                                    <OrdersTableItem key={order.order_id} order={order} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    );
};

export default OrdersTable;
