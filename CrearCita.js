import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            marcaVehiculo: '',
            placasVehiculo: '',
            colorVehiculo: '',
            horaVisita: '',
            diaVisita: '',
            puerta: '',
            moduloDirigido: '',
        };
    }

    handleNombreChange = (text) => {
        this.setState({ nombre: text });
    }

    handleApellidoChange = (text) => {
        this.setState({ apellido: text });
    }

    handleMarcaVehiculoChange = (text) => {
        this.setState({ marcaVehiculo: text });
    }

    handlePlacasVehiculoChange = (text) => {
        this.setState({ placasVehiculo: text });
    }

    handleColorVehiculoChange = (text) => {
        this.setState({ colorVehiculo: text });
    }

    handleHoraVisitaChange = (text) => {
        this.setState({ horaVisita: text });
    }

    handleDiaVisitaChange = (text) => {
        this.setState({ diaVisita: text });
    }

    handlePuertaChange = (text) => {
        this.setState({ puerta: text });
    }

    handleModuloDirigidoChange = (text) => {
        this.setState({ moduloDirigido: text });
    }

    handleSubmit = () => {
        // Aquí puedes procesar los datos del formulario, por ejemplo, enviarlos a un servidor o realizar alguna acción específica
        // Por ahora, simplemente mostraremos los datos en la consola
        console.log('Nombre:', this.state.nombre);
        console.log('Apellido:', this.state.apellido);
        console.log('Marca de Vehiculo:', this.state.marcaVehiculo);
        console.log('Placas de Vehiculo:', this.state.placasVehiculo);
        console.log('Color de Vehiculo:', this.state.colorVehiculo);
        console.log('Hora de Visita:', this.state.horaVisita);
        console.log('Día de Visita:', this.state.diaVisita);
        console.log('Puerta:', this.state.puerta);
        console.log('Módulo Dirigido:', this.state.moduloDirigido);
    }

    handleCancelar = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

                    <Text style={styles.label}>Marca de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleMarcaVehiculoChange}
                        value={this.state.marcaVehiculo}
                    />

                    <Text style={styles.label}>Placas de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handlePlacasVehiculoChange}
                        value={this.state.placasVehiculo}
                    />

                    <Text style={styles.label}>Color de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleColorVehiculoChange}
                        value={this.state.colorVehiculo}
                    />

                    <Text style={styles.label}>Hora de Visita:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleHoraVisitaChange}
                        value={this.state.horaVisita}
                    />

                    <Text style={styles.label}>Día de Visita:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleDiaVisitaChange}
                        value={this.state.diaVisita}
                    />

                    <Text style={styles.label}>Puerta:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handlePuertaChange}
                        value={this.state.puerta}
                    />

                    <Text style={styles.label}>Módulo Dirigido:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleModuloDirigidoChange}
                        value={this.state.moduloDirigido}
                    />

                    <TouchableOpacity onPress={this.handleSubmit} style={styles.buttonCrearCita}>
                        <Text style={styles.buttonText}>Crear Cita</Text>
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
    buttonCrearCita: {
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
