const botones = document.querySelectorAll('.boton-menu');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const contenido = boton.nextElementSibling;

        // Cierra todos los demás
        document.querySelectorAll('.contenido').forEach(div => {
            if (div !== contenido) {
                div.style.display = 'none';
            }
        });

        // Alterna el actual
        contenido.style.display = contenido.style.display === 'block' ? 'none' : 'block';
    });
});

// Cierra si haces clic fuera
document.addEventListener('click', e => {
    if (!e.target.closest('.item')) {
        document.querySelectorAll('.contenido').forEach(div => {
            div.style.display = 'none';
        });
    }
});