function cargarResenas() {
    fetch("http://localhost/PULMON-ESCOLAR/backend/get_reviews.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("reseñas-container");
            container.innerHTML = "";

            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = "<p>No hay reseñas disponibles.</p>";
                return;
            }

            data.forEach(resena => {
                const div = document.createElement("div");
                div.className = "tarjeta-reseña";
                div.innerHTML = `
                    <h3>${resena.name}</h3>
                    <p class="fecha">${new Date(resena.created_at).toLocaleDateString('es-ES')}</p>
                    <p class="texto">"${resena.content}"</p>
                `;
                container.appendChild(div);
            });
        })
        .catch(err => {
            console.error("Error al cargar reseñas:", err);
            document.getElementById("reseñas-container").innerHTML = "<p>Error al cargar reseñas.</p>";
        });
}

window.onload = cargarResenas;