/* Carrito compartido con producto.html */

const CLAVE_CARRITO = "fullcomponents-carrito-v2";

const catalogoCarrito =
    typeof obtenerCatalogo === "function"
        ? obtenerCatalogo()
        : productos;

function buscarProducto(id) {
    return catalogoCarrito.find(
        producto => Number(producto.id) === Number(id)
    );
}

function obtenerCarrito() {
    try {
        const datos = JSON.parse(
            localStorage.getItem(CLAVE_CARRITO)
        );

        if (!Array.isArray(datos)) {
            return [];
        }

        return datos
            .filter(item =>
                Number.isInteger(Number(item.id)) &&
                Number.isInteger(Number(item.cantidad)) &&
                Number(item.cantidad) > 0
            )
            .map(item => ({
                id: Number(item.id),
                cantidad: Number(item.cantidad)
            }));
    } catch {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

    renderizarCarrito();
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    }).format(precio);
}

function agregarAlCarrito(id) {
    const producto = buscarProducto(id);

    if (
        !producto ||
        !Number.isInteger(producto.stock) ||
        producto.stock <= 0
    ) {
        return;
    }

    const carrito = obtenerCarrito();

    const existente = carrito.find(
        item => item.id === Number(id)
    );

    if (existente) {
        if (existente.cantidad >= producto.stock) {
            return;
        }

        existente.cantidad++;
    } else {
        carrito.push({
            id: Number(id),
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
}

function cambiarCantidad(id, cambio) {
    const producto = buscarProducto(id);
    const carrito = obtenerCarrito();

    const item = carrito.find(
        entrada => entrada.id === Number(id)
    );

    if (!producto || !item) {
        return;
    }

    const nuevaCantidad =
        item.cantidad + cambio;

    if (nuevaCantidad > producto.stock) {
        return;
    }

    if (nuevaCantidad <= 0) {
        guardarCarrito(
            carrito.filter(
                entrada => entrada.id !== Number(id)
            )
        );
    } else {
        item.cantidad = nuevaCantidad;
        guardarCarrito(carrito);
    }
}

function eliminarProducto(id) {
    guardarCarrito(
        obtenerCarrito().filter(
            item => item.id !== Number(id)
        )
    );
}

function vaciarCarrito() {
    guardarCarrito([]);
}

function renderizarCarrito() {
    const carrito = obtenerCarrito();

    const lista =
        document.getElementById("lista-carrito");

    const mensajeVacio =
        document.getElementById("carrito-vacio");

    const acciones =
        document.getElementById("acciones-carrito");

    const botonFinalizar =
        document.getElementById("btnFinalizarCompra");

    if (
        !lista ||
        !mensajeVacio ||
        !acciones ||
        !botonFinalizar
    ) {
        return;
    }

    lista.replaceChildren();

    let subtotal = 0;
    let cantidadTotal = 0;

    for (const entrada of carrito) {
        const producto =
            buscarProducto(entrada.id);

        if (!producto) {
            continue;
        }

        const stock =
            Math.max(0, Number(producto.stock) || 0);

        const cantidad =
            Math.min(entrada.cantidad, stock);

        if (cantidad === 0) {
            continue;
        }

        const subtotalProducto =
            producto.precio * cantidad;

        subtotal += subtotalProducto;
        cantidadTotal += cantidad;

        const articulo =
            document.createElement("article");

        articulo.className =
            "carrito-item";

        /* Información e imagen */
        const info =
            document.createElement("div");

        info.className =
            "carrito-producto-info";

        const imagen =
            document.createElement("img");

        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const texto =
            document.createElement("div");

        const titulo =
            document.createElement("h3");

        titulo.textContent =
            producto.nombre;

        const categoria =
            document.createElement("p");

        categoria.textContent =
            `${producto.categoria} | ${producto.marca}`;

        const stockVisible =
            document.createElement("span");

        stockVisible.className =
            "carrito-stock";

        stockVisible.textContent =
            `Disponible para añadir: ${Math.max(0, stock - cantidad)
            }`;

        texto.append(
            titulo,
            categoria,
            stockVisible
        );

        info.append(imagen, texto);

        /* Precio unitario */
        const precio =
            document.createElement("span");

        precio.className =
            "carrito-precio";

        precio.textContent =
            formatearPrecio(producto.precio);

        /* Controles de cantidad */
        const control =
            document.createElement("div");

        control.className =
            "control-cantidad";

        const menos =
            document.createElement("button");

        menos.type = "button";
        menos.dataset.accion = "restar";
        menos.dataset.id =
            String(producto.id);
        menos.textContent = "−";

        menos.setAttribute(
            "aria-label",
            `Quitar una unidad de ${producto.nombre}`
        );

        const numero =
            document.createElement("span");

        numero.textContent =
            String(cantidad);

        const mas =
            document.createElement("button");

        mas.type = "button";
        mas.dataset.accion = "sumar";
        mas.dataset.id =
            String(producto.id);
        mas.textContent = "+";

        mas.disabled =
            cantidad >= stock;

        mas.setAttribute(
            "aria-label",
            `Añadir una unidad de ${producto.nombre}`
        );

        control.append(
            menos,
            numero,
            mas
        );

        /* Subtotal y eliminar */
        const subtotalContenedor =
            document.createElement("div");

        subtotalContenedor.className =
            "carrito-subtotal-contenedor";

        const importe =
            document.createElement("span");

        importe.className =
            "carrito-subtotal";

        importe.textContent =
            formatearPrecio(subtotalProducto);

        const eliminar =
            document.createElement("button");

        eliminar.type = "button";
        eliminar.className =
            "btn-eliminar";

        eliminar.dataset.accion =
            "eliminar";

        eliminar.dataset.id =
            String(producto.id);

        eliminar.setAttribute(
            "aria-label",
            `Eliminar ${producto.nombre}`
        );

        eliminar.textContent =
            "🗑";

        subtotalContenedor.append(
            importe,
            eliminar
        );

        articulo.append(
            info,
            precio,
            control,
            subtotalContenedor
        );

        lista.appendChild(articulo);
    }

    mensajeVacio.classList.toggle(
        "d-none",
        cantidadTotal > 0
    );

    acciones.classList.toggle(
        "d-none",
        cantidadTotal === 0
    );

    // Solo permitir finalizar si hay productos en el carrito
    botonFinalizar.disabled = cantidadTotal === 0;

    botonFinalizar.title = cantidadTotal === 0
        ? "Agrega productos para finalizar la compra"
        : "Finalizar compra";

    document.getElementById(
        "resumen-cantidad"
    ).textContent =
        `Subtotal (${cantidadTotal} productos)`;

    document.getElementById(
        "resumen-subtotal"
    ).textContent =
        formatearPrecio(subtotal);

    document.getElementById(
        "resumen-total"
    ).textContent =
        formatearPrecio(subtotal);

    document
        .querySelectorAll(".carrito .badge")
        .forEach(
            badge =>
                badge.textContent =
                String(cantidadTotal)
        );
}

/* Eventos */
document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderizarCarrito();

        document.getElementById(
            "lista-carrito"
        ).addEventListener("click", event => {
            const boton =
                event.target.closest(
                    "button[data-accion]"
                );

            if (!boton) {
                return;
            }

            const id =
                Number(boton.dataset.id);

            if (
                boton.dataset.accion ===
                "sumar"
            ) {
                cambiarCantidad(id, 1);
            }

            if (
                boton.dataset.accion ===
                "restar"
            ) {
                cambiarCantidad(id, -1);
            }

            if (
                boton.dataset.accion ===
                "eliminar"
            ) {
                eliminarProducto(id);
            }
        });

        document.getElementById(
            "vaciar-carrito"
        ).addEventListener(
            "click",
            vaciarCarrito
        );

        /*
         * Compatibilidad con los data-id antiguos
         * de las recomendaciones de carrito.html.
         */
        const idsAntiguos = {
            "corsair-rm750e": 15,
            "gabinete-neutron": 13,
            "intel-i9": 3
        };

        document.querySelectorAll(
            ".btn-recomendacion"
        ).forEach(boton => {
            boton.addEventListener(
                "click",
                () => {
                    const id =
                        idsAntiguos[
                        boton.dataset.id
                        ] ??
                        Number(
                            boton.dataset.id
                        );

                    agregarAlCarrito(id);
                }
            );
        });

        window.addEventListener(
            "pageshow",
            renderizarCarrito
        );

        window.addEventListener(
            "storage",
            renderizarCarrito
        );
    }
);