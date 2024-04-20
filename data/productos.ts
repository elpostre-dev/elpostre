// data/productos.ts
export interface Variacion {
    tamanio: string;
    precio: number;
    personas: string; // Indica para cuántas personas es adecuado el pastel
}

export interface Producto {
    id: number;
    nombre: string;
    categoriaId: number;
    categoriaNombre: string;
    descripcion: string; // Descripción general del producto
    variaciones: Variacion[];
    fotos: string[];
}

export const productos: Producto[] = [
    // PASTELES
    {
        id: 1,
        nombre: "Pastel Rosas Blancas",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro exquisito pan de vainilla con betún de merengue. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Mediano Alto",
                precio: 750.00,
                personas: "De 10 a 12 personas"
            },
        ],
        fotos: ["/Pasteles/ROSAS_BLANCAS.jpg", "/Pasteles/ROSAS_BLANCAS_2.jpg"]
    },
    {
        id: 2,
        nombre: "Rosca de Vainilla y Chocolate",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestra famosa rosca de pan de vainilla con nuestro tradicional betún de chocolate. ¡Deliciosa! También disponible en pan de chocolate.",
        variaciones: [
            {
                tamanio: "Rosca Grande",
                precio: 780.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 390.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/ROSCA_V-CH.jpg", "/Pasteles/ROSCA_V-CH_2.jpg"]
    },
    {
        id: 3,
        nombre: "Rosca de Fresas",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro deliciosa rosca de fresa. Pan blanco, betún de queso crema y mucha fresa.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
                personas: "De 15 a 18 personas"
            },
        ],
        fotos: ["/Pasteles/ROSCA_FRESAS.jpg", "/Pasteles/ROSCA_FRESAS_2.jpg"]
    },
    {
        id: 4,
        nombre: "Rosca de Mango",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestra deliciosa rosca de pan de vainilla rellena de mango y nuestro betún de queso crema. (Únicamente en temporada)",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
                personas: "De 15 a 18 personas"
            },
        ],
        fotos: ["/Pasteles/ROSCA_MANGO.jpg", "/Pasteles/ROSCA_MANGO_2.jpg"]
    },
    {
        id: 5,
        nombre: "Pastel Confetti",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro rico pan de vainilla cubierto con betun de merengue. ¡Delicioso!",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 390.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 170.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/CONFETTI.jpg", "/Pasteles/CONFETTI_2.jpg"]
    },
    {
        id: 6,
        nombre: "Mostachón de Fresas",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro mostachón de fresa, en tres tamaños… simplemente delicioso.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/MOSTACHON_FRESA.jpg", "/Pasteles/MOSTACHON_FRESA_2.jpg"]
    },
    {
        id: 7,
        nombre: "Mostachón de Mango",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro mostachón de mango, únicamente en temporada.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/MOSTACHON_MANGO.jpg", "/Pasteles/MOSTACHON_MANGO_2.jpg"]
    },
    {
        id: 8,
        nombre: "Pastel Ferrero",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso pan de chocolate con nuestra crema especial de Ferrero y chocolate.",
        variaciones: [
            {
                tamanio: "Mediano Alto",
                precio: 940.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 520.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/FERRERO.jpg", "/Pasteles/FERRERO_2.jpg"]
    },
    {
        id: 9,
        nombre: "Pastel de Chocolate con Merengue",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso pastel de chocolate con merengue.",
        variaciones: [
            {
                tamanio: "Rosca Grande",
                precio: 780.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 390.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/ROSCA_CH-MERENGUE.jpg", "/Pasteles/ROSCA_CH-MERENGUE_2.jpg"]
    },
    {
        id: 10,
        nombre: "Pastel Zebra",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestra deliciosa combinación de pan blanco y chocolate, con el sabor de Milky Way y vainilla.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/ZEBRA.jpg", "/Pasteles/ZEBRA_2.jpg"]
    },
    {
        id: 11,
        nombre: "Pastel Dark",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso Pastel Dark, que cuenta con pan de chocolate semi amargo y un delicioso betún de chocolate dark. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 1200.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 860.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 520.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/DARK.jpg", "/Pasteles/DARK_2.jpg"]
    },
    {
        id: 12,
        nombre: "Pastel Rayado",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso pastel rayado con pan de chocolate cubierto con crema de milky way.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/RAYADO.jpg", "/Pasteles/RAYADO_2.jpg"]
    },
    {
        id: 13,
        nombre: "Pastel Oreo",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro rico pan de chocolate con exquisito relleno de oreo y chocolate.",
        variaciones: [
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/OREO.jpg", "/Pasteles/OREO_2.jpg"]
    },
    {
        id: 14,
        nombre: "Pastel Zanahoria",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso pastel de zanahoria, elaborado con ricas especias.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/ZANAHORIA.jpg", "/Pasteles/ZANAHORIA_2.jpg"]
    },
    {
        id: 15,
        nombre: "Pastel Pistache",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro pan de vainilla, relleno de betún con pistache caramelizado cubierto de nuestro tradicional betún de merengue. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 1200.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 940.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 520.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/PISTACHE.jpg", "/Pasteles/PISTACHE_2.jpg"]
    },
    {
        id: 16,
        nombre: "Pastel Mechudo",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro rico pan de vainilla, mermelada de chabacano y delicioso betún blanco y coco.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/MECHUDO.jpg", "/Pasteles/MECHUDO_2.jpg"]
    },
    {
        id: 17,
        nombre: "Mostachón de Cajeta y Plátano",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso mostachón de plátano, el favorito de los deportistas.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/MOSTACHON_CAJETA.jpg", "/Pasteles/MOSTACHON_CAJETA_2.jpg"]
    },
    {
        id: 18,
        nombre: "Pastel de Toffee",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestros deliciosos pastel de toffee. Con pan de chocolate y relleno de toffee. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Mediano Alto",
                precio: 940.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 520.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/TOFFEE.jpg", "/Pasteles/TOFFEE_2.jpg"]
    },
    {
        id: 19,
        nombre: "Pastel Pingüino",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso pan de chocolate con capas de crema blanca y chocolate, cajeta y nuez. El sabor que nos dió fama.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/PINGUINO.jpg", "/Pasteles/PINGUINO_2.jpg"]
    },
    {
        id: 20,
        nombre: "Pastel de 4 Leches",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestra cuarta leche la cajeta.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 780.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/4_LECHES.jpg", "/Pasteles/4_LECHES_2.jpg"]
    },
    {
        id: 21,
        nombre: "Pastel de Brownie",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Pastel de brownie con nuez y cajeta. Delicioso.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/PASTEL_BROWNIE.jpg", "/Pasteles/PASTEL_BROWNIE_2.jpg"]
    },
    {
        id: 22,
        nombre: "Pastel de Brownie con Alemán",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Nuestro delicioso pastel de brownie con betún alemán. Perfecta combinación. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Bajo",
                precio: 460.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Pasteles/PASTEL_BROWNIE_ALEMAN.jpg"]
    },
    {
        id: 23,
        nombre: "Pastel de Rosas Rosas",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro exquisito pan de chocolate con betún de merengue. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: "De 10 a 12 personas"
            },
        ],
        fotos: ["/Pasteles/ROSAS_ROSAS.jpg", "/Pasteles/ROSAS_ROSAS_2.jpg"]
    },
    {
        id: 24,
        nombre: "Pastel de Rosas de Chocolate",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro rico pan de chocolate con betún de chocolate. Además de rico, hermoso. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 1050.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 850.00,
                personas: "De 10 a 12 personas"
            },
        ],
        fotos: ["/Pasteles/ROSAS_CHOCOLATE.jpg", "/Pasteles/ROSAS_CHOCOLATE_2.jpg"]
    },
];
