<?php
// Configuración de la conexión a la base de datos
$servername = "tu_servidor";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los parámetros de la solicitud
$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];

// Consulta SQL para buscar la cita
$sql = "SELECT * FROM tu_tabla WHERE nombre = '$nombre' AND apellido = '$apellido'";

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
