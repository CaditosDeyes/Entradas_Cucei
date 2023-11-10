import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default class EditarCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            marcaCarro: '',
            placasCarro: '',
            colorCarro: '',
            horaEntrada: '', // Asegúrate de que coincida con el nombre del campo en tu formulario
            diaEntrada: '',
            puertaEntrada: '',
            moduloVisita: '',
        };
    }

    componentDidMount() {
        // Obtén los parámetros de la ruta (nombre y apellido) para cargar la información de la cita
        const { route } = this.props;
        const { nombre, apellido } = route.params;

        // Asigna los valores iniciales a los campos de la cita
        this.setState({
            nombre: nombre,
            apellido: apellido,
        });

        // Llama a la función para buscar la cita y cargar la información
        this.handleBuscarCita();
    }

    handleBuscarCita = () => {
        const { nombre, apellido } = this.state;

        // Lógica para buscar la cita con el nombre y apellido en tu base de datos
        fetch(`https://spousal-probabiliti.000webhostapp.com/editar.php?nombre=${nombre}&apellido=${apellido}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.nombre && data.apellido) {
                    // Actualiza el estado con la cita encontrada
                    this.setState({
                        marcaCarro: data.marcaCarro,
                        placasCarro: data.placasCarro,
                        colorCarro: data.colorCarro,
                        horaEntrada: data.horaEntrada, // Asegúrate de que coincida con el nombre del campo en tu formulario
                        diaEntrada: data.diaEntrada,
                        puertaEntrada: data.puertaEntrada,
                        moduloVisita: data.moduloVisita,
                    });
                } else {
                    // Maneja el caso en el que la cita no fue encontrada
                    console.log('Cita no encontrada');
                    // Puedes mostrar un mensaje al usuario, por ejemplo
                    Alert.alert('Cita no encontrada', 'La cita con el nombre y apellido proporcionados no fue encontrada.');
                }
            })
            .catch(error => {
                // Maneja los errores de la solicitud
                console.error('Error en la solicitud:', error);
                // Puedes mostrar un mensaje de error al usuario, por ejemplo
                Alert.alert('Error', 'Error al buscar la cita. Por favor, inténtalo de nuevo.');
            });
    }


    handleGuardarCambios = () => {
        // Lógica para guardar los cambios en la cita (puedes enviarlos a un servidor, actualizar en la base de datos, etc.)
        const { nombre, apellido, marcaCarro, placasCarro, colorCarro, horaEntrada, diaEntrada, puertaEntrada, moduloVisita } = this.state;
    
        // Realiza la actualización en el servidor
        fetch(`https://spousal-probabiliti.000webhostapp.com/editar.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                marcaCarro: marcaCarro,
                placasCarro: placasCarro,
                colorCarro: colorCarro,
                horaEntrada: horaEntrada,
                diaEntrada: diaEntrada,
                puertaEntrada: puertaEntrada,
                moduloVisita: moduloVisita,
            }),
        })
        .then(response => response.json()) // Cambia a response.json()
        .then(data => {
            // Muestra el resultado de la actualización en un mensaje de alerta
            Alert.alert('Resultado de la Actualización', data.mensaje); // Asegúrate de que la clave sea correcta
    
            // Puedes redirigir a otra pantalla o realizar otras acciones después de la actualización
            // Por ejemplo, regresar a la pantalla principal
            this.props.navigation.navigate('Inicio');
        })
        .catch(error => {
            // Maneja los errores de la solicitud
            console.error('Error en la solicitud:', error);
            // Muestra un mensaje de error al usuario
            Alert.alert('Error', 'Error al actualizar la cita. Por favor, inténtalo de nuevo.');
        });
    }

    handleCancelar = () => {
        // Puedes navegar de regreso a la pantalla de visualización de la cita o realizar otras acciones según tus necesidades
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ nombre: text })}
                        value={this.state.nombre}
                        editable={false} // El nombre no es editable
                    />

                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ apellido: text })}
                        value={this.state.apellido}
                        editable={false} // El apellido no es editable
                    />

                    <Text style={styles.label}>Marca de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ marcaCarro: text })}
                        value={this.state.marcaCarro}
                    />

                    <Text style={styles.label}>Placas de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ placasCarro: text })}
                        value={this.state.placasCarro}
                    />

                    <Text style={styles.label}>Color de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ colorCarro: text })}
                        value={this.state.colorCarro}
                    />

                    <Text style={styles.label}>Hora de Visita:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ horaEntrada: text })}
                        value={this.state.horaEntrada}
                    />

                    <Text style={styles.label}>Día de Visita:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ diaEntrada: text })}
                        value={this.state.diaEntrada}
                    />

                    <Text style={styles.label}>Puerta:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ puertaEntrada: text })}
                        value={this.state.puertaEntrada}
                    />

                    <Text style={styles.label}>Módulo Dirigido:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ moduloVisita: text })}
                        value={this.state.moduloVisita}
                    />

                    <TouchableOpacity onPress={this.handleGuardarCambios} style={styles.buttonGuardar}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleCancelar} style={styles.buttonCancelar}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E3264', // Color de fondo
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white', // Color del texto
    },
    input: {
        width: 300,
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 17,
        color: 'white', // Color del texto
    },
    buttonGuardar: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonCancelar: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});