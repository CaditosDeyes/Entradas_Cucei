<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SERVER PUERTA 2</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f2f2f2;
            color: #333;
        }
        h2 {
            margin-bottom: 10px;
        }
        .container {
            border: 1px solid #ddd;
            margin: 10px;
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
        }
        .horizontal-block {
            border: 1px solid red;
            background-color: white;
            margin: 15px;
            padding: 10px;
            align-items: center;
            border-radius: 10px;
        }
        .double-container {
            display: flex;
            justify-content: space-between;
            border: 1px solid red;
            background-color: white;
            border-radius: 10px;
            margin: 15px 15px 50px 15px;
            padding: 10px;
        }
        .left-block, .right-block {
            width: 48%;
            border: 1px solid red;
            background-color: white;
        }
        .horizontal-block h2, .left-block h2, .right-block h2 {
            text-align: center;
            font-size: 2em;
            font-weight: 600;
        }
        /* Container */
        .horizontal-block .current {
            font-weight: bolder;
        }
        .current, .preview, .post {
            margin: 10px;
            padding: 10px;
            border-radius: 10px;
        }
        .current {
            background-color: rgba(76, 161, 76, 0.611)
        }
        .preview {
            background-color: rgba(255, 166, 0, 0.558);
            color: black;
            font-weight: 600;
        }
        .post {
            background-color: rgba(255, 0, 0, 0.674);
            color: black;
            font-weight: 600;
        }
        /* TIME */
        .time {
            display: flex;
            justify-content: space-between;
        }
        .titlePuerta{
            font-size: 4em;
            color: black;
            font-weight: 600;
        }
        #fechaHora {
            font-size: 4em;
            font-weight: bold;
            color: #000ff5;
        }
    </style>
