function cargarResenasAdmin() {
    fetch("http://localhost/PULMON-ESCOLAR/backend/get_resena_admin.php")
        .then(response => {
            console.log("Estado de respuesta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            const tbody = document.getElementById("tablaComentarios");

            if (!tbody) {
                console.error("No se encontró el tbody de la tabla");
                return;
            }

            tbody.innerHTML = "";

            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' class='text-center'>No hay reseñas disponibles.</td></tr>";
                return;
            }

            data.forEach((resena) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${resena.id}</td>
                    <td>
                        <input type="text" class="form-control" id="name-${resena.id}" value="${resena.name || 'Anónimo'}">
                    </td>
                    <td>
                        <textarea class="form-control" id="content-${resena.id}">${resena.content}</textarea>
                    </td>
                    <td>${new Date(resena.created_at).toLocaleDateString('es-ES')}</td>
                    <td>
                        <select class="form-select" id="visible-${resena.id}">
                            <option value="aprobado" ${resena.visible == 'aprobado' || resena.visible == 1 ? 'selected' : ''}>Aprobado</option>
                            <option value="rechazado" ${resena.visible == 'rechazado' || resena.visible == 0 ? 'selected' : ''}>Rechazado</option>
                        </select>
                    </td>
                    <td>
                        <div class="acciones">
                            <button class="btn-guardar" onclick="guardarCambios(${resena.id})">💾 Guardar</button>
                            <button class="btn-eliminar" onclick="eliminarComentario(${resena.id})">🗑️ Eliminar</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            console.log("Reseñas cargadas exitosamente:", data.length);
        })
        .catch(error => {
            console.error('Error al cargar reseñas:', error);
            const tbody = document.getElementById("tablaComentarios");
            if (tbody) {
                tbody.innerHTML = "<tr><td colspan='6' class='text-center text-danger'>Error al cargar las reseñas. Revisa la consola.</td></tr>";
            }
        });
}

async function updateReview(id) {
    // ❌ Error: document.getElementById(name - $ { id }).value;
    // ✅ CORREGIDO usando comillas invertidas (`) y ${id}
    const name = document.getElementById(`name-${id}`).value;
    const content = document.getElementById(`content-${id}`).value;
    const visible = document.getElementById(`visible-${id}`).value;

    console.log("Actualizando reseña:", { id, name, content, visible });

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("content", content);
    formData.append("visible", visible);

    try {
        const response = await fetch("http://localhost/PULMON-ESCOLAR/backend/guardar_resena_admin.php", {
            method: "POST",
            body: formData
        });

        console.log("Respuesta del servidor:", response.status);
        const result = await response.json();
        console.log("Resultado:", result);

        if (result.status === "success") {
            alert("Reseña actualizada correctamente.");
            cargarResenasAdmin(); // Recargar tabla
        } else {
            alert("Error al actualizar: " + (result.message || "Error desconocido"));
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error de conexión al actualizar la reseña");
    }

    // Nota: La llamada extra aquí puede causar doble recarga.
    // Si ya está en el 'if (result.status === "success")', puedes quitar esta.
    // Si la de arriba se quita (ej. por si el backend falla), esta asegura que se recargue.
    // Por ahora, la dejaré, pero es un punto a considerar.
    // cargarResenasAdmin(); 
}

// **IMPORTANTE:** Para que la función se llame al hacer clic en el botón de guardar,
// debes asegurarte de que la función se llame 'guardarCambios' si así la tienes en el HTML,
// o cambiar el nombre en el HTML a 'updateReview'.
// Usando el código anterior que me diste, la función que usaste fue 'guardarCambios(1)'.
// Debes renombrar la función:
function guardarCambios(id) {
    updateReview(id); // Llama a la lógica principal
}
// O simplemente llamar la función updateReview(id) en el HTML.

window.onload = cargarResenasAdmin;