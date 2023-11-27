<?php
//variable interna = variable externa
$var1 = $_GET['nombre'];
$var2 = $_GET['apellido'];
$var3 = $_GET['marcaCarro'];
$var4 = $_GET['placasCarro'];
$var5 = $_GET['colorCarro'];
$var6 = $_GET['horaEntrada'];
$var7 = $_GET['diaEntrada'];
$var8 = $_GET['puertaEntrada'];
$var9 = $_GET['moduloVisita'];
//datos de conexion
$server = "localhost";
$user = "id21510609_admin";
$password = "#Admin1234";
$bd = "id21510609_datos";
$cone = mysqli_connect($server,$user,$password,$bd);
if(!$cone){
    die("Error al conectar");
}
//crear la sentencia
$sql="INSERT INTO DatosP(nombre,apellido,placasCarro,colorCarro,horaEntrada,diaEntrada,puertaEntrada,moduloVisita)VALUES('$var1','$var2','$var3','$var4','$var5','$var6','$var7','$var8','$var9')";
//ejecutar sentencia
if(mysqli_query($cone,$sql)){
    echo "1";
}else{
    echo "0";
}
?>