'use client';

import { useState } from 'react';
import Image from "next/image";
import { Order } from '@/types/types';
import { formatCurrency } from "@/lib/utils";
import { format, isValid, parse, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

import {
    Badge
} from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    fotos: string[];
}

const productCache = new Map<string, Product | null>();

function parseDateValue(dateString: string) {
    if (!dateString) return null;

    if (dateString.includes("T")) {
        const parsedIso = parseISO(dateString);
        if (isValid(parsedIso)) return parsedIso;
    }

    const datePart = dateString.split(' ')[0];
    const parsedDate = parse(datePart, 'yyyy-MM-dd', new Date());
    if (isValid(parsedDate)) return parsedDate;

    const fallbackDate = new Date(dateString);
    if (isValid(fallbackDate)) return fallbackDate;

    return null;
}

function formatDateText(rawDate: string, datePattern: string) {
    const parsedDate = parseDateValue(rawDate);
    if (!parsedDate) return rawDate;
    return format(parsedDate, datePattern, { locale: es });
}

export default function OrdersTableItem({
    order,
    onOrderCompleted,
}: {
    order: Order;
    onOrderCompleted?: () => void;
}) {
    const [isCompleted, setIsCompleted] = useState(order.completed);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsData, setProductsData] = useState<{ [key: string]: Product | null }>({});

    const router = useRouter();

    const handleCompleteOrder = async () => {
        try {
            const res = await fetch('/api/completeOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: order.order_id }),
            });

            if (res.ok) {
                setIsCompleted(true);
                onOrderCompleted?.();
                router.refresh();
            } else {
                console.error('Failed to complete the order');
            }
        } catch (error) {
            console.error('Error completing the order:', error);
        }
    };

    const loadProductsData = async () => {
        if (loadingProducts) return;

        const uniqueProductNames = Array.from(new Set(order.items.map((item) => item.product_name)));
        const missingNames = uniqueProductNames.filter((name) => !productCache.has(name));

        if (missingNames.length > 0) {
            setLoadingProducts(true);
            try {
                await Promise.all(
                    missingNames.map(async (name) => {
                        const response = await fetch(`/api/getProductByName?productName=${encodeURIComponent(name)}`);
                        if (!response.ok) {
                            productCache.set(name, null);
                            return;
                        }
                        const product = (await response.json()) as Product;
                        productCache.set(name, product);
                    })
                );
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoadingProducts(false);
            }
        }

        const mappedProducts = uniqueProductNames.reduce((acc, name) => {
            acc[name] = productCache.get(name) ?? null;
            return acc;
        }, {} as Record<string, Product | null>);

        setProductsData(mappedProducts);
    };

    return (
        <tr key={order.order_id} className="bg-white border-b">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900 text-wrap max-w-24">
                {order.client_name}
            </th>
            <td className="px-4 py-4 hidden sm:table-cell">{formatCurrency(order.final_price)} MXN</td>
            <td className="px-4 py-4 hidden md:table-cell">{formatDateText(order.datetime_ordered, "EEEE d 'de' MMMM, yyyy")}</td>
            <td className="px-4 py-4 bg-gray-100">{formatDateText(order.pickup_date, "EEEE d 'de' MMMM, yyyy")}</td>
            <td className="px-4 py-4 bg-gray-100 hidden sm:table-cell">{order.pickup_hour}</td>
            <td className="px-4 py-4 text-center">
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) {
                            void loadProductsData();
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <button type="button" className="font-medium text-blue-600 hover:underline">
                            Ver detalles
                        </button>
                    </DialogTrigger>
                    <DialogContent className="w-[96vw] max-w-5xl h-[88vh] p-0 overflow-hidden flex flex-col [&>button]:opacity-100 [&>button]:z-30 [&>button]:text-gray-800 [&>button]:border [&>button]:rounded-full [&>button]:bg-white [&>button]:p-1.5 [&>button]:top-5 [&>button]:right-5 [&>button]:shadow-sm">
                    <DialogHeader className="border-b px-6 py-5 pr-16 shrink-0 bg-white">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <DialogTitle className="text-2xl">Detalle de orden</DialogTitle>
                                <DialogDescription className="pt-1 text-base">
                                    Recogida: {formatDateText(order.pickup_date, "EEEE d 'de' MMMM, yyyy")} - {order.pickup_hour}
                                </DialogDescription>
                            </div>
                            <Badge className={isCompleted ? "bg-green-600 hover:bg-green-600" : "bg-amber-500 hover:bg-amber-500"}>
                                {isCompleted ? "Completada" : "Pendiente"}
                            </Badge>
                        </div>
                        {!isCompleted && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto">
                                        Marcar como completada
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Marcar como completada?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción moverá la orden a órdenes anteriores.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleCompleteOrder}>Completar orden</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6 pb-10">
                        <div className="mb-8 rounded-xl border bg-white p-5">
                            <h3 className="mb-3 text-2xl font-bold">Orden</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-lg border bg-gray-50 p-4 text-center">
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                                </div>
                                <div className="rounded-lg border bg-gray-50 p-4 text-center">
                                    <p className="text-sm text-gray-500">Descuento</p>
                                    <p className="font-semibold">{order.discount_applied ? formatCurrency(order.total - order.final_price) : formatCurrency(0)}</p>
                                </div>
                                <div className="rounded-lg border bg-gray-50 p-4 text-center">
                                    <p className="text-sm text-gray-500">Precio final</p>
                                    <p className="font-semibold">{formatCurrency(order.final_price)}</p>
                                </div>
                            </div>

                            <div className="my-6">
                                <h4 className="text-lg font-semibold mb-2">Productos</h4>
                                {loadingProducts ? (
                                    <p className="text-sm text-gray-500">Cargando productos...</p>
                                ) : (
                                    <div className="space-y-2">
                                        {order.items.map((item) => (
                                            <div key={item.item_id} className="flex items-center justify-between rounded-lg border p-3">
                                                <div className="flex items-center gap-3">
                                                    <Image
                                                        src={productsData[item.product_name]?.fotos?.[0] || "/placeholder.svg"}
                                                        alt={item.product_name}
                                                        className="h-14 w-14 rounded object-cover"
                                                        width={56}
                                                        height={56}
                                                        sizes="56px"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.product_name}</p>
                                                        <p className="text-xs text-gray-500">{item.size}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm">
                                                    {item.quantity} x {formatCurrency(item.unit_price)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid w-full gap-1.5 mt-6">
                                <Label htmlFor={`comments-${order.order_id}`}>Comentarios del cliente</Label>
                                <Textarea
                                    id={`comments-${order.order_id}`}
                                    value={order.comments || "Sin comentarios"}
                                    className="bg-gray-100 w-full rounded-lg border border-gray-300"
                                    disabled
                                />
                            </div>

                            <p className="mt-4 text-sm">Cantidad total: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <p className="text-sm">Ordenado el {formatDateText(order.datetime_ordered, "EEEE d 'de' MMMM, yyyy")}</p>
                        </div>

                        <div className="mb-8 rounded-xl border bg-white p-5">
                            <h3 className="mb-3 text-2xl font-bold">Recogida</h3>
                            <div className="rounded-lg border bg-gray-50 p-5">
                                <p className="text-sm">Fecha: {formatDateText(order.pickup_date, "EEEE d 'de' MMMM, yyyy")}</p>
                                <p className="text-sm">Hora: {order.pickup_hour}</p>
                                <p className="text-sm">Persona que recoge: {order.pickup_person_name}</p>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-white p-5">
                            <h3 className="mb-3 text-2xl font-bold">Cliente</h3>
                            <div className="rounded-lg border bg-gray-50 p-5">
                                <p className="text-sm">{order.client_name}</p>
                                <p className="text-sm">{order.client_email}</p>
                                <p className="text-sm">{order.client_phone}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                </Dialog>
            </td>
        </tr>
    );
}
