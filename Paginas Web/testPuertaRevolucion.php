<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puerta Revolucion</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #D0D0D0;
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
            background-color: white;
            margin: 15px;
            padding: 10px;
            align-items: center;
            border-radius: 10px;
        }
        .double-container {
            display: flex;
            justify-content: space-between;
            background-color: white;
            border-radius: 10px;
            margin: 15px 15px 50px 15px;
            padding: 10px;
        }
        .left-block, .right-block {
            width: 100%;
            background-color: white;
        }
        .horizontal-block h2, .left-block h2, .right-block h2 {
            text-align: center;
            font-size: 2em;
            font-weight: 600;
        }
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
            color: black;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        caption {
            font-weight: bold;
            margin-bottom: 10px;
        }

        /* Ajuste para el ancho de la tabla */
        .table-container table {
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="time">
        <div class="titlePuerta">Puerta Revolucion</div>
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
        // 15 minutos después de la hora actual
        $horaDespues = date("H:i", strtotime("+15 minutes", strtotime($horaActual)));
        // 5 minutos después
        $horaDespues5 = date("H:i", strtotime("+5 minutes", strtotime($horaActual)));
        
        // DELETE
        $sqlEliminar = "DELETE FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) < '$horaAntes'";
        $cone->query($sqlEliminar);
        
        // Consulta BD para obtener las visitas programadas dentro del rango de tiempo
        $sqlActual = "SELECT * FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) BETWEEN '$horaAntes5' AND '$horaDespues5' AND puertaEntrada = 'Revolucion' ORDER BY TIME(horaEntrada)";
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
        <div class="table-container current">
            <?php
                echo '<table>
                        <caption>De: ' . $horaAntes5 . ' a ' . $horaDespues5 . '</caption>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Marca de vehiculo</th>
                            <th>Placas de vehiculo</th>
                            <th>Color de vehiculo</th>
                            <th>Hora</th>
                            <th>Modulo</th>
                            <th>Día Entrada</th>
                            <th>Puerta Entrada</th>
                        </tr>';

                if ($resultActual->num_rows > 0) {
                    while($row = $resultActual->fetch_assoc()) {
                        echo '<tr>
                                <td>' . $row["nombre"] . '</td>
                                <td>' . $row["apellido"] . '</td>
                                <td>' . $row["marcaCarro"] . '</td>
                                <td>' . $row["placasCarro"] . '</td>
                                <td>' . $row["colorCarro"] . '</td>
                                <td>' . $row["horaEntrada"] . '</td>
                                <td>' . $row["diaEntrada"] . '</td>
                                <td>' . $row["moduloVisita"] . '</td>
                                <td>' . $row["puertaEntrada"] . '</td>
                            </tr>';
                    }
                } else {
                    echo "<tr><td colspan='9'>No hay visitas actuales (Puerta Revolucion).</td></tr>";
                }

                echo '</table>';  // Cierra la etiqueta </table> aquí
            ?>
        </div>
    </div>

    <div class="left-block">
    <h2>Visitas Próximas</h2>
    <div class="table-container preview"> <!-- Asegúrate de que la clase table-container se aplique aquí -->
        <?php
            echo '<table>
                    <caption>De: ' . $horaDespues5 . ' a ' . $horaDespues . '</caption>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Marca de vehiculo</th>
                        <th>Placa de vehiculo</th>
                        <th>Color de vehiculo</th>
                        <th>Hora</th>
                        <th>Modulo</th>
                        <th>Dia Entrada</th>
                        <th>Puerta Entrada</th>
                    </tr>';

            if ($resultPreview->num_rows > 0) {
                while($row = $resultPreview->fetch_assoc()) {
                    echo '<tr>
                            <td>' . $row["nombre"] . '</td>
                            <td>' . $row["apellido"] . '</td>
                            <td>' . $row["marcaCarro"] . '</td>
                            <td>' . $row["placasCarro"] . '</td>
                            <td>' . $row["colorCarro"] . '</td>
                            <td>' . $row["horaEntrada"] . '</td>
                            <td>' . $row["moduloVisita"] . '</td>
                            <td>' . $row["diaEntrada"] . '</td>
                            <td>' . $row["puertaEntrada"] . '</td>
                          </tr>';
                }
            } else {
                echo '<tr><td colspan="9">No hay visitas programadas para este periodo (Puerta Revolucion).</td></tr>';
            }

            echo '</table>';
        ?>
    </div>
    <!-- Contenido del bloque de Visitas Próximas -->
</div>
    
    <div class="right-block">
        <h2>Visitas Pasadas</h2>
        <div class="post">
            <?php
            echo '<table>
                    <caption>De: ' . $horaAntes . ' a ' . $horaAntes5 . '</caption>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Marca de vehiculo</th>
                        <th>Placa de vehiculo</th>
                        <th>Color de vehiculo</th>
                        <th>Hora</th>
                        <th>Modulo</th>
                        <th>Dia Entrada</th>
                        <th>Puerta Entrada</th>
                    </tr>';

            if ($resultPost->num_rows > 0) {
                while ($row = $resultPost->fetch_assoc()) {
                    echo '<tr>
                            <td>' . $row["nombre"] . '</td>
                            <td>' . $row["apellido"] . '</td>
                            <td>' . $row["marcaCarro"] . '</td>
                            <td>' . $row["placasCarro"] . '</td>
                            <td>' . $row["colorCarro"] . '</td>
                            <td>' . $row["horaEntrada"] . '</td>
                            <td>' . $row["moduloVisita"] . '</td>
                            <td>' . $row["diaEntrada"] . '</td>
                            <td>' . $row["puertaEntrada"] . '</td>
                          </tr>';
                }
            } else {
                echo '<tr><td colspan="9">No hay visitas pasadas (Puerta Revolucion)</td></tr>';
            }

            echo '</table>';
            ?>
        </div>
        <!-- Contenido del bloque de Visitas Pasadas -->
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