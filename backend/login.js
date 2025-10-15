document.getElementById("loginForm").addEventListener("submit", async(e) => {
    e.preventDefault();

    const username = document.getElementById("asd").value;
    const password = document.getElementById("123").value;

    try {
        const res = await fetch("http://localhost/PULMON-ESCOLAR/backend/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        document.getElementById("mensaje").innerText = data.message;

        if (data.success) {
            document.getElementById("mensaje").style.color = "green";
            window.localtion.href = "admin.html"
        } else {
            document.getElementById("mensaje").style.color = "red";
        }
    } catch (error) {
        document.getElementById("mensaje").innerText = "Error de conexión con el servidor.";
        document.getElementById("mensaje").style.color = "red";
    }
});