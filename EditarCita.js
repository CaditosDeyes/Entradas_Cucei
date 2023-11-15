import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default class EliminarCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
        };
    }

    handleNombreChange = (text) => {
        this.setState({ nombre: text });
    }

    handleApellidoChange = (text) => {
        this.setState({ apellido: text });
    }

    handleCancelar = () => {
        this.props.navigation.goBack();
    } 

    buscarCita = async () => {
        const { nombre, apellido } = this.state;

        if (!nombre || !apellido) {
            Alert.alert('Por favor, ingresa el nombre y apellido.');
            return;
        }

        try {
            const queryParams = new URLSearchParams({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
            }).toString();

            const response = await fetch(`https://spousal-probabiliti.000webhostapp.com/buscar.php?${queryParams}`);
            const data = await response.json(); // Cambiado a response.json()

            if (data && data.nombre && data.apellido) {
                // Se encontró la cita, mostrar la información
                Alert.alert(
                    'Cita encontrada',
                    `Nombre: ${data.nombre}\nApellido: ${data.apellido}\nMarca de Vehiculo: ${data.marcaCarro}\nPlacas de Vehiculo: ${data.placasCarro}\nColor de Vehiculo: ${data.colorCarro}\nHora de Visita: ${data.horaEntrada}\nDía de Visita: ${data.diaEntrada}\nPuerta: ${data.puertaEntrada}\nMódulo Dirigido: ${data.moduloVisita}`
                );
            } else {
                Alert.alert('Cita no encontrada.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error de red, por favor revisa tu conexión.');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleNombreChange}
                    value={this.state.nombre}
                />

                <Text style={styles.label}>Apellido:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleApellidoChange}
                    value={this.state.apellido}
                />

                <TouchableOpacity onPress={this.buscarCita} style={styles.buttonBuscar}>
                    <Text style={styles.buttonText}>Buscar Cita</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handleCancelar} style={styles.buttonCancelar}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1E3264',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
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
        color: 'white',
    },
    buttonBuscar: {
        backgroundColor: 'blue', // Cambiado a azul
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
    buttonCancelar: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 5,
    },
});
