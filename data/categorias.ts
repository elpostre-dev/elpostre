export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

export const categorias: Categoria[] = [
    { id: 1, nombre: "Pasteles", descripcion: "Deliciosos pasteles en diversas variedades." },
    { id: 2, nombre: "Pays", descripcion: "Pays caseros con ingredientes frescos." },
    { id: 3, nombre: "Brownies", descripcion: "Brownies chocolatosos y jugosos." },
    { id: 4, nombre: "Galletas", descripcion: "Galletas crujientes y suaves." },
    { id: 5, nombre: "Keto", descripcion: "Opciones bajas en carbohidratos y sin azúcar." },
    { id: 6, nombre: "Muffins y Panqués", descripcion: "Muffins y panqués para todos los gustos." },
    { id: 7, nombre: "Individuales", descripcion: "Porciones individuales para disfrutar sin compartir." },
    { id: 8, nombre: "Temporada", descripcion: "Productos especiales disponibles por tiempo limitado." }
];
