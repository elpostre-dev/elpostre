import Link from "next/link";
import clsx from "clsx";
import { Order } from '@/types/types';
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { es } from 'date-fns/locale'; // Importa el locale español

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { productos } from '@/data/productos';


export default function OrdersTableItem({ order }: { order: Order }) {
    console.log(order)
    return (
        <tr key={order.order_id} className="bg-white border-b">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900 text-wrap max-w-24">
                {order.client_name}
            </th>
            <td className="px-4 py-4 hidden sm:table-cell">{formatCurrency(order.final_price)} MXN</td>
            <td className="px-4 py-4 hidden md:table-cell">{format(order.datetime_ordered, "EEEE d 'de' MMMM, yyyy", { locale: es })}</td>
            <td className="px-4 py-4 bg-gray-100">{format(order.pickup_date, "EEEE d 'de' MMMM, yyyy", { locale: es })}</td>
            <td className="px-4 py-4 bg-gray-100 hidden sm:table-cell">{order.pickup_hour}</td>
            <Dialog>

                <DialogTrigger asChild>
                    <td className="px-4 py-4 text-center">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detalles</a>
                    </td>
                </DialogTrigger>

                <DialogContent style={{ width: '96%' }}>

                    <DialogHeader className="">
                        <DialogTitle>Detalles de la orden</DialogTitle>
                        <DialogDescription>
                            Aquí puedes ver los detalles de la orden.
                        </DialogDescription>
                        <hr />
                    </DialogHeader>

                    <ScrollArea className="max-h-[500px] w-full p-2">

                        {/* <hr className="my-4 bg-gray-200" style={{ height: '5px' }} /> */}

                        {/* ORDEN */}
                        <div className="mb-4">
                            <h1 className="text-xl font-bold">Orden</h1>

                            {/* Precios */}
                            <ResizablePanelGroup
                                direction="horizontal"
                                className="items-center border rounded-lg border-black bg-gray-200 my-3"
                            >

                                {/* total */}
                                <ResizablePanel defaultSize={33} className="text-center border-r py-1 border-black">
                                    <div className="flex items-center justify-center text-xs sm:text-sm mb-[-5px]">
                                        {formatCurrency(order.total)}
                                    </div>
                                    <span className="text-slate-500 font-semibold text-xs">Total</span>
                                </ResizablePanel>

                                {/* descuento */}
                                <ResizablePanel defaultSize={33} className="text-center border-r py-1 border-black">
                                    <div className="flex items-center justify-center text-xs sm:text-sm mb-[-5px]">
                                        {order.discount_applied ? formatCurrency(order.total - order.final_price) : formatCurrency(0)}
                                    </div>
                                    <span className="text-slate-500 font-semibold text-xs">Descuento</span>
                                </ResizablePanel>

                                {/* Precio final */}
                                <ResizablePanel defaultSize={33} className="text-center py-1">
                                    <div className="flex items-center justify-center text-xs sm:text-sm mb-[-5px]">
                                        {formatCurrency(order.final_price)}
                                    </div>
                                    <span className="text-slate-500 font-semibold text-xs">Precio final</span>
                                </ResizablePanel>

                            </ResizablePanelGroup>

                            {order.items.map(item => (
                                <div key={item.item_id}>
                                    <hr />
                                    <div key={item.item_id} className="flex items-center justify-between py-2">
                                        <div className="flex flex-row items-center">
                                            <img
                                                src={productos.find(p => p.nombre === item.product_name)?.fotos[0]}
                                                alt={item.product_name}
                                                className="mr-4 h-12 w-12 rounded object-cover object-center"
                                            />
                                            <div className="flex flex-col">
                                                <p className="font-semibold">{item.product_name}</p>
                                                <p className="text-gray-500 text-sm">{item.size}</p>
                                            </div>
                                        </div>
                                        <p><span className="">{item.quantity}</span> x {formatCurrency(item.unit_price)}</p>
                                    </div>
                                </ div>
                            ))}
                            <hr />

                            <div className="grid w-full gap-1.5 my-4">
                                <Label htmlFor="message">Comentarios del cliente</Label>
                                <div>
                                    <Textarea
                                        id="message"
                                        value={order.comments || "Sin comentarios"}
                                        className="bg-gray-100 w-full p-2 rounded-lg border border-gray-300"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <p className="text-sm">Numero de productos: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <p className="text-sm">Ordenado el {format(order.datetime_ordered, "EEEE d 'de' MMMM", { locale: es })}</p>
                        </div>

                        {/* RECOGIDA */}
                        <div>

                            <h1 className="text-xl font-bold">Recogida</h1>
                            <ResizablePanelGroup
                                direction="vertical"
                                className="min-h-[110px] border border-black rounded-lg mb-4 mt-2"
                            >

                                {/* arriba */}
                                <ResizablePanel defaultSize={50} className="border-b border-black">
                                    <ResizablePanelGroup
                                        direction="horizontal"
                                        className="items-center"
                                    >

                                        {/* izq */}
                                        <ResizablePanel defaultSize={50} className="text-center border-r py-4 border-black">
                                            <div className="flex items-center justify-center text-xs sm:text-sm mb-[-5px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-1">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                </svg>
                                                {format(order.pickup_date, "EEEE d 'de' MMMM", { locale: es })}
                                            </div>
                                            <span className="text-slate-500 font-semibold text-xs">Fecha</span>
                                        </ResizablePanel>

                                        {/* der */}
                                        <ResizablePanel defaultSize={50} className="text-center py-4">
                                            <div className="flex items-center justify-center text-xs sm:text-sm mb-[-5px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-1">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                {order.pickup_hour}
                                            </div>
                                            <span className="text-slate-500 font-semibold text-xs">Hora</span>
                                        </ResizablePanel>

                                    </ResizablePanelGroup>
                                </ResizablePanel>

                                {/* abajo */}
                                <ResizablePanel defaultSize={50} className="flex items-center justify-center">
                                    <div className="flex flex-col items-center justify-center text-xs sm:text-sm text-center">
                                        {order.pickup_person_name}
                                        <span className="text-slate-500 font-semibold text-xs">Persona que recoge</span>
                                    </div>
                                </ResizablePanel>

                            </ResizablePanelGroup>

                        </div>

                        {/* <hr className="my-4 bg-gray-200" style={{ height: '5px' }} /> */}

                        {/* CLIENTE */}
                        <div>
                            <h1 className="text-xl font-bold">Cliente</h1>
                            {/* <p>client_id: {order.client_id}</p> */}
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                {order.client_name}
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>

                                {order.client_email}
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>

                                {order.client_phone}
                            </p>
                        </div>

                    </ScrollArea>

                </DialogContent>
            </Dialog>
        </tr>
    )
}