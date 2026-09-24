/*
 * Este archivo conecta el panel de administración (admin.html)
 * con el catálogo (catalogo.html) y la ficha de producto (producto.html).

 
 */

const CLAVE_CATALOGO = "fc-catalogo-admin";

// Devuelve el catálogo actual: el guardado por el admin, o si no
// existe todavía, una copia del catálogo original de productos.js
function obtenerCatalogo() {
    const guardado = localStorage.getItem(CLAVE_CATALOGO);

    if (guardado) {
        try {
            return JSON.parse(guardado);
        } catch {
            // Si el dato guardado está dañado, seguimos con el original
        }
    }

    return JSON.parse(JSON.stringify(productos));
}

// Guarda la lista de productos (ya editada) en el navegador
function guardarCatalogo(lista) {
    localStorage.setItem(CLAVE_CATALOGO, JSON.stringify(lista));
}

// Borra los cambios del admin y vuelve al catálogo original
function restablecerCatalogo() {
    localStorage.removeItem(CLAVE_CATALOGO);
}

