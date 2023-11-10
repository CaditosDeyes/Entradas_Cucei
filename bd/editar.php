<?php
require_once 'conexion.php';

$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];

$sql = "SELECT * FROM DatosP WHERE nombre = '$nombre' AND apellido = '$apellido'";
$resultado = $mysql->query($sql);
$response = array();

if ($mysql->affected_rows > 0) {
    while ($row = mysqli_fetch_assoc($resultado)) {
        $response[] = array(
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'marcaCarro' => $row['marcaCarro'],
            'placasCarro' => $row['placasCarro'],
            'colorCarro' => $row['colorCarro'],
            'horaEntrada' => $row['horaEntrada'],
            'diaEntrada' => $row['diaEntrada'],
            'puertaEntrada' => $row['puertaEntrada'],
            'moduloVisita' => $row['moduloVisita'],
            'id' => $row['id'],
        );
    }
    $response['errorCode'] = 1;
} else {
    $response['errorCode'] = 3;
}

echo json_encode($response);
?>
