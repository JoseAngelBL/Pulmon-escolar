    function enviarResena() {
        const username = document.getElementById("username").value.trim() || "Anónimo";
        const content = document.getElementById("content").value.trim();
        const messageDiv = document.getElementById("message");

        messageDiv.textContent = "";

        if (!content) {
            messageDiv.textContent = "El contenido de la reseña es obligatorio.";
            return;
        }

        fetch("http://localhost/reviews/backend/createrevew.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    content
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    messageDiv.textContent = data.error;
                } else {
                    document.getElementById("content").value = "";
                    document.getElementById("username").value = "";
                    alert("¡Reseña enviada con éxito!");
                    cargarResenas();
                }
            })
            .catch(error => {
                console.error("Error al enviar reseña:", error);
                messageDiv.textContent = "Error al conectar con el servidor.";
            });
    }

    function cargarResenas() {
        fetch("http://localhost/reviews/backend/get_reviews.php")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("resenas");
                container.innerHTML = "";

                if (!Array.isArray(data) || data.length === 0) {
                    container.innerHTML = "<p>No hay reseñas disponibles.</p>";
                    return;
                }

                data.forEach(resena => {
                    const div = document.createElement("div");
                    div.className = "review";
                    div.innerHTML = `
               <strong>${resena.name}</strong><br>
               <small>${resena.created_at}</small>
               <p>${resena.content}</p>
             `;
                    container.appendChild(div);
                });
            })
            .catch(err => {
                document.getElementById("resenas").innerHTML = "<p>Error al cargar reseñas.</p>";
            });
    }

    window.onload = cargarResenas;