const contenedor = document.querySelector('.c-imagenes');
const btnIzquierda = document.querySelector('.boton-izquierda');
const btnDerecha = document.querySelector('.boton-derecha');
const puntos = document.querySelectorAll('.punto');

let index = 0;
const imagenes = document.querySelectorAll('.c-imagenes img');
const total = imagenes.length;

function actualizarCarrusel() {
    contenedor.style.transform = `translateX(${-index * 100}%)`;
    puntos.forEach((p, i) => p.classList.toggle('activo', i === index));
}

btnDerecha.addEventListener('click', () => {
    index = (index + 1) % total;
    actualizarCarrusel();
});

btnIzquierda.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    actualizarCarrusel();
});

puntos.forEach((p, i) => {
    p.addEventListener('click', () => {
        index = i;
        actualizarCarrusel();
    });
});

// Auto-slide cada 4s
setInterval(() => {
    index = (index + 1) % total;
    actualizarCarrusel();
}, 4000);

document.addEventListener("DOMContentLoaded", () => {
    const btnAbrir = document.getElementById("btnContactanos");
    const modal = document.getElementById("modalComentario");
    const btnCerrar = document.getElementById("btnCerrarModal");
    const form = document.getElementById("formComentario");

    // Abrir el modal
    btnAbrir.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // Cerrar el modal
    btnCerrar.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Enviar comentario (solo si usuario está autenticado)
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const estaLogueado = localStorage.getItem("adminAutenticado") === "true";
        if (!estaLogueado) {
            alert("Debes iniciar sesión para enviar comentarios.");
            return;
        }

        const nombre = document.getElementById("nombreComentario").value;
        const mensaje = document.getElementById("mensajeComentario").value;

        console.log("Comentario enviado:", { nombre, mensaje });

        form.reset();
        modal.classList.add("hidden");
        alert("¡Comentario enviado con éxito!");
    });
});