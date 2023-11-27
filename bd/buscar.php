<?php
// Configuración de la conexión a la base de datos
$server = "localhost";
$user = "id21510609_admin";
$password = "#Admin1234";
$bd = "id21510609_datos";

// Crear conexión
$conn = new mysqli($server, $user, $password, $bd);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los parámetros de la solicitud
$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];

// Consulta SQL para buscar la cita
$sql = "SELECT * FROM DatosP WHERE nombre = '$nombre' AND apellido = '$apellido'";

// Ejecutar la consulta
$result = $conn->query($sql);

// Verificar si se encontró la cita
if ($result->num_rows > 0) {
    // Convertir los resultados a un arreglo asociativo
    $row = $result->fetch_assoc();

    // Imprimir los resultados en formato JSON
    echo json_encode($row);
} else {
    // Si no se encontró la cita, devolver un mensaje de error
    echo "0";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
