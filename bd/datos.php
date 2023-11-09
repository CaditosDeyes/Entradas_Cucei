<?php
// Variables internas = variables externas
$var1 = $_GET['nombre'];
$var2 = $_GET['apellido'];
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

// Crear la sentencia
$sql = "INSERT INTO DatosP(Nombre, Apellido, MarcaCarro, PlacasCarro, ColorCarro, HoraEntrada, DiaEntrada, PuertaEntrada, ModuloVisita) VALUES ('$var1', '$var2', '$var3', '$var4', '$var5', '$var6', '$var7', '$var8', '$var9')";

// Ejecutar sentencia
if (mysqli_query($cone, $sql)) {
    echo "1";
} else {
    echo "0";
}
?>
