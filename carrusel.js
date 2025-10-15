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