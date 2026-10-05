/*
 * Checkout de FullComponents Store
 * Muestra los productos guardados en el carrito
 * y calcula el resumen de la compra.
 */
const CLAVE_PEDIDOS = "fc-pedidos";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarResumenCheckout();


        const formulario =
            document.getElementById("formCheckout");

        if (formulario) {

            formulario.addEventListener(
                "submit",
                confirmarCompra
            );

        }


        const inputRut =
            document.getElementById("rut");

        const inputTelefono =
            document.getElementById("telefono");

        const inputTarjeta =
            document.getElementById("numeroTarjeta");

        const inputVencimiento =
            document.getElementById("vencimiento");



        inputRut.addEventListener("input", () => {

            inputRut.value =
                formatearRut(inputRut.value);

        });


        inputTelefono.addEventListener("input", () => {

            inputTelefono.value =
                formatearTelefono(
                    inputTelefono.value
                );

        });


        inputTarjeta.addEventListener("input", () => {

            inputTarjeta.value =
                formatearNumeroTarjeta(
                    inputTarjeta.value
                );

        });


        inputVencimiento.addEventListener("input", () => {

            inputVencimiento.value =
                formatearVencimiento(
                    inputVencimiento.value
                );

        });

    }
);

/*
 * Muestra los productos del carrito
 * en el resumen del checkout.
 */

