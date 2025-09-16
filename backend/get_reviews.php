<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

// Solo mostrar reseñas visibles
$sql = "SELECT * FROM reviews WHERE visible = 1 ORDER BY created_at DESC";
$result = $conn->query($sql);

$resenas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $resenas[] = $row;
    }
}

echo json_encode($resenas);
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
?>