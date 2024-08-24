// data/productos.ts
export interface Variacion {
    tamanio: string;
    precio: number;
    personas: string;
}

export interface Producto {
    id: number;
    nombre: string;
    categoriaId: number;
    categoriaNombre: string;
    descripcion: string;
    variaciones: Variacion[];
    fotos: string[];
    temporada?: string;
}

export const productos: Producto[] = [
    // PASTELES
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
    // {
    //     id: 4,
    //     nombre: "Rosca de Mango",
    //     categoriaId: 1,
    //     categoriaNombre: "Pasteles",
    //     descripcion: "Prueba nuestra deliciosa rosca de pan de vainilla rellena de mango y nuestro betún de queso crema. (Únicamente en temporada)",
    //     variaciones: [
    //         {
    //             tamanio: "Grande",
    //             precio: 940.00,
    //             personas: "De 15 a 18 personas"
    //         },
    //     ],
    //     fotos: ["/Pasteles/ROSCA_MANGO.jpg", "/Pasteles/ROSCA_MANGO_2.jpg"]
    // },
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
    // {
    //     id: 7,
    //     nombre: "Mostachón de Mango",
    //     categoriaId: 1,
    //     categoriaNombre: "Pasteles",
    //     descripcion: "Prueba nuestro mostachón de mango, únicamente en temporada.",
    //     variaciones: [
    //         {
    //             tamanio: "Grande",
    //             precio: 860.00,
    //             personas: "De 15 a 18 personas"
    //         },
    //         {
    //             tamanio: "Mediano",
    //             precio: 460.00,
    //             personas: "De 4 a 6 personas"
    //         },
    //         {
    //             tamanio: "Chico",
    //             precio: 190.00,
    //             personas: "De 1 a 2 personas"
    //         },
    //     ],
    //     fotos: ["/Pasteles/MOSTACHON_MANGO.jpg", "/Pasteles/MOSTACHON_MANGO_2.jpg"]
    // },
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
            // {
            //     tamanio: "Mediano Bajo",
            //     precio: 520.00,
            //     personas: "De 4 a 6 personas"
            // },
        ],
        fotos: ["/Pasteles/FERRERO.jpg", "/Pasteles/FERRERO_2.jpg"]
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
            // {
            //     tamanio: "Mediano Alto",
            //     precio: 710.00,
            //     personas: "De 10 a 12 personas"
            // },
            {
                tamanio: "Mediano Bajo",
                precio: 390.00,
                personas: "De 4 a 6 personas"
            },
        ],
        fotos: ["/Pasteles/ROSCA_CH-MERENGUE.jpg", "/Pasteles/ROSCA_CH-MERENGUE_2.jpg"]
    },
    // {
    //     id: 1,
    //     nombre: "Pastel Rosas Blancas",
    //     categoriaId: 1,
    //     categoriaNombre: "Pasteles",
    //     descripcion: "Prueba nuestro exquisito pan de vainilla con betún de merengue. Pastel disponible únicamente bajo pedido.",
    //     variaciones: [
    //         {
    //             tamanio: "Mediano Alto",
    //             precio: 750.00,
    //             personas: "De 10 a 12 personas"
    //         },
    //     ],
    //     fotos: ["/Pasteles/ROSAS_BLANCAS.jpg", "/Pasteles/ROSAS_BLANCAS_2.jpg"]
    // },
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
    {
        id: 25,
        nombre: "Pastel de Fresas con Crema",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro delicioso pastel de fresas con crema con un toque de chocolate. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
        ],
        fotos: ["/Pasteles/FRESAS_CON_CREMA.jpg", "/Pasteles/FRESAS_CON_CREMA_2.jpg"]
    },
    {
        id: 26,
        nombre: "Chocolate con Fresas",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro exquisito pastel de chocolate con crema y fresas, que hacen a este pastel tan delicioso.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 860.00,
                personas: "De 15 a 18 personas"
            },
        ],
        fotos: ["/Pasteles/CHOCOLATE_CON_FRESAS.jpg", "/Pasteles/CHOCOLATE_CON_FRESAS_2.jpg"]
    },
    {
        id: 27,
        nombre: "Pastel Tradicional",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro pastel tradicional, con pan de vainilla, nuestro delicioso betún blanco y mermelada de chabacano.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 780.00,
                personas: "De 15 a 18 personas"
            },
        ],
        fotos: ["/Pasteles/TRADICIONAL.jpg", "/Pasteles/TRADICIONAL_2.jpg"]
    },
    {
        id: 28,
        nombre: "Pastel de Frutos Rojos",
        categoriaId: 1,
        categoriaNombre: "Pasteles",
        descripcion: "Prueba nuestro nuevo pastel de frutos rojos. Pastel disponible únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 1250.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano Alto",
                precio: 860.00,
                personas: "De 10 a 12 personas"
            },
        ],
        fotos: ["/Pasteles/FRUTOS_ROJOS.jpg", "/Pasteles/FRUTOS_ROJOS_2.jpg"]
    },

    // PAYS
    {
        id: 29,
        nombre: "Pay de Queso con Fresas",
        categoriaId: 2,
        categoriaNombre: "Pays",
        descripcion: "Prueba nuestro delicioso pay de queso con fresas.",
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
        fotos: ["/Pays/PAY_FRESA.jpg", "/Pays/PAY_FRESA_2.jpg"]
    },
    // {
    //     id: 30,
    //     nombre: "Pay de Queso con Mango",
    //     categoriaId: 2,
    //     categoriaNombre: "Pays",
    //     descripcion: "Prueba nuestro delicioso pay de queso con mango.",
    //     variaciones: [
    //         {
    //             tamanio: "Grande",
    //             precio: 860.00,
    //             personas: "De 15 a 18 personas"
    //         },
    //         {
    //             tamanio: "Mediano",
    //             precio: 460.00,
    //             personas: "De 4 a 6 personas"
    //         },
    //         {
    //             tamanio: "Chico",
    //             precio: 190.00,
    //             personas: "De 1 a 2 personas"
    //         },
    //     ],
    //     fotos: ["/Pays/PAY_MANGO.jpg", "/Pays/PAY_MANGO_2.jpg"]
    // },
    {
        id: 31,
        nombre: "Pay Tortuga",
        categoriaId: 2,
        categoriaNombre: "Pays",
        descripcion: "Prueba nuestro delicioso pay de queso con chocolate chips, nuez, caramelo, cajeta y chocolate.",
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
        fotos: ["/Pays/TORTUGA.jpg", "/Pays/TORTUGA_2.jpg"]
    },
    {
        id: 32,
        nombre: "Pay de Queso con Manzana",
        categoriaId: 2,
        categoriaNombre: "Pays",
        descripcion: "Prueba nuestro delicioso pay de queso con manzana, canela y mucha nuez.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
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
        fotos: ["/Pays/PAY_MANZANA.jpg", "/Pays/PAY_MANZANA_2.jpg"]
    },
    {
        id: 33,
        nombre: "Pay de Nuez",
        categoriaId: 2,
        categoriaNombre: "Pays",
        descripcion: "Prueba nuestra deliciosa tarta de nuez.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
                personas: "De 15 a 18 personas"
            },
        ],
        fotos: ["/Pays/PAY_NUEZ.jpg", "/Pays/PAY_NUEZ_2.jpg"]
    },
    {
        id: 34,
        nombre: "Pay de Limón",
        categoriaId: 2,
        categoriaNombre: "Pays",
        descripcion: "Prueba nuestro nuevo pay de limón.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 820.00,
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
        fotos: ["/Pays/PAY_LIMON.jpg", "/Pays/PAY_LIMON_2.jpg"]
    },

    // BROWNIES
    {
        id: 35,
        nombre: "Mini Brownies",
        categoriaId: 3,
        categoriaNombre: "Brownies",
        descripcion: "Prueba nuestros deliciosos mini brownies de cajeta, crunch, chocolate, betún alemán y almendra.",
        variaciones: [
            {
                tamanio: "Caja de 40",
                precio: 680.00,
                personas: "40 piezas"
            },
            {
                tamanio: "Caja de 25",
                precio: 480.00,
                personas: "25 piezas"
            },
            {
                tamanio: "Caja de 16",
                precio: 350.00,
                personas: "16 piezas"
            },
            {
                tamanio: "Caja de 9",
                precio: 200.00,
                personas: "9 piezas"
            },
            {
                tamanio: "Caja de 5",
                precio: 120.00,
                personas: "5 piezas"
            },
            {
                tamanio: "Caja de 4",
                precio: 110.00,
                personas: "4 piezas"
            },
        ],
        fotos: ["/Brownies/MINI_BROWNIES.jpg", "/Brownies/MINI_BROWNIES_2.jpg"]
    },
    {
        id: 36,
        nombre: "Brownie con Azúcar Glass",
        categoriaId: 3,
        categoriaNombre: "Brownies",
        descripcion: "Prueba nuestros deliciosos brownies.",
        variaciones: [
            {
                tamanio: "Caja de 9 piezas",
                precio: 250.00,
                personas: "9 piezas"
            },
            {
                tamanio: "Caja de 6 piezas",
                precio: 190.00,
                personas: "6 piezas"
            },
        ],
        fotos: ["/Brownies/BROWNIES_GLASS.jpg", "/Brownies/BROWNIES_GLASS_2.jpg"]
    },

    // GALLETAS
    {
        id: 37,
        nombre: "Galletas de Avena",
        categoriaId: 4,
        categoriaNombre: "Galletas",
        descripcion: "Prueba nuestras galletas de avena con nuestra tradicional receta, las preferidas de todos.",
        variaciones: [
            {
                tamanio: "Cilindro Grande",
                precio: 500.00,
                personas: ""
            },
            {
                tamanio: "Cilindo Mediano",
                precio: 330.00,
                personas: ""
            },
            {
                tamanio: "Cilindro Chico",
                precio: 170.00,
                personas: ""
            },
            {
                tamanio: "Caja Grande",
                precio: 520.00,
                personas: ""
            },
            {
                tamanio: "Caja Chica",
                precio: 320.00,
                personas: ""
            },
            {
                tamanio: "Bolsita",
                precio: 80.00,
                personas: ""
            },
            {
                tamanio: "Bolsita Avena con Monkfruit",
                precio: 80.00,
                personas: ""
            },
        ],
        fotos: ["/Galletas/AVENA.jpg", "/Galletas/AVENA_2.jpg", "/Galletas/AVENA_3.jpg", "/Galletas/AVENA_4.jpg", "/Galletas/AVENA_5.jpg"]
    },
    {
        id: 38,
        nombre: "Galletas de Chocochips",
        categoriaId: 4,
        categoriaNombre: "Galletas",
        descripcion: "Prueba nuestras deliciosas galletas de chocolate chip hechas a mano.",
        variaciones: [
            {
                tamanio: "Cilindro Grande",
                precio: 500.00,
                personas: ""
            },
            {
                tamanio: "Cilindo Mediano",
                precio: 330.00,
                personas: ""
            },
            {
                tamanio: "Cilindro Chico",
                precio: 170.00,
                personas: ""
            },
            {
                tamanio: "Caja Grande",
                precio: 520.00,
                personas: ""
            },
            {
                tamanio: "Caja Chica",
                precio: 320.00,
                personas: ""
            },
            {
                tamanio: "Bolsita",
                precio: 80.00,
                personas: ""
            },
        ],
        fotos: ["/Galletas/CHOCOCHIP.jpg", "/Galletas/CHOCOCHIP_2.jpg", "/Galletas/CHOCOCHIP_3.jpg", "/Galletas/CHOCOCHIP_4.jpg"]
    },
    // {
    //     id: 39,
    //     nombre: "Polvorones y Hojarascas",
    //     categoriaId: 4,
    //     categoriaNombre: "Galletas",
    //     descripcion: "Prueba nuestros deliciosos polvorones y hojarascas.",
    //     variaciones: [
    //         {
    //             tamanio: "Caja Polvorones",
    //             precio: 210.00,
    //             personas: ""
    //         },
    //         {
    //             tamanio: "Caja Hojarascas",
    //             precio: 180.00,
    //             personas: ""
    //         },
    //     ],
    //     fotos: ["/Galletas/POLVORONES_HOJARASCAS.jpg", "/Galletas/POLVORONES_HOJARASCAS_2.jpg", "/Galletas/POLVORON.jpg", "/Galletas/HOJARASCA.jpg"]
    // },
    // {
    //     id: 40,
    //     nombre: "Galletas Combinadas",
    //     categoriaId: 4,
    //     categoriaNombre: "Galletas",
    //     descripcion: "Deliciosa combinación de hojarascas, polvorones, chocochips y galletas de avena. Para cualquier gusto.",
    //     variaciones: [
    //         {
    //             tamanio: "Caja Grande",
    //             precio: 360.00,
    //             personas: "Caja con 9 galletas"
    //         },
    //         {
    //             tamanio: "Caja Chica",
    //             precio: 250.00,
    //             personas: "Caja con 6 galletas"
    //         },
    //     ],
    //     fotos: ["/Galletas/GALLETAS_COMBINADAS.jpg", "/Galletas/GALLETAS_COMBINADAS_2.jpg", "/Galletas/GALLETAS_COMBINADAS_3.jpg"]
    // },
    {
        id: 41,
        nombre: "Galletas de Mantequilla",
        categoriaId: 4,
        categoriaNombre: "Galletas",
        descripcion: "Prueba nuestras deliciosas galletas de mantequilla, rellenas de mermelada y cajeta.",
        variaciones: [
            {
                tamanio: "Caja Grande",
                precio: 340.00,
                personas: "Caja de 9 galletas"
            },
            {
                tamanio: "Caja Chica",
                precio: 230.00,
                personas: "Caja de 6 galletas"
            },
        ],
        fotos: ["/Galletas/GALLETAS_FLOR.jpg", "/Galletas/GALLETAS_FLOR_2.jpg", "/Galletas/GALLETAS_FLOR_3.jpg"]
    },
    {
        id: 42,
        nombre: "Cookie Cake",
        categoriaId: 4,
        categoriaNombre: "Galletas",
        descripcion: "Prueba nuestra deliciosas galleta gigantes, ideales para festejar. Producto únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Cookie Cake",
                precio: 630.00,
                personas: ""
            },
        ],
        fotos: ["/Galletas/GALLETA_GIGANTE.jpg", "/Galletas/GALLETA_GIGANTE_2.jpg"]
    },

    // KETO
    {
        id: 43,
        nombre: "Gansito Keto",
        categoriaId: 5,
        categoriaNombre: "Keto",
        descripcion: "Nuestro gansito keto, ideal para los antojos de la dieta keto. Pruébalo, es delicioso!",
        variaciones: [
            {
                tamanio: "Gansito Keto",
                precio: 85.00,
                personas: ""
            },
        ],
        fotos: ["/Keto/GANSITO.jpg", "/Keto/GANSITO_2.jpg"]
    },
    {
        id: 44,
        nombre: "Copitas Keto",
        categoriaId: 5,
        categoriaNombre: "Keto",
        descripcion: "Nuestras famosas copitas, ahora para la dieta keto. Pruébalas en sabores de pay de queso con fresas o de chocolate.",
        variaciones: [
            {
                tamanio: "Copita Keto de queso con fresas",
                precio: 70.00,
                personas: ""
            },
            {
                tamanio: "Copita Keto de chocolate",
                precio: 70.00,
                personas: ""
            }
        ],
        fotos: ["/Keto/COPITAS_KETO.jpg", "/Keto/COPITAS_KETO_2.jpg"]
    },
    {
        id: 45,
        nombre: "Brownie con Queso",
        categoriaId: 5,
        categoriaNombre: "Keto",
        descripcion: "Brownie con queso bajo en carbohidratos. Perfecto para un antojo saludable!",
        variaciones: [
            {
                tamanio: "Brownie con Queso",
                precio: 70.00,
                personas: ""
            },
        ],
        fotos: ["/Keto/BROWNIE_CON_QUESO.jpg", "/Keto/BROWNIE_CON_QUESO_2.jpg"]
    },
    {
        id: 46,
        nombre: "Brownie Individual",
        categoriaId: 5,
        categoriaNombre: "Keto",
        descripcion: "Brownie individual bajo en carbohidratos. Receta original y casera, deliciosa!",
        variaciones: [
            {
                tamanio: "Individual",
                precio: 70.00,
                personas: ""
            },
        ],
        fotos: ["/Keto/BROWNIE.jpg", "/Keto/BROWNIE_2.jpg"]
    },
    {
        id: 47,
        nombre: "Pay de Queso Keto",
        categoriaId: 5,
        categoriaNombre: "Keto",
        descripcion: "Prueba nuestro nuevo pay bajo en carbohidratos y sin azúcar. Elaborado con harina de almendra y splenda, especial para la dieta Keto.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 940.00,
                personas: "De 15 a 18 personas"
            },
            {
                tamanio: "Mediano",
                precio: 550.00,
                personas: "De 4 a 6 personas"
            },
            {
                tamanio: "Chico",
                precio: 190.00,
                personas: "De 1 a 2 personas"
            },
        ],
        fotos: ["/Keto/PAY_KETO.jpg", "/Keto/PAY_KETO_2.jpg"]
    },

    // MUFFINS Y PANQUÉS
    {
        id: 48,
        nombre: "Panqués y Mini Panqués",
        categoriaId: 6,
        categoriaNombre: "Muffins y Panqués",
        descripcion: "Prueba nuestros deliciosos panqués de limón y coffecake.",
        variaciones: [
            {
                tamanio: "Panqué Grande",
                precio: 480.00,
                personas: ""
            },
            {
                tamanio: "Panqué Chico",
                precio: 180.00,
                personas: ""
            },
        ],
        fotos: ["/MuffinsPanques/COFFEECAKE_2.jpg", "/MuffinsPanques/LIMON_2.jpg", "/MuffinsPanques/tamanios_panques.jpg"]
    },
    {
        id: 49,
        nombre: "Mini Muffins",
        categoriaId: 6,
        categoriaNombre: "Muffins y Panqués",
        descripcion: "Prueba nuestros deliciosos mini muffins de distintos sabores.",
        variaciones: [
            {
                tamanio: "Mini Muffins",
                precio: 310.00,
                personas: "Caja de 12 mini muffins"
            },
        ],
        fotos: ["/MuffinsPanques/MINIMUFFINS.jpg", "/MuffinsPanques/MINIMUFFINS_2.jpg"]
    },

    // INDIVIDUALES
    {
        id: 50,
        nombre: "Copitas",
        categoriaId: 7,
        categoriaNombre: "Individuales",
        descripcion: "Prueba nuestras deliciosas copitas de brownie, fresas con crema, mostachón con fresas, queso con fresas, mango con crema, mostachón de mango, queso con mango, 4 leches y zanahoria.",
        variaciones: [
            {
                tamanio: "Copita de brownie",
                precio: 100.00,
                personas: ""
            },
            {
                tamanio: "Copita de fresas con crema",
                precio: 100.00,
                personas: ""
            },
            {
                tamanio: "Copita de mostachón con fresas",
                precio: 100.00,
                personas: ""
            },
            {
                tamanio: "Copita de queso con fresas",
                precio: 100.00,
                personas: ""
            },
            // {
            //     tamanio: "Copita de mango con crema",
            //     precio: 100.00,
            //     personas: ""
            // },
            // {
            //     tamanio: "Copita de mostachón de mango",
            //     precio: 100.00,
            //     personas: ""
            // },
            // {
            //     tamanio: "Copita de queso con mango",
            //     precio: 100.00,
            //     personas: ""
            // },
            {
                tamanio: "Copita de 4 leches",
                precio: 100.00,
                personas: ""
            },
            {
                tamanio: "Copita de zanahoria",
                precio: 100.00,
                personas: ""
            }
        ],
        fotos: ["/Individuales/COPITAS.jpg", "/Individuales/COPITAS_2.jpg", "/Individuales/COPITAS_3.jpg", "/Individuales/COPITAS_4.jpg", "/Individuales/COPITAS_5.jpg", "/Individuales/COPITAS_6.jpg", "/Individuales/COPITAS_7.jpg", "/Individuales/COPITAS_8.jpg", "/Individuales/COPITAS_9.jpg", "/Individuales/COPITAS_10.jpg"]
    },
    {
        id: 51,
        nombre: "Kekitos y Mini Kekitos",
        categoriaId: 7,
        categoriaNombre: "Individuales",
        descripcion: "Prueba nuestros deliciosos kekitos. Disponibles únicamente bajo pedido.",
        variaciones: [
            {
                tamanio: "Caja con 12 mini kekitos",
                precio: 280.00,
                personas: ""
            },
            {
                tamanio: "Keko con betún de chocolate",
                precio: 45.00,
                personas: ""
            },
            {
                tamanio: "Keko betún de colores",
                precio: 25.00,
                personas: ""
            },
        ],
        fotos: ["/Individuales/KEKITOS.jpg", "/Individuales/KEKITOS_2.jpg", "/Individuales/KEKITOS_3.jpg"]
    },
    {
        id: 52,
        nombre: "Trocitos de Brownie",
        categoriaId: 7,
        categoriaNombre: "Individuales",
        descripcion: "Prueba nuestros deliciosos y nuevos trocitos de brownie.",
        variaciones: [
            {
                tamanio: "Bolsita",
                precio: 50.00,
                personas: ""
            },
        ],
        fotos: ["/Individuales/TROCITO_BROWNIE.jpg", "/Individuales/TROCITO_BROWNIE_2.jpg", "/Individuales/TROCITO_BROWNIE_3.jpg"]
    },
    {
        id: 53,
        nombre: "Mini Pays",
        categoriaId: 7,
        categoriaNombre: "Individuales",
        descripcion: "Prueba nuestros deliciosos minipays de fruta o nuez.",
        variaciones: [
            {
                tamanio: "Caja de 40 piezas",
                precio: 790.00,
                personas: "40 piezas"
            },
            {
                tamanio: "Caja de 25 piezas",
                precio: 550.00,
                personas: "25 piezas"
            },
        ],
        fotos: ["/Individuales/PAYCITOS.jpg", "/Individuales/PAYCITOS_2.jpg", "/Individuales/PAYCITOS_3.jpg"]
    },

    // TEMPORADA
    {
        id: 54,
        nombre: "Tortugas, Pretzels y Buñuelos",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestras deliciosas tortugas hechas con nuez de la india, pecana, caramelo y chocolate. Al igual que nuestros pretzels cubiertos de chocolate y buñuelos. Solamente en esta temporada tan especial. Productos disponibles hasta agotar existencias.",
        variaciones: [
            {
                tamanio: "1 Tortuga Gigante",
                precio: 95.00,
                personas: ""
            },
            {
                tamanio: "4 Tortuguitas",
                precio: 95.00,
                personas: ""
            },
            {
                tamanio: "Caja de Pretzels",
                precio: 95.00,
                personas: ""
            },
            {
                tamanio: "Caja de 10 Buñuelos",
                precio: 410.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/Navidad/Tortugas_Pretzels_Bunuelos_1.jpg", "/Temporada/Navidad/Tortugas_Pretzels_Bunuelos_2.jpg", "/Temporada/Navidad/Tortugas_Pretzels_Bunuelos_3.jpg", "/Temporada/Navidad/Tortugas_Pretzels_Bunuelos_4.jpg", "/Temporada/Navidad/Tortugas_Pretzels_Bunuelos_5.jpg"],
        temporada: "Navidad"
    },
    {
        id: 55,
        nombre: "Surtido",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestra deliciosa combinación de galletas. Producto disponible hasta agotar existencia.",
        variaciones: [
            {
                tamanio: "Caja de Acrílico Grande",
                precio: 590.00,
                personas: ""
            },
            {
                tamanio: "Caja de Acrílico Mediana",
                precio: 500.00,
                personas: ""
            },
            {
                tamanio: "Caja de Acrílico Chica",
                precio: 370.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/Navidad/Surtido_1.jpg", "/Temporada/Navidad/Surtido_2.jpg", "/Temporada/Navidad/Surtido_3.png"],
        temporada: "Navidad"
    },
    {
        id: 56,
        nombre: "Pastel Navideño",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestro delicioso Pastel de Copo de Nieve, de pan vainilla con betún de merengue o bien, nuestro Pastel de Monos de Jengibre, de pan de vainilla con betún de chocolate.",
        variaciones: [
            {
                tamanio: "Copo de Nieve Mediano Alto",
                precio: 780.00,
                personas: "10 a 12 personas"
            },
            {
                tamanio: "Copo de Nieve Mediano Bajo",
                precio: 450.00,
                personas: "4 a 6 personas"
            },
            {
                tamanio: "Mono de Jengibre Mediano Alto",
                precio: 780.00,
                personas: "10 a 12 personas"
            },
            {
                tamanio: "Mono de Jengibre Mediano Bajo",
                precio: 450.00,
                personas: "4 a 6 personas"
            },
            {
                tamanio: "Mono de Jengibre Chico",
                precio: 260.00,
                personas: "1 a 2 personas"
            },
        ],
        fotos: ["/Temporada/Navidad/Pastel_Navideno_1.jpg", "/Temporada/Navidad/Pastel_Navideno_2.jpg", "/Temporada/Navidad/Pastel_Navideno_3.jpg"],
        temporada: "Navidad"
    },
    {
        id: 57,
        nombre: "Galletas de Chocochips o Avena",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestras deliciosas galletas de avena y chocochips, con ese toque navideño.",
        variaciones: [
            {
                tamanio: "Vidrio Grande",
                precio: 640.00,
                personas: ""
            },
            {
                tamanio: "Vidrio Mediano",
                precio: 500.00,
                personas: ""
            },
            {
                tamanio: "Vidrio Chico",
                precio: 370.00,
                personas: ""
            },
            {
                tamanio: "Cilindro Grande",
                precio: 500.00,
                personas: ""
            },
            {
                tamanio: "Cilindro Mediano",
                precio: 330.00,
                personas: ""
            },
            {
                tamanio: "Cilindro Chico",
                precio: 170.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/Navidad/Galletas_Chocochips_Avena_1.png", "/Temporada/Navidad/Galletas_Chocochips_Avena_2.jpg", "/Temporada/Navidad/Galletas_Chocochips_Avena_3.jpg", "/Temporada/Navidad/Galletas_Chocochips_Avena_4.jpg"],
        temporada: "Navidad"
    },
    {
        id: 58,
        nombre: "Tradicional Rosca de Vainilla con Chocolate",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestra tradicional rosca de vainilla con chocolate, o bien en presentación de pastel.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 780.00,
                personas: ""
            },
            {
                tamanio: "Mediano Alto",
                precio: 710.00,
                personas: ""
            },
            {
                tamanio: "Mediano Bajo",
                precio: 390.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/Navidad/Rosca_Tradicional_1.jpg", "/Temporada/Navidad/Rosca_Tradicional_2.jpg", "/Temporada/Navidad/Rosca_Tradicional_3.jpg", "/Temporada/Navidad/Rosca_Tradicional_4.jpg"],
        temporada: "Navidad"
    },
    {
        id: 59,
        nombre: "Brownies Decorados",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestros deliciosos mini brownies de cajeta, crunch, chocolate, betún alemán y almendra.",
        variaciones: [
            {
                tamanio: "Caja de 40 piezas",
                precio: 680.00,
                personas: "40 piezas"
            },
            {
                tamanio: "Caja de 25 piezas",
                precio: 480.00,
                personas: "25 piezas"
            },
            {
                tamanio: "Caja de 16 piezas",
                precio: 350.00,
                personas: "16 piezas"
            },
            {
                tamanio: "Caja de 9 piezas",
                precio: 200.00,
                personas: "9 piezas"
            },
            {
                tamanio: "Caja de 5 piezas",
                precio: 120.00,
                personas: "5 piezas"
            },
            {
                tamanio: "Caja de 4 piezas",
                precio: 110.00,
                personas: "4 piezas"
            },
        ],
        fotos: ["/Temporada/Navidad/Brownies_Decorados_1.jpg", "/Temporada/Navidad/Brownies_Decorados_2.jpg", "/Temporada/Navidad/Brownies_Decorados_3.jpg", "/Temporada/Navidad/Brownies_Decorados_4.jpg"],
        temporada: "Navidad"
    },
    {
        id: 60,
        nombre: "Mostachón de Corazón",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestro delicioso mostachón con fresas, para esa ocasión especial.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 0.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/SanValentin/Mostachon_Corazon_1.jpg", "/Temporada/SanValentin/Mostachon_Corazon_2.jpg", "/Temporada/SanValentin/Mostachon_Corazon_3.jpg"],
        temporada: "San Valentín"
    },
    {
        id: 61,
        nombre: "Pay de Queso de Corazón",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestro delicioso pay de queso con fresas y chocolate.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 0.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/SanValentin/Pay_Queso_Corazon_1.jpg", "/Temporada/SanValentin/Pay_Queso_Corazon_2.jpg", "/Temporada/SanValentin/Pay_Queso_Corazon_3.jpg"],
        temporada: "San Valentín"
    },
    {
        id: 62,
        nombre: "Pingüino de Corazón",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestro delicioso pingüino en forma de corazón, para impresionar a esa persona especial.",
        variaciones: [
            {
                tamanio: "Grande",
                precio: 0.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/SanValentin/Pinguino_Corazon_1.jpg", "/Temporada/SanValentin/Pinguino_Corazon_2.jpg", "/Temporada/SanValentin/Pinguino_Corazon_3.jpg"],
        temporada: "San Valentín"
    },
    {
        id: 63,
        nombre: "Brownies de Corazón",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Prueba nuestros deliciosos brownies en forma de corazón.",
        variaciones: [
            {
                tamanio: "Brownie",
                precio: 0.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/SanValentin/Brownie_Corazon_1.jpg", "/Temporada/SanValentin/Brownie_Corazon_2.jpg", "/Temporada/SanValentin/Brownie_Corazon_3.jpg"],
        temporada: "San Valentín"
    },
    {
        id: 64,
        nombre: "Bodas, Comuniones y Bautizos",
        categoriaId: 8,
        categoriaNombre: "Temporada",
        descripcion: "Delicioso pastel para una ocasión especial.",
        variaciones: [
            {
                tamanio: "Mediano Alto de Pistache",
                precio: 0.00,
                personas: "Pastel para 10 a 12 personas"
            },
            {
                tamanio: "Mediano Alto de Merengue",
                precio: 0.00,
                personas: "Pastel para 10 a 12 personas"
            },
            {
                tamanio: "Kekitos de Merengue",
                precio: 0.00,
                personas: ""
            },
        ],
        fotos: ["/Temporada/BodasComunionesBautizos/BodasComunionesBautizos_1.jpg", "/Temporada/BodasComunionesBautizos/BodasComunionesBautizos_2.jpg", "/Temporada/BodasComunionesBautizos/BodasComunionesBautizos_3.jpg", "/Temporada/BodasComunionesBautizos/BodasComunionesBautizos_4.jpg"],
        temporada: "Bodas, Comuniones y Bautizos"
    },
];
