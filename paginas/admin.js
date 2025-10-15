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
                        <select id="visible-${resena.id}" class="form-select ${resena.visible == 1 ? 'status-visible' : 'status-hidden'}">
                            <option value="1" ${resena.visible == 1 ? 'selected' : ''}>Aprobado</option>
                            <option value="0" ${ resena.visible == 0 ? 'selected' : ''}>Rechazado</option>
                        </select>
                    </td>
                    <td>
                        <div class="acciones">
                            <button class="btn-guardar" onclick="updateReview(${resena.id})">💾 Guardar</button>
                            <button class="btn-eliminar" onclick="eliminarResena(${resena.id})">🗑️ Eliminar</button>
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

        const result = await response.json();
        if (result.status === "success") {
            alert("Reseña actualizada correctamente.");
            // Actualizar las clases CSS del select según el nuevo estado
            const selectElement = document.getElementById(`visible-${id}`);
            if (visible == 1) {
                selectElement.className = 'status-selector status-visible';
            } else {
                selectElement.className = 'status-selector status-hidden';
            }
        } else {
            alert("Error al actualizar: " + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error de conexión al actualizar la reseña");
    }


}

// Función para eliminar una reseña
function eliminarResena(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña? Esta acción no se puede deshacer.')) {
        // Crear FormData para enviar el ID
        const formData = new FormData();
        formData.append('id', id);

        fetch("http://localhost/PULMON-ESCOLAR/backend/admin_delete_reviews.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Reseña eliminada exitosamente');
                    // Recargar la tabla para mostrar los cambios
                    cargarResenasAdmin();
                } else {
                    alert('Error al eliminar la reseña: ' + (data.message || 'Error desconocido'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión al eliminar la reseña');
            });
    }
}


window.onload = cargarResenasAdmin;