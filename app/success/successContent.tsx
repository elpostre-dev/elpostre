'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from "@/lib/CartContext";

type Order = {
    order_id: string;
    client_id: string;
    final_price: number;
    discount_applied: boolean;
    pickup_date: string;
    pickup_hour: string;
    pickup_person_name: string;
    comments: string | null;
    completed: boolean;
    datetime_ordered: string;
    total: number;
    session_id: string;
    // Add other fields as necessary
};

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    const { emptyCart } = useCart();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (!session_id) {
                setLoading(false);
                setErrorMessage('No se ha recibido el ID de la sesión de pago');
                return;
            }

            try {
                // Verificar el estado del pago con Stripe
                const res = await fetch(`/api/stripe/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id }),
                });

                if (res.ok) {
                    const { payment_status } = await res.json();
                    if (payment_status === 'paid') {
                        // Consultar o guardar la orden en la base de datos
                        const orderRes = await fetch('/api/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                session_id,
                                ...JSON.parse(localStorage.getItem('orderInfo') || '{}'),
                                products: JSON.parse(localStorage.getItem('cartItems') || '[]'),
                            }),
                        });

                        if (orderRes.ok) {
                            const { order } = await orderRes.json();
                            setOrder(order);
                            localStorage.removeItem('orderInfo');
                            localStorage.removeItem('cartItems');
                            emptyCart();
                        } else {
                            setErrorMessage('Error al guardar el pedido');
                        }
                    } else {
                        setErrorMessage('El pago no se completó correctamente');
                    }
                } else {
                    setErrorMessage('Error al verificar el estado del pago, no existe la sesión de pago');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                setErrorMessage('Error al procesar el pedido');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [session_id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <div role="status" className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-gray-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Cargando...</span>
                </div>
                <p className="text-lg ml-2 text-gray-500">Estamos generando el resumen del pedido...</p>
            </div>
        );
    }

    if (!order) {
        return <div>{errorMessage}</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-2">¡Gracias por tu compra!</h1>
            <p className="text-lg">Tu pedido ha sido recibido y está siendo procesado.</p>
            <h2>Detalles del pedido:</h2>
            <p>ID del pedido: {order.order_id}</p>
            <p>Nombre: {order.pickup_person_name}</p>
            <p>Fecha de recogida: {order.pickup_date}</p>
            <p>Hora de recogida: {order.pickup_hour}</p>
            {/* Agrega más detalles del pedido según sea necesario */}
        </div>
    );
};

export default SuccessContent;
