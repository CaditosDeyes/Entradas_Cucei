<?php
// Datos de conexión
$server = "localhost";
$user = "id21510609_admin";
$pass = "#Admin1234";
$bd = "id21510609_datos";

// Crear conexión
$cone = mysqli_connect($server, $user, $pass, $bd);

// Verificar la conexión
if (!$cone) {
    die("Error al conectar: " . mysqli_connect_error());
}

// Recibir datos del POST
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$marcaCarro = $_POST['marcaCarro'];
$placasCarro = $_POST['placasCarro'];
$colorCarro = $_POST['colorCarro'];
$horaEntrada = $_POST['horaEntrada'];
$diaEntrada = $_POST['diaEntrada'];
$puertaEntrada = $_POST['puertaEntrada'];
$moduloVisita = $_POST['moduloVisita'];

// Crear la sentencia de actualización
$sql = "UPDATE DatosP SET Nombre='$nombre', Apellido='$apellido', MarcaCarro='$marcaCarro', PlacasCarro='$placasCarro', ColorCarro='$colorCarro', HoraEntrada='$horaEntrada', DiaEntrada='$diaEntrada', PuertaEntrada='$puertaEntrada', ModuloVisita='$moduloVisita' WHERE id=$id";

// Ejecutar la sentencia de actualización
if (mysqli_query($cone, $sql)) {
    // Obtener los datos actualizados después de la edición
    $result = mysqli_query($cone, "SELECT * FROM DatosP WHERE id=$id");
    $row = mysqli_fetch_assoc($result);

    // Imprimir información de depuración
    error_log('Datos actualizados: ' . json_encode($row));
    // Devolver los datos como JSON
    echo json_encode($row);
} else {
    // Imprimir mensaje de error en formato JSON
    $error_message = mysqli_error($cone); // Obtener el mensaje de error de MySQL
    error_log('Error al actualizar la cita. Detalles: ' . $error_message);
    echo json_encode(array("error" => "Error al actualizar la cita. Detalles: " . $error_message));
}

// Cerrar la conexión
mysqli_close($cone);
?>
