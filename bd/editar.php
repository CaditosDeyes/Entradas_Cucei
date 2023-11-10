<?php
// Variables internas = variables externas
$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];
$var1 = $_GET['nuevoNombre'];
$var2 = $_GET['nuevoApellido'];
$var3 = $_GET['marcaCarro'];
$var4 = $_GET['placasCarro'];
$var5 = $_GET['colorCarro'];
$var6 = $_GET['horaEntrada'];
$var7 = $_GET['diaEntrada'];
$var8 = $_GET['puertaEntrada'];
$var9 = $_GET['moduloVisita'];

// Datos de conexión
$server = "localhost";
$user = "id21510609_admin";
$pass = "#Admin1234";
$bd = "id21510609_datos";

$cone = mysqli_connect($server, $user, $pass, $bd);
if (!$cone) {
    die("Error al conectar");
}

// Crear la sentencia de actualización
$sql = "UPDATE DatosP SET Nombre='$var1', Apellido='$var2', MarcaCarro='$var3', PlacasCarro='$var4', ColorCarro='$var5', HoraEntrada='$var6', DiaEntrada='$var7', PuertaEntrada='$var8', ModuloVisita='$var9' WHERE Nombre='$nombre' AND Apellido='$apellido'";

// Ejecutar sentencia de actualización
if (mysqli_query($cone, $sql)) {
    // Obtener los datos actualizados después de la edición
    $result = mysqli_query($cone, "SELECT * FROM DatosP WHERE Nombre='$var1' AND Apellido='$var2'");
    $row = mysqli_fetch_assoc($result);

    // Devolver los datos como JSON
    echo json_encode($row);
} else {
    // Devolver un mensaje de error en formato JSON
    echo json_encode(array("error" => "Error al actualizar la cita."));
}

// Cerrar la conexión
mysqli_close($cone);
?>
