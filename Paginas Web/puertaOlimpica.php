<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puerta Olimpica</title>
    <style>
        /* Estilos generales del cuerpo del documento */
        body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            background-color: #B9C6CA;
            color: #333;
        }

        /* Estilos para la primera sección */
        section.header {
            background-color: #4485FF;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .time {
            display: flex;
            justify-content: space-between;
        }

        .titlePuerta {
            font-size: 2em;
            font-weight: 600;
            color: #000000;
        }

        #fechaHora {
            font-size: 2em;
            font-weight: bold;
            color: #000000;
        }

        /* Estilos para la sección de "Visita Actual" */
        section.current {
            background-color: #0D51E1;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        h2.current {
            margin-bottom: 10px;
            text-align: center;
            font-size: 1.5em;
            font-weight: 600;
            color: white;
        }

        .container.current {
            border: 1px solid #ddd;
            margin: 10px;
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            color: #333;
        }

        /* Estilos para la sección de "Visitas Próximas" */
        section.upcoming {
            background-color: #92FFA9;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            overflow-x: hidden; /* Evita el desplazamiento horizontal */
        }

        h2.upcoming {
            margin-bottom: 10px;
            text-align: center;
            font-size: 1.5em;
            font-weight: 600;
            color: white;
        }

        .container.upcoming {
            border: 1px solid #ddd;
            margin: 10px auto; /* Centra el contenido horizontalmente */
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            color: #333;
        }

        /* Estilos para la sección de "Visitas Pasadas" */
        section.past {
            background-color: #FF7474;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            overflow-x: hidden; /* Evita el desplazamiento horizontal */
        }

        h2.past {
            margin-bottom: 10px;
            text-align: center;
            font-size: 1.5em;
            font-weight: 600;
            color: #333;
        }

        .container.past {
            border: 1px solid #ddd;
            margin: 10px auto; /* Centra el contenido horizontalmente */
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            color: #333;
        }

        /* Estilos específicos para las tablas */
        table {
            border-collapse: collapse;
            border: 2px solid rgb(200, 200, 200);
            letter-spacing: 1px;
            font-size: 0.8rem;
            width: 100%;
            margin-top: 10px;
            color: #000000;
        }

        th,
        td {
            border: 1px solid rgb(190, 190, 190);
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: rgb(235, 235, 235);
            font-size: 1em;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: rgb(250, 250, 250);
        }

        tr:nth-child(odd) {
            background-color: rgb(245, 245, 245);
        }

        /* Estilo adicional para el pie de tabla (caption) */
        caption {
            padding: 10px;
            color: #FFF;
            font-weight: bold;
        }

        /* Estilos para resaltar las celdas de la tabla actual */
        .current td {
            background-color: #74FFF9;
            color: black;
        }

        /* Estilos para resaltar las celdas de las tablas de visitas próximas y pasadas */
        .container.upcoming th {
            background-color: #FFF;
            color: #333;
        }

        .container.upcoming td {
            background-color: #74FFF9;
            color: black;
        }

        .container.past th {
            background-color: #FFF;
            color: #333;
        }

        .container.past td {
            background-color: #74FFF9;
            color: black;
        }

        .upcoming,
        .past {
            width: 100%;
            text-align: center;
        }

        .container.upcoming,
        .container.past {
            width: 100%;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <!-- Primera sección -->
    <section class="header">
        <div class="time">
            <div class="titlePuerta">Puerta Olimpica</div>
            <div id="fechaHora"></div>
        </div>
    </section>
    <?php
        date_default_timezone_set('America/Mexico_City');
        // Datos de conexión
        $server = "localhost";
        $user = "id21510609_admin";
        $password = "#Admin1234";
        $bd = "id21510609_datos";

        // Crear conexión
        $cone = new mysqli($server, $user, $password, $bd);
        
        // Obtiene la hora actual en formato "H:i"
        $horaActual = date("H:i");
        
        // 15 minutos antes de la hora actual
        $horaAntes = date("H:i", strtotime("-15 minutes", strtotime($horaActual)));
        // 5 minutos antes
        $horaAntes5 = date("H:i", strtotime("-4 minutes", strtotime($horaActual)));
        // 15 minutos despues de la hora actual
        $horaDespues = date("H:i", strtotime("+15 minutes", strtotime($horaActual)));
        // 5 minutos despues
        $horaDespues5 = date("H:i", strtotime("+4 minutes", strtotime($horaActual)));
        
        //echo "Hola eliminar < " . $horaAntes . "<br>";
        // DELETE
        $sqlEliminar = "DELETE FROM DatosP WHERE diaEntrada != CURDATE() AND TIME(horaEntrada) < '$horaAntes'";
        $cone->query($sqlEliminar);
        
        // Consulta BD para obtener las visitas programadas dentro del rango de tiempo
        $sqlActual = "SELECT * FROM DatosP WHERE diaEntrada = CURDATE() AND TIME(horaEntrada) BETWEEN '$horaAntes5' AND '$horaDespues5' AND puertaEntrada = 'Olimpica' ORDER BY TIME(horaEntrada)";
        //$sqlActual = "SELECT * FROM DatosP WHERE diaEntrada != CURDATE() AND puertaEntrada = 'Olimpica'";
        $resultActual = $cone->query($sqlActual);
        
        $sqlPreview = "SELECT * FROM DatosP WHERE diaEntrada = CURDATE() AND TIME(horaEntrada) BETWEEN '$horaDespues5' AND '$horaDespues' AND puertaEntrada = 'Olimpica' ORDER BY TIME(horaEntrada)";
        $resultPreview = $cone->query($sqlPreview);
        
        $sqlPost = "SELECT * FROM DatosP WHERE diaEntrada = CURDATE() AND TIME(horaEntrada) BETWEEN '$horaAntes' AND '$horaAntes5' AND puertaEntrada = 'Olimpica' ORDER BY TIME(horaEntrada) desc";
        $resultPost = $cone->query($sqlPost);
        
        // Eliminar las visitas que han pasado más de 15 minutos desde su hora de entrada
        $sqlEliminar = "DELETE FROM DatosP WHERE DATE(diaEntrada) = CURDATE() AND TIME(horaEntrada) < '$horaAntes'";
        $cone->query($sqlEliminar);

        // Cierra la conexión
        //$cone->close();
        ?>

    <!-- Segunda sección (Visita Actual) -->
    <section class="current">
        <h2 class="current">Visitas Actuales</h2>
        <table class="current">
            <caption>De: <?php echo $horaAntes5; ?> a <?php echo $horaDespues5; ?></caption>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Marca de Vehiculo</th>
                <th>Placas de Vehiculo</th>
                <th>Color de Vehiculo</th>
                <th>Hora de Visita</th>
                <th>Modulo Dirigido</th>
                <th>Fecha</th>
            </tr>
            <?php
                if ($resultActual->num_rows > 0) {
                    while($row = $resultActual->fetch_assoc()) {
                        echo '<tr>
                                <td>' . $row["nombre"] . '</td>
                                <td>' . $row["apellido"] . '</td>
                                <td>' . $row["marcaCarro"] . '</td>
                                <td>' . $row["placasCarro"] . '</td>
                                <td>' . $row["colorCarro"] . '</td>
                                <td>' . $row["horaEntrada"] . '</td>
                                <td>' . $row["moduloVisita"] . '</td>
                                <td>' . $row["diaEntrada"] . '</td>
                              </tr>';
                    }
                } else {
                    echo '<tr><td colspan="9">No hay visitas (Olimpica).</td></tr>';
                }
            ?>
        </table>
    </section>

    <!-- Tercera sección (Visitas Próximas y Visitas Pasadas) -->
    <section class="upcoming">
        <h2 class="upcoming">Visitas Próximas</h2>
        <table class="container upcoming">
                <caption>De: <?php echo $horaDespues5; ?> a <?php echo $horaDespues; ?></caption>
                <tr>
                    <!-- Encabezados de la tabla -->
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Marca de Vehiculo</th>
                    <th>Placas de Vehiculo</th>
                    <th>Color de Vehiculo</th>
                    <th>Hora de Visita</th>
                    <th>Modulo Dirigido</th>
                    <th>Fecha</th>
                </tr>
                <?php
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
                                </tr>';
                        }
                    } else {
                        echo '<tr><td colspan="9">No hay visitas Preview (Olimpica)</td></tr>';
                    }
                ?>
            </table>
    </section>

    <section class="past">
        <h2 class="past">Visitas Pasadas</h2>
        <table class="container past">
                <caption>De: <?php echo $horaAntes; ?> a <?php echo $horaAntes5; ?></caption>
                <tr>
                    <!-- Encabezados de la tabla -->
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Marca de Vehiculo</th>
                    <th>Placas de Vehiculo</th>
                    <th>Color de Vehiculo</th>
                    <th>Hora de Visita</th>
                    <th>Modulo Dirigido</th>
                    <th>Fecha</th>
                </tr>
                <?php
                    if ($resultPost->num_rows > 0) {
                        while($row = $resultPost->fetch_assoc()) {
                            echo '<tr>
                                    <td>' . $row["nombre"] . '</td>
                                    <td>' . $row["apellido"] . '</td>
                                    <td>' . $row["marcaCarro"] . '</td>
                                    <td>' . $row["placasCarro"] . '</td>
                                    <td>' . $row["colorCarro"] . '</td>
                                    <td>' . $row["horaEntrada"] . '</td>
                                    <td>' . $row["moduloVisita"] . '</td>
                                    <td>' . $row["diaEntrada"] . '</td>
                                  </tr>';
                        }
                    } else {
                        echo '<tr><td colspan="9">No hay visitas POST (Olimpica)</td></tr>';
                    }
                    
                ?>
            </table>
    </section>

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