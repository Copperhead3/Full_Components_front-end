/*
 * Este archivo conecta el panel de administración (admin.html)
 * con el catálogo (catalogo.html) y la ficha de producto (producto.html).
 *
 * Como el sitio no tiene servidor ni base de datos, los cambios que
 * hace el administrador (editar precio, especificaciones o eliminar
 * un producto) se guardan en el localStorage del navegador.
 *
 * IMPORTANTE: localStorage es solo del navegador donde se edita.
 * Si abres el sitio en otro computador o navegador, vas a ver el
 * catálogo original de js/productos.js hasta que entres a ese
 * navegador como administrador otra vez.
 *
 * Debe cargarse DESPUÉS de js/productos.js y ANTES del script
 * de cada página que use el catálogo.
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
