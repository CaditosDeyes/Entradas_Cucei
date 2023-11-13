<?php
// Variables externas
$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];

// Datos de conexión
$server = "localhost";
$user = "id21510609_admin";
$pass = "#Admin1234";
$bd = "id21510609_datos";

$conexion = mysqli_connect($server, $user, $pass, $bd);
if (!$conexion) {
    die("Error al conectar");
}

// Buscar el registro a eliminar
$sqlBusqueda = "SELECT * FROM DatosP WHERE Nombre='$nombre' AND Apellido='$apellido'";
$resultadoBusqueda = mysqli_query($conexion, $sqlBusqueda);

if (mysqli_num_rows($resultadoBusqueda) > 0) {
    // Encontró el registro, proceder a eliminar
    $sqlEliminar = "DELETE FROM DatosP WHERE Nombre='$nombre' AND Apellido='$apellido'";
    if (mysqli_query($conexion, $sqlEliminar)) {
        echo "1"; // Éxito
    } else {
        echo "0"; // Error al eliminar
    }
} else {
    echo "2"; // No se encontró el registro
}

// Cerrar conexión
mysqli_close($conexion);
?>
