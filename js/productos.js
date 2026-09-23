const productos = [
    {
        id: "intel-core-i5-14600kf",
        nombre: "Intel Core i5-14600KF",
        categoria: "Procesadores",
        marca: "Intel",
        modelo: "BX8071514600KF",
        precio: 264990,
        imagen: "img/productos/Intel Core i5-14600KF/1831674_picture_1707949175.jpg",
        descripcion: "Procesador Intel Core i5-14600KF para socket LGA 1700.",
        especificaciones: {
            "Frecuencia": "3500–5300 MHz",
            "Núcleos / hilos": "6 P-cores / 8 E-cores / 20 hilos",
            "Socket": "LGA 1700",
            "Caché": "20 MB L2 / 24 MB L3",
            "Arquitectura": "Intel Raptor Lake-S Refresh"
        }
    },
    {
        id: "intel-core-i7-14700k",
        nombre: "Intel Core i7-14700K",
        categoria: "Procesadores",
        marca: "Intel",
        modelo: "BX8071514700K",
        precio: 447980,
        imagen: "img/productos/Intel Core i7-14700K/1831699_picture_1707949353.jpg",
        descripcion: "Procesador Intel Core i7-14700K para socket LGA 1700.",
        especificaciones: {
            "Frecuencia": "3400–5600 MHz",
            "Núcleos / hilos": "8 P-cores / 12 E-cores / 28 hilos",
            "Socket": "LGA 1700",
            "Caché": "20 × 2 MB L2 / 33 MB L3",
            "Arquitectura": "Intel Raptor Lake-S Refresh"
        }
    },
    {
        id: "intel-core-i9-14900ks",
        nombre: "Intel Core i9-14900KS",
        categoria: "Procesadores",
        marca: "Intel",
        modelo: "BX8071514900KS",
        precio: 849000,
        imagen: "img/productos/Intel Core i9-14900KS/1831756_picture_1707949314.jpg",
        descripcion: "Procesador Intel Core i9-14900KS para socket LGA 1700.",
        especificaciones: {
            "Frecuencia": "3200–6200 MHz",
            "Núcleos / hilos": "8 P-cores / 16 E-cores / 32 hilos",
            "Socket": "LGA 1700",
            "Caché": "24 × 2 MB L2 / 36 MB L3",
            "Arquitectura": "Intel Raptor Lake-S Refresh"
        }
    },
    {
        id: "asus-dual-rx-7600-evo",
        nombre: "ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
        categoria: "Tarjetas gráficas",
        marca: "ASUS",
        modelo: "Dual Radeon RX 7600 EVO OC Edition",
        precio: 318870,
        imagen: "img/productos/ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6/2055806_picture_1743427648.webp",
        descripcion: "Tarjeta gráfica ASUS Dual Radeon RX 7600 EVO OC Edition con 8 GB GDDR6.",
        especificaciones: {
            "GPU": "AMD Radeon RX 7600",
            "Memoria": "8 GB GDDR6 (128 bit)",
            "Frecuencia core (base / boost / OC)": "1720 / 2655 / 2715 MHz",
            "Frecuencia memorias": "2250 MHz",
            "Bus": "PCI Express 4.0 x8"
        }
    },
    {
        id: "asus-prime-rx-9070-xt",
        nombre: "ASUS Prime Radeon RX 9070 XT OC Edition 16GB",
        categoria: "Tarjetas gráficas",
        marca: "ASUS",
        modelo: "Prime Radeon RX 9070 XT OC Edition",
        precio: 847990,
        imagen: "img/productos/ASUS Prime Radeon RX 9070 XT OC Edition 16GB/2087610_picture_1747988354.jpg",
        descripcion: "Tarjeta gráfica ASUS Prime Radeon RX 9070 XT OC Edition con 16 GB GDDR6.",
        especificaciones: {
            "GPU": "AMD Radeon RX 9070 XT",
            "Memoria": "16 GB GDDR6 (256 bit)",
            "Frecuencia core (base / boost / OC)": "2400 / 2970 / 3030 MHz",
            "Frecuencia memorias": "2518 MHz",
            "Bus": "PCI Express 5.0 x16"
        }
    },
    {
        id: "gigabyte-rtx-5090-gaming-oc",
        nombre: "Gigabyte GeForce RTX 5090 GAMING OC 32G",
        categoria: "Tarjetas gráficas",
        marca: "Gigabyte",
        modelo: "GAMING OC 32G",
        precio: 4289995,
        imagen: "img/productos/Gigabyte GeForce RTX 5090 GAMING OC 32G/2057307_picture_1743591149.webp",
        descripcion: "Tarjeta gráfica Gigabyte GeForce RTX 5090 GAMING OC con 32 GB GDDR7.",
        especificaciones: {
            "GPU": "NVIDIA GeForce RTX 5090",
            "Memoria": "32 GB GDDR7 (512 bit)",
            "Frecuencia core (base / boost / OC)": "2017 / 2407 / 2550 MHz",
            "Frecuencia memorias": "875 MHz",
            "Bus": "PCI Express 5.0 x16"
        }
    },
    {
        id: "msi-rtx-5070-ti-gaming-trio",
        nombre: "MSI GeForce RTX 5070 Ti 16G GAMING TRIO OC",
        categoria: "Tarjetas gráficas",
        marca: "MSI",
        modelo: "G507T-16GTC",
        precio: 1199900,
        imagen: "img/productos/MSI GeForce RTX 5070 Ti 16G GAMING TRIO OC/2545160_picture_1757411992.png",
        descripcion: "Tarjeta gráfica MSI GeForce RTX 5070 Ti GAMING TRIO OC con 16 GB GDDR7.",
        especificaciones: {
            "GPU": "NVIDIA GeForce RTX 5070 Ti",
            "Memoria": "16 GB GDDR7 (256 bit)",
            "Frecuencia core (base / boost / OC)": "2300 / 2452 / 2580 MHz",
            "Frecuencia memorias": "875 MHz",
            "Bus": "PCI Express 5.0 x16"
        }
    },
    {
        id: "adata-xpg-lancer-blade-rgb-8gb",
        nombre: "A-DATA XPG Lancer Blade RGB (1 × 8 GB DDR5-5600)",
        categoria: "Memorias RAM",
        marca: "A-DATA",
        modelo: "AX5U5600C46BG-SLABRK",
        precio: 125000,
        imagen: "img/productos/A-DATA XPG Lancer Blade RGB (1 x 8 GB DIMM DDR5-5600)/1926060_picture_1718382530.jpg",
        descripcion: "Módulo de memoria A-DATA XPG Lancer Blade RGB DDR5 de 8 GB.",
        especificaciones: {
            "Capacidad": "1 × 8 GB",
            "Tipo": "DDR5",
            "Velocidad": "5600 MT/s",
            "Formato": "DIMM",
            "Voltaje": "1.35 V"
        }
    },
    {
        id: "kingston-fury-beast-16gb",
        nombre: "Kingston Fury Beast (1 × 16 GB DDR5-6400)",
        categoria: "Memorias RAM",
        marca: "Kingston",
        modelo: "KF564C32BBE-16",
        precio: 301990,
        imagen: "img/productos/Kingston Fury Beast (1 x 16 GB DIMM DDR5-6400)/1962332_picture_1733757849.jpg",
        descripcion: "Módulo de memoria Kingston Fury Beast DDR5 de 16 GB.",
        especificaciones: {
            "Capacidad": "1 × 16 GB",
            "Tipo": "DDR5",
            "Velocidad": "6400 MT/s",
            "Formato": "DIMM",
            "Voltaje": "1.40 V"
        }
    },
    {
        id: "kingston-nv3-1tb",
        nombre: "Kingston NV3 1 TB",
        categoria: "Almacenamiento",
        marca: "Kingston",
        modelo: "SNV3S/1000G",
        precio: 152290,
        imagen: "img/productos/Kingston NV3 1 TB/1948236_picture_1724531834.jpg",
        descripcion: "Unidad de estado sólido Kingston NV3 de 1 TB, formato M.2 2280.",
        especificaciones: {
            "Capacidad": "1 TB",
            "Formato": "M.2 (2280)",
            "Bus": "PCIe 4.0 x4",
            "¿Posee DRAM?": "No",
            "Tipo de memoria": "NAND QLC"
        }
    },
    {
        id: "transcend-512gb",
        nombre: "Transcend 512 GB",
        categoria: "Almacenamiento",
        marca: "Transcend",
        modelo: "TS512GMTE712A-VS1",
        precio: 75990,
        imagen: "img/productos/Transcend 512 GB/2334322.png",
        descripcion: "Unidad de estado sólido Transcend de 512 GB, formato M.2 2280.",
        especificaciones: {
            "Capacidad": "512 GB",
            "Formato": "M.2 (2280)",
            "Bus": "PCIe 4.0 x4",
            "¿Posee DRAM?": "Sí",
            "Tipo de memoria": "NAND desconocido"
        }
    },
    {
        id: "cougar-fv150-rgb-white",
        nombre: "Cougar FV150 RGB - White",
        categoria: "Gabinetes",
        marca: "Cougar",
        modelo: "385KA10.0002",
        precio: 66990,
        imagen: "img/productos/Cougar FV150 RGB - White/1970623_picture_1729359313.jpg",
        descripcion: "Gabinete Cougar FV150 RGB blanco con panel lateral de vidrio templado.",
        especificaciones: {
            "Formato": "ATX",
            "Iluminación": "RGB programable (ARGB / 3-pin / 5V)",
            "Fuente de poder": "No posee",
            "Ubicación fuente de poder": "Inferior",
            "Panel lateral": "Vidrio templado",
            "Ventiladores incluidos": "4 × 120 mm"
        }
    },
    {
        id: "xyz-neutron-x-pro-black",
        nombre: "XYZ Neutron X Pro - Black",
        categoria: "Gabinetes",
        marca: "XYZ",
        modelo: "X-CS-NEUTRONXP-B",
        precio: 149995,
        imagen: "img/productos/XYZ Neutron X Pro - Black/2795960_picture_1784556386.jpg",
        descripcion: "Gabinete XYZ Neutron X Pro negro con panel lateral de vidrio templado.",
        especificaciones: {
            "Formato": "ATX",
            "Iluminación": "RGB programable (ARGB / 3-pin / 5V)",
            "Fuente de poder": "No posee",
            "Ubicación fuente de poder": "Lateral",
            "Panel lateral": "Vidrio templado",
            "Ventiladores incluidos": "5 × 120 mm"
        }
    },
    {
        id: "asus-prime-850w-gold",
        nombre: "ASUS Prime 850W Gold",
        categoria: "Fuentes de poder",
        marca: "ASUS",
        modelo: "AP-850G / 90YE000U-B0AA00",
        precio: 97990,
        imagen: "img/productos/ASUS Prime 850W Gold/1959832_picture_1726393017.jpg",
        descripcion: "Fuente de poder ASUS Prime 850W Gold modular.",
        especificaciones: {
            "Potencia": "850 W",
            "Certificación": "80PLUS Gold",
            "Corriente": "12V 70 A",
            "Modular": "Sí",
            "PFC activo": "Sí"
        }
    },
    {
        id: "corsair-rm750e-2025",
        nombre: "Corsair RMe Series RM750e 2025",
        categoria: "Fuentes de poder",
        marca: "Corsair",
        modelo: "CP-9020295-NA",
        precio: 99990,
        imagen: "img/productos/Corsair RMe Series RM750e 2025/2018728_picture_1739543341.jpg",
        descripcion: "Fuente de poder Corsair RMe Series RM750e 2025 modular.",
        especificaciones: {
            "Potencia": "750 W",
            "Certificación": "80PLUS Gold",
            "Corriente": "12V 54.2 A",
            "Modular": "Sí",
            "PFC activo": "Sí"
        }
    }
];