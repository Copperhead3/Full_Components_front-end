/* =========================
   CATÁLOGO DE PRODUCTOS
========================= */

const catalogo = {

    "intel-i5": {
        id: "intel-i5",
        nombre: "Intel Core i5-14600KF",
        categoria: "Procesadores",
        marca: "Intel",
        precio: 264990,
        imagen: "img/productos/intel-i5-14600kf.png"
    },

    "corsair-rm750e": {
        id: "corsair-rm750e",
        nombre: "Corsair RM750e 2025",
        categoria: "Fuentes de poder",
        marca: "Corsair",
        precio: 99990,
        imagen: "img/productos/corsair-rm750e.png"
    },

    "gabinete-neutron": {
        id: "gabinete-neutron",
        nombre: "XYZ Neutron X Pro - Black",
        categoria: "Gabinetes",
        marca: "XYZ",
        precio: 149995,
        imagen: "img/productos/gabinete-neutron-x-pro.png"
    },

    "intel-i9": {
        id: "intel-i9",
        nombre: "Intel Core i9-14900KS",
        categoria: "Procesadores",
        marca: "Intel",
        precio: 849000,
        imagen: "img/productos/intel-i9-14900ks.png"
    },

    "gigabyte-rtx5090": {
        id: "gigabyte-rtx5090",
        nombre: "Gigabyte GeForce RTX 5090 GAMING OC 32G",
        categoria: "Tarjetas gráficas",
        marca: "Gigabyte",
        precio: 4289995,
        imagen: "img/productos/gigabyte-rtx-5090.png"
    }

};


/* =========================
   LOCAL STORAGE
========================= */

const CLAVE_CARRITO = "fullcomponents_carrito";

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem(CLAVE_CARRITO)
    ) || [];

}

function guardarCarrito(carrito) {

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

}


/* =========================
   FORMATO DE PRECIOS
========================= */

function formatearPrecio(precio) {

    return "$" + precio.toLocaleString("es-CL");

}


/* =========================
   AGREGAR PRODUCTO
========================= */

function agregarAlCarrito(id) {

    const producto = catalogo[id];

    if (!producto) {
        return;
    }

    const carrito = obtenerCarrito();

    const existente = carrito.find(
        item => item.id === id
    );

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            id: id,
            cantidad: 1
        });

    }

    guardarCarrito(carrito);

    renderizarCarrito();

}


/* =========================
   CAMBIAR CANTIDAD
========================= */

function cambiarCantidad(id, cambio) {

    const carrito = obtenerCarrito();

    const producto = carrito.find(
        item => item.id === id
    );

    if (!producto) {
        return;
    }

    producto.cantidad += cambio;

    const carritoActualizado = carrito.filter(
        item => item.cantidad > 0
    );

    guardarCarrito(carritoActualizado);

    renderizarCarrito();

}


/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarProducto(id) {

    const carrito = obtenerCarrito();

    const actualizado = carrito.filter(
        item => item.id !== id
    );

    guardarCarrito(actualizado);

    renderizarCarrito();

}


/* =========================
   VACIAR CARRITO
========================= */

function vaciarCarrito() {

    guardarCarrito([]);

    renderizarCarrito();

}


/* =========================
   RENDERIZAR CARRITO
========================= */

function renderizarCarrito() {

    const carrito = obtenerCarrito();

    const lista = document.getElementById("lista-carrito");

    const mensajeVacio = document.getElementById("carrito-vacio");

    const acciones = document.getElementById("acciones-carrito");

    const botonFinalizar = document.getElementById("finalizar-compra");

    lista.innerHTML = "";

    if (carrito.length === 0) {

        mensajeVacio.classList.remove("d-none");

        acciones.classList.add("d-none");

        botonFinalizar.disabled = true;

    } else {

        mensajeVacio.classList.add("d-none");

        acciones.classList.remove("d-none");

        botonFinalizar.disabled = false;

    }

    let subtotal = 0;

    let cantidadTotal = 0;

    carrito.forEach(item => {

        const producto = catalogo[item.id];

        if (!producto) {
            return;
        }

        const subtotalProducto =
            producto.precio * item.cantidad;

        subtotal += subtotalProducto;

        cantidadTotal += item.cantidad;

        lista.innerHTML += `

            <article class="carrito-item">

                <div class="carrito-producto-info">

                    <img src="${producto.imagen}"
                         alt="${producto.nombre}">

                    <div>

                        <h3>${producto.nombre}</h3>

                        <p>
                            ${producto.categoria}
                            | ${producto.marca}
                        </p>

                        <span class="carrito-stock">
                            ● En stock
                        </span>

                    </div>

                </div>

                <span class="carrito-precio">
                    ${formatearPrecio(producto.precio)}
                </span>

                <div class="control-cantidad">

                    <button type="button"
                            data-accion="restar"
                            data-id="${producto.id}">
                        −
                    </button>

                    <span>${item.cantidad}</span>

                    <button type="button"
                            data-accion="sumar"
                            data-id="${producto.id}">
                        +
                    </button>

                </div>

                <div class="carrito-subtotal-contenedor">

                    <span class="carrito-subtotal">
                        ${formatearPrecio(subtotalProducto)}
                    </span>

                    <button type="button"
                            class="btn-eliminar"
                            data-accion="eliminar"
                            data-id="${producto.id}"
                            aria-label="Eliminar ${producto.nombre}">
                        🗑
                    </button>

                </div>

            </article>

        `;

    });

    document.getElementById("resumen-cantidad").textContent =
        `Subtotal (${cantidadTotal} productos)`;

    document.getElementById("resumen-subtotal").textContent =
        formatearPrecio(subtotal);

    document.getElementById("resumen-total").textContent =
        formatearPrecio(subtotal);

}


/* =========================
   EVENTOS
========================= */

document.addEventListener("DOMContentLoaded", () => {

    renderizarCarrito();


    /* Botones de cantidad y eliminar */

    document.getElementById("lista-carrito")
        .addEventListener("click", event => {

            const boton = event.target.closest("button");

            if (!boton) {
                return;
            }

            const id = boton.dataset.id;

            const accion = boton.dataset.accion;

            if (accion === "sumar") {

                cambiarCantidad(id, 1);

            }

            if (accion === "restar") {

                cambiarCantidad(id, -1);

            }

            if (accion === "eliminar") {

                eliminarProducto(id);

            }

        });


    /* Vaciar carrito */

    document.getElementById("vaciar-carrito")
        .addEventListener("click", vaciarCarrito);


    /* Recomendaciones */

    document.querySelectorAll(".btn-recomendacion")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                agregarAlCarrito(
                    boton.dataset.id
                );

            });

        });

});