</head>
<body>
    <div class="time">
        <div class="titlePuerta">Puerta 2</div>
        <div id="fechaHora"></div>
        
    </div> 
    
    <?php
            date_default_timezone_set('America/Mexico_City');
            $server = "localhost";
            $user = "id21510609_admin";
            $password = "#Admin1234";
            $bd = "id21510609_datos";
            $cone = mysqli_connect($server,$user,$password,$bd);
            if(!$cone){
                die("Error al conectar");
            }
            
            // Obtiene la hora actual en formato "H:i"
            $horaActual = date("H:i");
            
            // 15 minutos antes de la hora actual
            $horaAntes = date("H:i", strtotime("-15 minutes", strtotime($horaActual)));
            // 5 minutos antes
            $horaAntes5 = date("H:i", strtotime("-5 minutes", strtotime($horaActual)));
            // 15 minutos despues de la hora actual
            $horaDespues = date("H:i", strtotime("+15 minutes", strtotime($horaActual)));
            // 5 minutos despues
            $horaDespues5 = date("H:i", strtotime("+5 minutes", strtotime($horaActual)));
            
            echo "Hola eliminar < " . $horaAntes . "<br>";
            // DELETE
            $sqlEliminar = "DELETE FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) < '$horaAntes'";
            $cone->query($sqlEliminar);
            
            // Consulta BD para obtener las visitas programadas dentro del rango de tiempo
            $sqlActual = "SELECT * FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) BETWEEN '$horaAntes5' AND '$horaDespues5' AND puertaEntrada = 'Revolucion' ORDER BY TIME(horaEntrada)";
            //$sqlActual = "SELECT * FROM Puertas WHERE DiaEntrada != CURDATE() AND PuertaEntrada = 2";
            $resultActual = $cone->query($sqlActual);
            
            $sqlPreview = "SELECT * FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) BETWEEN '$horaDespues5' AND '$horaDespues' AND puertaEntrada = 'Revolucion' ORDER BY TIME(horaEntrada)";
            $resultPreview = $cone->query($sqlPreview);
            
            $sqlPost = "SELECT * FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) BETWEEN '$horaAntes' AND '$horaAntes5' AND puertaEntrada = 'Revolucion' ORDER BY TIME(horaEntrada)";
            $resultPost = $cone->query($sqlPost);
            
            // Eliminar las visitas que han pasado más de 15 minutos desde su hora de entrada
            $sqlEliminar = "DELETE FROM DatosP WHERE DATE(diaEntrada) = CURDATE() AND TIME(horaEntrada) < '$horaAntes'";
            $cone->query($sqlEliminar);

            // Cierra la conexión
            //$cone->close();
            ?>

    <div class="horizontal-block">
        <h2>Visita Actual</h2>
        <div class="current">
        <?php
            echo "De: " . $horaAntes5 . " a " . $horaDespues5 . "<br>";
            if ($resultActual->num_rows > 0) {
                while($row = $resultActual->fetch_assoc()) {
                    echo '<div class="container">
                        Hora Entrada: ' . $row["horaEntrada"] . ' | Dia Entrada: ' . $row["diaEntrada"] . '<br><br>
                        ID: ' . $row["id"] . '<br>
                        Nombre: ' . $row["nombre"] . '<br>
                        Apellido: ' . $row["apellido"] . '<br>
                        Modulo: ' . $row["moduloVisita"] . '<br>
                        Puerta Entrada: ' . $row["puertaEntrada"] . '<br>
                        Marca: ' . $row["marcaCarro"] . '<br>
                        Placa: ' . $row["placasCarro"] . '<br>
                          </div>';
                }
            } else {
                echo "No hay visitas (Puerta2).";
            }
            //$cone->close();
        ?>
        </div>
    </div>

    <div class="double-container">
        <div class="left-block">
            
            <h2>Visitas Próximas</h2>
            <div class="preview">
                 <?php
                 echo "De: " . $horaDespues5 . " a " . $horaDespues . "<br>";
                    if ($resultPreview->num_rows > 0) {
                        while($row = $resultPreview->fetch_assoc()) {
                            echo '<div class="container">
                            Hora Entrada: ' . $row["horaEntrada"] . ' | Dia Entrada: ' . $row["diaEntrada"] . '<br><br>
                            ID: ' . $row["id"] . '<br>
                            Nombre: ' . $row["nombre"] . '<br>
                            Apellido: ' . $row["apellido"] . '<br>
                            Modulo: ' . $row["moduloVisita"] . '<br>
                            Puerta Entrada: ' . $row["puertaEntrada"] . '<br>
                            Marca: ' . $row["marcaCarro"] . '<br>
                            Placa: ' . $row["placasCarro"] . '<br>
                          </div>';
                        }
                    } else {
                        echo '<div class="container">
                            No hay visitas Preview (Puerta2)
                          </div>';
                    }
                ?>
            </div>
            <!-- Contenido del bloque de Visitas Próximas -->
        </div>
        
        <div class="right-block">
            <h2>Visitas Pasadas</h2>
            <div class="post">
                <?php
                echo "De: " . $horaAntes . " a " . $horaAntes5 . "<br>";
                    if ($resultPost->num_rows > 0) {
                        while($row = $resultPost->fetch_assoc()) {
                           echo '<div class="container">
                           Hora Entrada: ' . $row["horaEntrada"] . ' | Dia Entrada: ' . $row["diaEntrada"] . '<br><br>
                           ID: ' . $row["id"] . '<br>
                           Nombre: ' . $row["nombre"] . '<br>
                           Apellido: ' . $row["apellido"] . '<br>
                           Modulo: ' . $row["moduloVisita"] . '<br>
                           Puerta Entrada: ' . $row["puertaEntrada"] . '<br>
                           Marca: ' . $row["marcaCarro"] . '<br>
                           Placa: ' . $row["placasCarro"] . '<br>
                          </div>';
                        }
                    } else {
                         echo '<div class="container">
                            No hay visitas POST (Puerta2)
                          </div>';
                    }
                
                    //$cone->close();
                ?>
            </div>
            <!-- Contenido del bloque de Visitas Pasadas -->
        </div>
    </div>

    <script>
        // Función para obtener la fecha y hora actual formateada
        function obtenerFechaHora() {
            var fechaHora = new Date();
            return fechaHora.toLocaleString('es-ES', { hour12: false });
        }

        // Función para recargar la página cada minuto
        function recargarPagina() {
            location.reload(true);
        }

        // Recargar la página cada minuto (60000 milisegundos)
        setTimeout(recargarPagina, 300000);

        // Obtener la última fecha y hora almacenada en el almacenamiento local
        var ultimaFechaHora = localStorage.getItem('ultimaFechaHora');

        // Mostrar la última fecha y hora o la fecha y hora actual si no hay ninguna almacenada
        document.getElementById('fechaHora').innerHTML = ultimaFechaHora || obtenerFechaHora();

        // Actualizar la fecha y hora cada segundo y almacenarla en el almacenamiento local
        setInterval(function() {
            var fechaHora = obtenerFechaHora();
            document.getElementById('fechaHora').innerHTML = fechaHora;
            localStorage.setItem('ultimaFechaHora', fechaHora);
        }, 1000);
    </script>
</body>
</html>