/*
 * Muestra en el navbar (donde está el ícono 👤) el nombre de quien
 * inició sesión, en vez del texto "Iniciar sesión".
 *
 * Para que funcione, el link del navbar debe tener:
 *   id="linkSesion"
 *   y adentro un <span class="texto-sesion">Iniciar sesión</span>
 *
 * Debe cargarse en todas las páginas que tengan ese navbar
 * (index.html, catálogo.html, producto.html, login.html...).
 */

function iniciarBarraSesion() {
    const linkSesion = document.getElementById("linkSesion");
    if (!linkSesion) return;

    const textoSesion = linkSesion.querySelector(".texto-sesion");

    // ¿Hay un administrador con sesión activa?
    if (sessionStorage.getItem("rolActivo") === "admin") {
        linkSesion.href = "admin.html";
        if (textoSesion) textoSesion.textContent = "Administrador";
        return;
    }

    // ¿Hay un usuario normal con sesión activa?
    const datosUsuario = sessionStorage.getItem("usuarioActivo");

    if (datosUsuario) {
        const usuario = JSON.parse(datosUsuario);

        linkSesion.href = "#";
        if (textoSesion) textoSesion.textContent = usuario.nombre;

        linkSesion.addEventListener("click", function (evento) {
            evento.preventDefault();

            const cerrar = window.confirm("¿Cerrar sesión de " + usuario.nombre + "?");
            if (cerrar) {
                sessionStorage.removeItem("usuarioActivo");
                window.location.reload();
            }
        });
    }
    // Si no hay sesión de ningún tipo, el link se queda como está
}

document.addEventListener("DOMContentLoaded", iniciarBarraSesion);
