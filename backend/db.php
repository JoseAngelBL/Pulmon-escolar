<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "pulmon_escolar";

$conn = new mysqli($host, $user, $pass, $dbname, 3306);
if ($conn->connect_error) {
    die("Error de conexion;" . $conn->connect_error);
}
?>