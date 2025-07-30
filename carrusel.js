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
    const botones = document.querySelectorAll(".boton-menu");
    const contenedores = document.querySelectorAll(".contenido");
  
    botones.forEach((boton, index) => {
      boton.addEventListener("click", () => {
        const contenidoActual = contenedores[index];
        const visible = contenidoActual.style.display === "block";
  
        // Cierra todos los contenidos
        contenedores.forEach((contenido) => {
          contenido.style.display = "none";
        });
  
        // Solo abre el actual si estaba cerrado
        if (!visible) {
          contenidoActual.style.display = "block";
        }
      });
    });
  });
  