function mostrarResumenCheckout() {

    const contenedor =
        document.getElementById(
            "productosCheckout"
        );

    const subtotalElemento =
        document.getElementById(
            "subtotalCheckout"
        );

    const totalElemento =
        document.getElementById(
            "totalCheckout"
        );


    if (
        !contenedor ||
        !subtotalElemento ||
        !totalElemento
    ) {
        return;
    }


    const carrito = obtenerCarrito();


    /*
     * Si alguien entra directamente a checkout.html
     * sin tener productos.
     */

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="text-center py-4">

                <p class="text-muted mb-3">
                    Tu carrito está vacío.
                </p>

                <a
                    href="catálogo.html"
                    class="btn btn-outline-primary"
                >
                    Ir al catálogo
                </a>

            </div>
        `;

        subtotalElemento.textContent =
            formatearPrecio(0);

        totalElemento.textContent =
            formatearPrecio(0);

        const botonConfirmar =
            document.getElementById(
                "btnConfirmarCompra"
            );

        if (botonConfirmar) {
            botonConfirmar.disabled = true;
        }

        return;
    }


    /*
     * Limpiamos el mensaje
     * "Cargando productos..."
     */

    contenedor.replaceChildren();


    let subtotal = 0;


    /*
     * Recorremos todos los productos
     * guardados en el carrito.
     */

    carrito.forEach(item => {

        const producto =
            buscarProducto(item.id);


        if (!producto) {
            return;
        }


        const subtotalProducto =
            producto.precio *
            item.cantidad;


        subtotal += subtotalProducto;


        /*
         * Contenedor del producto
         */

        const productoElemento =
            document.createElement("div");


        productoElemento.className =
            "producto-checkout";


        /*
         * Imagen
         */

        const imagen =
            document.createElement("img");


        imagen.src =
            producto.imagen;


        imagen.alt =
            producto.nombre;


        imagen.className =
            "producto-checkout-imagen";


        /*
         * Información
         */

        const informacion =
            document.createElement("div");


        informacion.className =
            "producto-checkout-info";


        const nombre =
            document.createElement("p");


        nombre.className =
            "producto-checkout-nombre";


        nombre.textContent =
            producto.nombre;


        const cantidad =
            document.createElement("small");


        cantidad.className =
            "text-muted";


        cantidad.textContent =
            `Cantidad: ${item.cantidad}`;


        informacion.append(
            nombre,
            cantidad
        );


        /*
         * Precio correspondiente a
         * cantidad × precio unitario
         */

        const precio =
            document.createElement("strong");


        precio.className =
            "producto-checkout-precio";


        precio.textContent =
            formatearPrecio(
                subtotalProducto
            );


        /*
         * Agregamos todo al producto.
         */

        productoElemento.append(
            imagen,
            informacion,
            precio
        );


        /*
         * Finalmente agregamos el producto
         * al resumen.
         */

        contenedor.appendChild(
            productoElemento
        );

    });


    /*
     * Mostramos los totales.
     *
     * Por ahora el envío es gratis,
     * por lo que subtotal y total
     * son iguales.
     */

    subtotalElemento.textContent =
        formatearPrecio(subtotal);


    totalElemento.textContent =
        formatearPrecio(subtotal);

}

/* ========================================
   CONFIRMAR COMPRA
======================================== */

function confirmarCompra(evento) {

    evento.preventDefault();

    const formulario =
        document.getElementById("formCheckout");


    /*
     * 1. Validar campos obligatorios
     */

    if (!formulario.checkValidity()) {

        formulario.classList.add(
            "was-validated"
        );

        return;
    }


    /*
     * 2. Obtener carrito
     */

    const carrito =
        obtenerCarrito();


    if (carrito.length === 0) {

        alert(
            "No puedes realizar una compra con el carrito vacío."
        );

        window.location.href =
            "carrito.html";

        return;
    }


    /*
     * 3. Validar tarjeta simulada
     */

    if (!validarTarjeta()) {
        return;
    }


    /*
     * 4. Construir productos del pedido
     */

    const productosPedido = [];

    let total = 0;


    carrito.forEach(item => {

        const producto =
            buscarProducto(item.id);


        if (!producto) {
            return;
        }


        const subtotal =
            producto.precio *
            item.cantidad;


        total += subtotal;


        productosPedido.push({

            id: producto.id,

            nombre: producto.nombre,

            cantidad: item.cantidad,

            precio: producto.precio,

            subtotal: subtotal

        });

    });


    /*
     * Si por algún problema ningún producto
     * del carrito existe en el catálogo,
     * no permitimos generar el pedido.
     */

    if (productosPedido.length === 0) {

        alert(
            "No fue posible encontrar los productos del carrito."
        );

        return;
    }


    /*
     * 5. Obtener número de tarjeta.
     *
     * Eliminamos cualquier carácter que
     * no sea numérico.
     *
     * IMPORTANTE:
     * No guardaremos el número completo.
     */

    const numeroTarjeta =
        document
            .getElementById("numeroTarjeta")
            .value
            .replace(/\D/g, "");


    const ultimos4 =
        numeroTarjeta.slice(-4);


    /*
     * 6. Crear pedido
     */

    const pedido = {

        id: generarIdPedido(),

        fecha: new Date().toLocaleString(
            "es-CL"
        ),


        /* DATOS DEL CLIENTE */

        cliente: {

            nombre:
                document
                    .getElementById("nombre")
                    .value
                    .trim(),

            apellido:
                document
                    .getElementById("apellido")
                    .value
                    .trim(),

            rut:
                document
                    .getElementById("rut")
                    .value
                    .trim(),

            telefono:
                document
                    .getElementById("telefono")
                    .value
                    .trim(),

            correo:
                document
                    .getElementById("correo")
                    .value
                    .trim()

        },


        /* DIRECCIÓN DE ENVÍO */

        direccion: {

            region:
                document
                    .getElementById("region")
                    .value,

            comuna:
                document
                    .getElementById("comuna")
                    .value
                    .trim(),

            calle:
                document
                    .getElementById("calle")
                    .value
                    .trim(),

            numero:
                document
                    .getElementById(
                        "numeroDireccion"
                    )
                    .value
                    .trim(),

            departamento:
                document
                    .getElementById(
                        "departamento"
                    )
                    .value
                    .trim(),

            referencia:
                document
                    .getElementById(
                        "referencia"
                    )
                    .value
                    .trim()

        },


        /* PRODUCTOS COMPRADOS */

        productos:
            productosPedido,


        /* INFORMACIÓN DEL PAGO */

        pago: {

            metodo:
                "Tarjeta de crédito/débito",

            titular:
                document
                    .getElementById(
                        "titularTarjeta"
                    )
                    .value
                    .trim(),

            /*
             * Solamente guardamos
             * los últimos 4 números.
             */

            ultimos4:
                ultimos4

        },


        /* TOTAL DEL PEDIDO */

        total:
            total,


        /* ESTADO INICIAL */

        estado:
            "Pagado"

    };


    /*
     * 7. Guardar pedido en fc-pedidos
     */

    guardarPedido(pedido);


    /*
     * 8. Vaciar carrito
     *
     * Solo lo hacemos DESPUÉS de haber
     * guardado correctamente el pedido.
     */

    localStorage.removeItem(
        "fullcomponents-carrito-v2"
    );


    /*
     * 9. Mostrar confirmación
     */

    mostrarCompraExitosa(
        pedido
    );

}


/* ========================================
   VALIDAR TARJETA
======================================== */

function validarTarjeta() {

    const numero =
        document
            .getElementById("numeroTarjeta")
            .value
            .replace(/\s/g, "");


    const vencimiento =
        document
            .getElementById("vencimiento")
            .value
            .trim();


    const cvv =
        document
            .getElementById("cvv")
            .value
            .trim();


    /*
     * Para esta simulación exigiremos
     * exactamente 16 números.
     */

    if (!/^\d{16}$/.test(numero)) {

        alert(
            "El número de tarjeta debe contener 16 dígitos."
        );

        return false;
    }


    /*
     * MM/AA
     */

    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {

        alert(
            "La fecha de vencimiento debe tener el formato MM/AA."
        );

        return false;
    }


    const mes =
        Number(
            vencimiento.substring(0, 2)
        );


    if (mes < 1 || mes > 12) {

        alert(
            "El mes de vencimiento no es válido."
        );

        return false;
    }


    /*
     * CVV simulado de 3 números.
     */

    if (!/^\d{3}$/.test(cvv)) {

        alert(
            "El CVV debe contener 3 dígitos."
        );

        return false;
    }


    return true;

}

/* ========================================
   OBTENER PEDIDOS
======================================== */

function obtenerPedidos() {

    try {

        const datos =
            JSON.parse(
                localStorage.getItem(CLAVE_PEDIDOS)
            );

        if (!Array.isArray(datos)) {
            return [];
        }

        return datos;

    } catch {

        return [];

    }

}


/* ========================================
   GUARDAR PEDIDO
======================================== */

function guardarPedido(pedido) {

    const pedidos =
        obtenerPedidos();

    pedidos.push(pedido);

    localStorage.setItem(
        CLAVE_PEDIDOS,
        JSON.stringify(pedidos)
    );

}

function generarIdPedido() {

    const pedidos =
        obtenerPedidos();

    let mayorId = 0;

    pedidos.forEach(pedido => {

        const numero =
            Number(
                String(pedido.id)
                    .replace("PED-", "")
            );

        if (
            Number.isInteger(numero) &&
            numero > mayorId
        ) {
            mayorId = numero;
        }

    });

    return (
        "PED-" +
        String(mayorId + 1)
            .padStart(4, "0")
    );

}


/* ========================================
   COMPRA EXITOSA
======================================== */

function mostrarCompraExitosa(pedido) {

    const main =
        document.querySelector("main");


    if (!main) {
        return;
    }


    main.innerHTML = `
        <div
            class="container py-5"
            style="max-width: 650px;"
        >

            <div
                class="
                    checkout-card
                    text-center
                    py-5
                "
            >

                <div class="fs-1 mb-3">
                    ✅
                </div>

                <h1 class="h3 mb-3">
                    ¡Compra realizada con éxito!
                </h1>

                <p class="text-muted">
                    Tu pedido ha sido registrado
                    correctamente.
                </p>

                <div
                    class="
                        bg-light
                        rounded
                        p-3
                        my-4
                    "
                >

                    <small
                        class="
                            text-muted
                            d-block
                        "
                    >
                        Número de pedido
                    </small>

                    <strong class="fs-5">
                        ${pedido.id}
                    </strong>

                </div>

                <p>
                    Total pagado:
                    <strong>
                        ${formatearPrecio(
        pedido.total
    )}
                    </strong>
                </p>

                <p class="text-muted small">
                    Pago simulado con tarjeta
                    terminada en
                    •••• ${pedido.pago.ultimos4}
                </p>

                <a
                    href="index.html"
                    class="
                        btn
                        btn-primary
                        mt-3
                        me-2
                    "
                >
                    Volver al inicio
                </a>

                <a
                    href="catálogo.html"
                    class="
                        btn
                        btn-outline-primary
                        mt-3
                    "
                >
                    Seguir comprando
                </a>

            </div>

        </div>
    `;

}

/* ========================================
   FORMATEAR RUT
======================================== */

function formatearRut(valor) {

    let rut =
        valor
            .replace(/[^0-9kK]/g, "")
            .toUpperCase();

    if (rut.length > 9) {
        rut = rut.slice(0, 9);
    }

    if (rut.length <= 1) {
        return rut;
    }


    const cuerpo =
        rut.slice(0, -1);

    const dv =
        rut.slice(-1);


    const cuerpoFormateado =
        Number(cuerpo)
            .toLocaleString("es-CL");


    return `${cuerpoFormateado}-${dv}`;

}


/* ========================================
   FORMATEAR TELÉFONO CHILENO
======================================== */

function formatearTelefono(valor) {

    let numeros =
        valor.replace(/\D/g, "");


    /*
     * Si escribe 56 al comienzo,
     * lo quitamos para trabajar solamente
     * con el número nacional.
     */

    if (numeros.startsWith("56")) {

        numeros =
            numeros.slice(2);

    }


    /*
     * Máximo:
     * 9 1234 5678
     */

    numeros =
        numeros.slice(0, 9);


    if (numeros.length === 0) {
        return "";
    }


    if (numeros.length <= 1) {

        return `+56 ${numeros}`;

    }


    if (numeros.length <= 5) {

        return (
            `+56 ${numeros.slice(0, 1)} ` +
            numeros.slice(1)
        );

    }


    return (
        `+56 ${numeros.slice(0, 1)} ` +
        `${numeros.slice(1, 5)} ` +
        numeros.slice(5)
    );

}


/* ========================================
   FORMATEAR NÚMERO DE TARJETA
======================================== */

function formatearNumeroTarjeta(valor) {

    const numeros =
        valor
            .replace(/\D/g, "")
            .slice(0, 16);


    return numeros
        .replace(/(.{4})/g, "$1 ")
        .trim();

}


/* ========================================
   FORMATEAR VENCIMIENTO
======================================== */

function formatearVencimiento(valor) {

    const numeros =
        valor
            .replace(/\D/g, "")
            .slice(0, 4);


    if (numeros.length <= 2) {

        return numeros;

    }


    return (
        numeros.slice(0, 2) +
        "/" +
        numeros.slice(2)
    );

}