import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

export default class EliminarCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            citaEncontrada: null,
        };
    }

    handleEliminarCita = () => {
        // Aquí deberías implementar la lógica para eliminar la cita
        // Puedes hacer una solicitud al servidor o realizar cualquier acción necesaria
        // Después de eliminar la cita, puedes navegar a la pantalla anterior o a otra pantalla
        Alert.alert('Cita eliminada correctamente');
        this.props.navigation.goBack(); // Navegar hacia atrás
        // O puedes navegar a otra pantalla después de eliminar la cita
        // this.props.navigation.navigate('OtraPantalla');
    }

    renderCitaEncontrada = () => {
        const { citaEncontrada } = this.state;

        if (citaEncontrada) {
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>Nombre de la Cita:</Text>
                    <Text style={styles.info}>{citaEncontrada.nombre}</Text>

                    <Text style={styles.label}>Apellido de la Cita:</Text>
                    <Text style={styles.info}>{citaEncontrada.apellido}</Text>

                    <Text style={styles.label}>Marca del Vehículo:</Text>
                    <Text style={styles.info}>{citaEncontrada.marcaCarro}</Text>

                    <Text style={styles.label}>Placas del Vehículo:</Text>
                    <Text style={styles.info}>{citaEncontrada.placasCarro}</Text>

                    <Text style={styles.label}>Color del Vehículo:</Text>
                    <Text style={styles.info}>{citaEncontrada.colorCarro}</Text>

                    <Text style={styles.label}>Hora de Entrada:</Text>
                    <Text style={styles.info}>{citaEncontrada.horaEntrada}</Text>

                    <Text style={styles.label}>Día de Entrada:</Text>
                    <Text style={styles.info}>{citaEncontrada.diaEntrada}</Text>

                    <Text style={styles.label}>Puerta de Entrada:</Text>
                    <Text style={styles.info}>{citaEncontrada.puertaEntrada}</Text>

                    <Text style={styles.label}>Módulo de Visita:</Text>
                    <Text style={styles.info}>{citaEncontrada.moduloVisita}</Text>

                    <TouchableOpacity onPress={this.handleEliminarCita} style={styles.buttonEliminar}>
                        <Text style={styles.buttonText}>Eliminar Cita</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ nombre: text })}
                    value={this.state.nombre}
                />

                <Text style={styles.label}>Apellido:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ apellido: text })}
                    value={this.state.apellido}
                />

                {this.renderCitaEncontrada()}
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
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        color: 'black',
    },
    info: {
        fontSize: 18,
        marginBottom: 15,
        color: 'blue',
    },
    input: {
        width: 300,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 17,
        color: 'black',
    },
    buttonEliminar: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});
