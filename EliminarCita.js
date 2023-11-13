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

    buscarYEliminarCita = async () => {
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

            const response = await fetch(`https://spousal-probabiliti.000webhostapp.com/buscar_cita.php?${queryParams}`);
            const data = await response.text();

            if (data === '1') {
                // Se encontró la cita, preguntar si se desea eliminar
                Alert.alert(
                    'Confirmar',
                    '¿Deseas eliminar esta cita?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Eliminar',
                            onPress: () => this.eliminarCita(),
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert('Cita no encontrada.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error de red, por favor revisa tu conexión.');
        }
    }

    eliminarCita = async () => {
        const { nombre, apellido } = this.state;

        try {
            const queryParams = new URLSearchParams({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
            }).toString();

            const response = await fetch(`https://spousal-probabiliti.000webhostapp.com/eliminar_cita.php?${queryParams}`);
            const data = await response.text();

            if (data === '1') {
                Alert.alert('Cita eliminada correctamente.');
            } else {
                Alert.alert('Error al eliminar la cita.');
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

                <TouchableOpacity onPress={this.buscarYEliminarCita} style={styles.buttonEliminar}>
                    <Text style={styles.buttonText}>Buscar y Eliminar Cita</Text>
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
    buttonEliminar: {
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
