import { useState } from 'react';
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlusCircle, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation";
import { set } from 'date-fns';

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

export default function ProductosAdminItem({ p }: { p: Product }) {
    const [updating, setUpdating] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [currAddingId, setCurrAddingId] = useState(-1)
    const [addingVariation, setAddingVariation] = useState(false)
    const [newVariation, setNewVariation] = useState<ProductVariation>({
        id: -1,
        producto_id: p.id,
        tamanio: "",
        personas: "",
        precio: 0,
    })

    const [originalProduct, setOriginalProduct] = useState<Product>({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        categoria_id: p.categoria_id,
        categoria_nombre: p.categoria_nombre,
        temporada: p.temporada,
        fotos: p.fotos,
        activo: p.activo,
        en_venta: p.en_venta,
        variaciones: p.variaciones,
    })

    const [product, setProduct] = useState<Product>({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        categoria_id: p.categoria_id,
        categoria_nombre: p.categoria_nombre,
        temporada: p.temporada,
        fotos: p.fotos,
        activo: p.activo,
        en_venta: p.en_venta,
        variaciones: p.variaciones,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProduct((prev) => ({ ...prev, [name]: value }))
    }

    const categoriasWithId = [
        { id: 1, nombre: 'Pasteles' },
        { id: 2, nombre: 'Pays' },
        { id: 3, nombre: 'Brownies' },
        { id: 4, nombre: 'Galletas' },
        { id: 5, nombre: 'Keto' },
        { id: 6, nombre: 'Muffins y Panqués' },
        { id: 7, nombre: 'Individuales' },
        { id: 8, nombre: 'Temporada' },
    ]

    const handleSelectChange = (name: string, value: string) => {
        setProduct((prev) => ({ ...prev, [name]: value }))
        if (name === 'categoria_nombre') {
            setProduct((prev) => ({ ...prev, categoria_id: categoriasWithId.find((c) => c.nombre === value)?.id ?? prev.categoria_id }))
        }
    }

    const handleSwitchChange = (name: string, checked: boolean) => {
        setProduct((prev) => ({ ...prev, [name]: checked }))
    }

    const removeImage = (index: number) => {
        setProduct((prev) => ({
            ...prev,
            fotos: prev.fotos.filter((_, i) => i !== index),
        }))
    }

    const updateVariation = (id: number, field: keyof ProductVariation, value: string | number) => {
        console.log(id, field, value)
        setProduct((prev) => ({
            ...prev,
            variaciones: prev.variaciones.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
        }))
    }

    const removeVariation = (id: number) => {
        setProduct((prev) => ({
            ...prev,
            variaciones: prev.variaciones.filter((v) => v.id !== id),
        }))
    }

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        setUploadingImage(true);
        const formData = new FormData();
        for (const file of event.target.files) {
            formData.append('files', file);
        }

        try {
            const res = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Error uploading image');
            }

            const { imageUrls } = await res.json();
            console.log('Uploaded Image URLs:', imageUrls);

            // Update the product state with new image URLs
            setProduct((prev) => ({
                ...prev,
                fotos: [...prev.fotos, ...imageUrls], // Append new image URLs
            }));
            setUploadingImage(false);
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadingImage(false);
        }

    };

    const handleUpdateProduct = async () => {
        console.log('Updating product:', product)
        setUpdating(true);
        try {
            const res = await fetch('/api/updateProductWithId', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // 🔹 Send the product directly
            });

            if (res.ok) {
                setUpdating(false);
                window.location.reload();
            } else {
                console.error('Failed to update the product');
            }
        } catch (error) {
            console.error('Error updating the product:', error);
        }
    };


    return (
        <TableRow key={p.id}>

            {/* name and image */}
            <TableCell>
                <Link href={`/productos/${p.id}`} className="text-blue-600 hover:underline flex items-center" target="_blank">
                    <img
                        src={p.fotos[0]}
                        alt={p.nombre}
                        className="mr-3 h-12 w-12 rounded object-cover object-center"
                    />
                    {p.nombre}
                </Link>
            </TableCell>

            {/* variaciones */}
            <TableCell>{p.variaciones.length} variaciones</TableCell>

            {/* activo */}
            <TableCell>
                <p className="text-sm font-medium leading-none">
                    <Badge className={`text-xs ${p.activo ? 'bg-green-500' : 'bg-red-500'}`}>
                        {p.activo ? 'Visible' : 'No visible'}
                    </Badge>
                </p>
            </TableCell>

            {/* en venta */}
            <TableCell>
                <p className="text-sm font-medium leading-none">
                    <Badge className={`text-xs ${p.en_venta ? 'bg-green-500' : 'bg-red-500'}`}>
                        {p.en_venta ? 'En venta' : 'No en venta'}
                    </Badge>
                </p>
            </TableCell>

            {/* IF temporada */}
            {p.temporada && <TableCell>{p.temporada}</TableCell>}

            {/* editar */}
            <Dialog onOpenChange={(isOpen) => isOpen && setProduct(originalProduct)}>

                <DialogTrigger asChild>
                    <TableCell>
                        <a className="text-blue-600 hover:underline hover:cursor-pointer">Editar</a>
                    </TableCell>
                </DialogTrigger>

                <DialogContent style={{ width: '96%' }}>

                    <DialogHeader>
                        <DialogTitle>Editar Producto</DialogTitle>
                        <DialogDescription>Aquí puedes editar la información del produto.</DialogDescription>
                    </DialogHeader>

                    <hr />

                    {/* warning message */}
                    <div className="bg-red-100 border-l-4 border-red-500 p-4">
                        <p className="text-red-700">Todos los campos son obligatorios.</p>
                    </div>

                    <ScrollArea className="max-h-[500px] w-full p-2">

                        <div className="grid gap-4 p-2">

                            {/* Nombre */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nombre
                                </Label>
                                <Input id="name" name="nombre" value={product.nombre} onChange={handleInputChange} className="col-span-3" />
                            </div>

                            {/* Descripcion */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Descripción <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="descripcion"
                                    value={product.descripcion}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>

                            {/* Categoria */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Categoría
                                </Label>
                                <Select
                                    onValueChange={(value) => handleSelectChange("categoria_nombre", value)}
                                    value={product.categoria_nombre}
                                    defaultValue={p.categoria_nombre}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem className='hover:bg-gray-100' value="Pasteles">Pasteles</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Pays">Pays</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Brownies">Brownies</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Galletas">Galletas</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Keto">Keto</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Muffins y Panqués">Muffins y Panqués</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Individuales">Individuales</SelectItem>
                                        <SelectItem className='hover:bg-gray-100' value="Temporada">Temporada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Temporada */}
                            {product.categoria_nombre === 'Temporada' &&
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="season" className="text-right">
                                        Temporada
                                    </Label>
                                    <Select
                                        onValueChange={(value) => handleSelectChange("temporada", value)}
                                        value={product.temporada}
                                        defaultValue={p.temporada}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a season" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className='hover:bg-gray-100' value="Navidad">Navidad</SelectItem>
                                            <SelectItem className='hover:bg-gray-100' value="San Valentín">San Valentín</SelectItem>
                                            <SelectItem className='hover:bg-gray-100' value="Bodas, Comuniones y Bautizos">Bodas, Comuniones y Bautizos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            }

                            {/* Fotos */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="images" className="text-right">
                                    Fotos
                                </Label>
                                {uploadingImage ? (
                                    <p className="col-span-3 text-gray-600">
                                        Subiendo...
                                    </p>
                                ) : (
                                    <div className="col-span-3">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {product.fotos.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <PlusCircle className="w-5 h-5" />
                                                <span>Agregar foto</span>
                                            </div>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Visible */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="active" className="text-right">
                                    Visible
                                </Label>
                                <Switch
                                    id="activo"
                                    checked={product.activo}
                                    onCheckedChange={(checked) => handleSwitchChange("activo", checked)}
                                />
                            </div>

                            {/* En venta */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="onSale" className="text-right">
                                    En venta
                                </Label>
                                <Switch
                                    id="en_venta"
                                    checked={product.en_venta}
                                    onCheckedChange={(checked) => handleSwitchChange("en_venta", checked)}
                                />
                            </div>

                            {/* Variaciones */}
                            <div className="grid gap-4 mt-4">

                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Variaciones</h3>
                                    <Button onClick={() => setAddingVariation(true)} size="sm">
                                        Agregar Variación
                                    </Button>
                                </div>

                                {addingVariation && (
                                    <div className="grid gap-2 p-4 border border-blue-500 rounded-md bg-gray-100">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={`variation-name-new`} className="text-right">
                                                Tamaño
                                            </Label>
                                            <Input
                                                id={`variation-name-new`}
                                                value={newVariation.tamanio}
                                                onChange={(e) => setNewVariation((prev) => ({ ...prev, tamanio: e.target.value }))}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={`variation-description-new`} className="text-right">
                                                Personas
                                            </Label>
                                            <Input
                                                id={`variation-description-new`}
                                                value={newVariation.personas}
                                                onChange={(e) => setNewVariation((prev) => ({ ...prev, personas: e.target.value }))}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={`variation-price-new`} className="text-right">
                                                Precio
                                            </Label>
                                            <Input
                                                id={`variation-price-new`}
                                                type="number"
                                                value={newVariation.precio}
                                                onChange={(e) => setNewVariation((prev) => ({ ...prev, precio: Number.parseFloat(e.target.value) }))}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    variaciones: [...prev.variaciones, newVariation],
                                                }))
                                                setAddingVariation(false)
                                                setNewVariation({
                                                    id: currAddingId - 1,
                                                    producto_id: product.id,
                                                    tamanio: "",
                                                    personas: "",
                                                    precio: 0,
                                                })
                                                setCurrAddingId((prev) => prev - 1)
                                            }}
                                            variant="default"
                                            size="sm"
                                            className="mt-2 w-full bg-blue-500 text-white hover:bg-blue-700"
                                        >
                                            Agregar
                                        </Button>
                                    </div>
                                )}

                                {product.variaciones.map((variation) => (
                                    <div key={variation.id} className="grid gap-2 p-4 border rounded-md">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={`variation-name-${variation.id}`} className="text-right">
                                                Tamaño
                                            </Label>
                                            <Input
                                                id={`variation-name-${variation.id}`}
                                                value={variation.tamanio}
                                                onChange={(e) => updateVariation(variation.id, "tamanio", e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={`variation-description-${variation.id}`} className="text-right">
                                                Personas
                                            </Label>
                                            <Input
                                                id={`variation-description-${variation.id}`}
                                                value={variation.personas}
                                                onChange={(e) => updateVariation(variation.id, "personas", e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={`variation-price-${variation.id}`} className="text-right">
                                                Precio
                                            </Label>
                                            <Input
                                                id={`variation-price-${variation.id}`}
                                                type="number"
                                                value={variation.precio}
                                                onChange={(e) => updateVariation(variation.id, "precio", Number.parseFloat(e.target.value))}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <Button
                                            onClick={() => removeVariation(variation.id)}
                                            variant="destructive"
                                            size="sm"
                                            className="mt-2 w-full"
                                        >
                                            Borrar
                                        </Button>
                                    </div>
                                ))}

                                {product.variaciones.length === 0 && (
                                    <div className="p-4 border rounded-md text-center">
                                        No hay variaciones, debe agregar al menos una.
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>

                    <Button onClick={handleUpdateProduct} disabled={updating}>
                        {updating ? 'Guardando...' : 'Guardar'}
                    </Button>

                </DialogContent>
            </Dialog>

        </TableRow>

    )
}
