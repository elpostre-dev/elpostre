import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody } from "@/components/ui/table"
import { useState, useEffect } from "react";
import ProductosAdminItem from "./ProductosAdminItem";

interface ProductVariation {
    id: number;
    producto_id: number;
    tamanio: string;
    precio: number;
    personas: string;
}

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    categoria_id: number;
    categoria_nombre: string;
    fotos: string[];
    temporada: string;
    activo: boolean;
    en_venta: boolean;
    variaciones: ProductVariation[]; // Include variations
}

export default function ProductosAdmin() {
    const categories = [
        { id: 1, nombre: "Pasteles" },
        { id: 2, nombre: "Pays" },
        { id: 3, nombre: "Brownies" },
        { id: 4, nombre: "Galletas" },
        { id: 5, nombre: "Keto" },
        { id: 6, nombre: "Muffins y Panqués" },
        { id: 7, nombre: "Individuales" },
        { id: 8, nombre: "Temporada" },
    ];

    const [openCategory, setOpenCategory] = useState<string>("");
    const [categoryProducts, setCategoryProducts] = useState<Record<number, Product[]>>({});
    const [loadingByCategory, setLoadingByCategory] = useState<Record<number, boolean>>({});
    const [errorByCategory, setErrorByCategory] = useState<Record<number, string | null>>({});

    const fetchProductsForCategory = async (categoryId: number) => {
        setLoadingByCategory((prev) => ({ ...prev, [categoryId]: true }));
        setErrorByCategory((prev) => ({ ...prev, [categoryId]: null }));

        try {
            const response = await fetch(`/api/products?categoryId=${categoryId}`, { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`Error loading category ${categoryId}`);
            }

            const products: Product[] = await response.json();
            setCategoryProducts((prev) => ({ ...prev, [categoryId]: products }));
        } catch (error) {
            console.error("Error fetching products by category:", error);
            setErrorByCategory((prev) => ({ ...prev, [categoryId]: "No se pudieron cargar los productos." }));
        } finally {
            setLoadingByCategory((prev) => ({ ...prev, [categoryId]: false }));
        }
    };

    useEffect(() => {
        if (!openCategory) return;

        const categoryId = Number.parseInt(openCategory, 10);
        if (!Number.isFinite(categoryId)) return;

        // Lazy-load once per category to avoid rendering/fetching all thumbnails at once.
        if (categoryProducts[categoryId] || loadingByCategory[categoryId]) {
            return;
        }

        fetchProductsForCategory(categoryId);
    }, [openCategory, categoryProducts, loadingByCategory]);


    return (
        <div className="container py-8 mb-10">

            {/* titulo */}
            <h2 className="text-3xl md:text-4xl font-semibold pb-5 md:pb-7">Productos</h2>

            <Accordion
                type="single"
                collapsible
                className="w-full space-y-2"
                value={openCategory}
                onValueChange={setOpenCategory}
            >
                {categories.map((category) => {
                    const products = categoryProducts[category.id] ?? [];
                    const isLoading = loadingByCategory[category.id];
                    const error = errorByCategory[category.id];

                    return (
                        <AccordionItem value={String(category.id)} key={category.id} className="border-none">
                            <AccordionTrigger className="text-left border border-gray-300 rounded-xl px-5 py-4 my-2 shadow-sm bg-white hover:bg-gray-50 data-[state=open]:rounded-b-none">
                                <span className="font-medium">{category.nombre}</span>
                            </AccordionTrigger>

                            <AccordionContent className="rounded-b-xl border border-t-0 border-gray-300 bg-white px-2 pb-2">
                                {isLoading ? (
                                    <div className="h-24 flex items-center justify-center">
                                        <div role="status" className="flex flex-col items-center justify-center gap-2">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="text-xs text-gray-500">Cargando productos...</span>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="p-4 text-sm text-red-600">{error}</div>
                                ) : products.length === 0 ? (
                                    <div className="p-4 text-sm text-gray-500">No hay productos en esta categoría.</div>
                                ) : (
                                    <div className="overflow-x-auto rounded-lg">
                                        <Table>
                                            <TableBody>
                                                {products.map((prod) => (
                                                    <ProductosAdminItem key={prod.id} p={prod} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}