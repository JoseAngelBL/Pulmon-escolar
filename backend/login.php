<?php
session_start();

// Configurar encabezados CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost"); // Cambiar al dominio específico
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Manejar preflight (CORS pre-request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}

// Incluir archivo de conexión a la base de datos
include "db.php";

// Leer cuerpo del POST
$data = json_decode(file_get_contents("php://input"));

// Verificar si se enviaron los campos necesarios
if (!isset($data->username) || !isset($data->password)) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos: username o password"
    ]);
    http_response_code(400);
    exit();
}

$username = trim($data->username);
$password = $data->password;

// Validar que no estén vacíos
if (empty($username) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Usuario y contraseña son requeridos"
    ]);
    exit();
}

// Consulta con prepared statement para prevenir SQL Injection
$sql = "SELECT id, username, password, es_admin FROM user WHERE username = ? LIMIT 1";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Error en el servidor"
    ]);
    exit();
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verificar contraseña
    // Si usas MD5 (temporal, deberías migrar a password_hash)
    $passwordVerificado = (md5($password) === $user["password"]);
    
    // Si ya usas password_hash, usa esto en su lugar:
    // $passwordVerificado = password_verify($password, $user["password"]);
    
    if ($passwordVerificado) {
        // Regenerar ID de sesión para prevenir session fixation
        session_regenerate_id(true);
        
        // Guardar datos en sesión
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['es_admin'] = $user['es_admin'];
        $_SESSION['login_time'] = time();
        
        // Generar token de sesión adicional
        $_SESSION['token'] = bin2hex(random_bytes(32));
        
        echo json_encode([
            "success" => true,
            "message" => "Login correcto",
            "rol" => $user["es_admin"],
            "token" => $_SESSION['token']
        ]);
    } else {
        // Contraseña incorrecta
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos"
        ]);
    }
} else {
    // Usuario no encontrado
    echo json_encode([
        "success" => false,
        "message" => "Usuario o contraseña incorrectos"
    ]);
}

$stmt->close();
$conn->close();
?>