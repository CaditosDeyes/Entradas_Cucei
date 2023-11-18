import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default class CrearCita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            marcaCarro: '',
            placasCarro: '',
            colorCarro: '',
            horaEntrada: this.generarOpcionesDeHora(),  // Opciones de hora
            horaSeleccionada: '07:00',  // Hora inicial seleccionada
            diaEntrada: '',
            puertaEntrada: '',
            moduloVisita: '',
        };
    }

    // Función para generar opciones de hora
    generarOpcionesDeHora = () => {
        const opcionesDeHora = [];
        for (let hora = 7; hora <= 20; hora++) {
            if (hora < 21) {
                opcionesDeHora.push(`${hora.toString().padStart(2, '0')}:00`);
            }
            opcionesDeHora.push(`${hora.toString().padStart(2, '0')}:10`);
            opcionesDeHora.push(`${hora.toString().padStart(2, '0')}:20`);
            opcionesDeHora.push(`${hora.toString().padStart(2, '0')}:30`);
            opcionesDeHora.push(`${hora.toString().padStart(2, '0')}:40`);
            opcionesDeHora.push(`${hora.toString().padStart(2, '0')}:50`);
        }
        return opcionesDeHora;
    }

    handleNombreChange = (text) => {
        this.setState({ nombre: text });
    }

    handleApellidoChange = (text) => {
        this.setState({ apellido: text });
    }

    handleMarcaCarroChange = (text) => {
        this.setState({ marcaCarro: text });
    }

    handlePlacasCarroChange = (text) => {
        this.setState({ placasCarro: text });
    }

    handleColorCarroChange = (text) => {
        this.setState({ colorCarro: text });
    }

    handleHoraEntradaChange = (hora) => {
        this.setState({ horaSeleccionada: hora });
    }

    handleDiaEntradaChange = (text) => {
        this.setState({ diaEntrada: text });
    }

    handlePuertaEntradaChange = (text) => {
        this.setState({ puertaEntrada: text });
    }

    handleModuloVisitaChange = (text) => {
        this.setState({ moduloVisita: text });
    }

    handleSubmit = async () => {
        const queryParams = new URLSearchParams({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            marcaCarro: this.state.marcaCarro,
            placasCarro: this.state.placasCarro,
            colorCarro: this.state.colorCarro,
            horaEntrada: this.state.horaSeleccionada,
            diaEntrada: this.state.diaEntrada,
            puertaEntrada: this.state.puertaEntrada,
            moduloVisita: this.state.moduloVisita,
        }).toString();

        try {
            const response = await fetch(`https://spousal-probabiliti.000webhostapp.com/datos.php?${queryParams}`);
            const data = await response.text();

            console.log(data);

            if (data === "1") {
                Alert.alert("Cita creada correctamente");
            } else {
                Alert.alert("Error al crear la cita, inténtelo de nuevo");
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error de red, por favor revisa tu conexión.');
        }
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
                        onChangeText={this.handleMarcaCarroChange}
                        value={this.state.marcaCarro}
                    />

                    <Text style={styles.label}>Placas de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handlePlacasCarroChange}
                        value={this.state.placasCarro}
                    />

                    <Text style={styles.label}>Color de Vehiculo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleColorCarroChange}
                        value={this.state.colorCarro}
                    />

                    <Text style={styles.label}>Hora de Visita:</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.horaSeleccionada}
                        onValueChange={(itemValue) => this.handleHoraEntradaChange(itemValue)}
                        mode="dropdown" // Agregado el modo para Android
                    >
                        {this.state.horaEntrada.map((hora, index) => (
                            <Picker.Item key={index} label={hora} value={hora} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Día de Visita:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleDiaEntradaChange}
                        value={this.state.diaEntrada}
                    />

                    <Text style={styles.label}>Puerta:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handlePuertaEntradaChange}
                        value={this.state.puertaEntrada}
                    />

                    <Text style={styles.label}>Módulo Dirigido:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleModuloVisitaChange}
                        value={this.state.moduloVisita}
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
    picker: {
        width: 300,
        height: 40,
        color: 'white',
        backgroundColor: '#1E3264', // Fondo del Picker
        marginBottom: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5, // Añadido para bordes redondeados
    },
    buttonCrearCita: {
        backgroundColor: 'green', // Cambiado a azul
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