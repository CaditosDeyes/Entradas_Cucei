import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default class Editarcita extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            citaEncontrada: null,
            marcaCarro: '',
            placasCarro: '',
            colorCarro: '',
            horaEntrada: this.generarOpcionesDeHora(),
            horaSeleccionada: '07:00',
            diaEntrada: '',
            puertaEntrada: '',
            moduloVisita: '',
        };
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

    handleCancelar = () => {
        this.props.navigation.goBack();
    }

    handleBuscarCita = async () => {
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
            const data = await response.json();

            if (data && data.nombre && data.apellido) {
                this.setState({
                    citaEncontrada: data,
                    marcaCarro: data.marcaCarro || '',
                    placasCarro: data.placasCarro || '',
                    colorCarro: data.colorCarro || '',
                    horaSeleccionada: data.horaEntrada || '07:00',
                    diaEntrada: data.diaEntrada || '',
                    puertaEntrada: data.puertaEntrada || '',
                    moduloVisita: data.moduloVisita || '',
                });
            } else {
                Alert.alert('Cita no encontrada.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error de red, por favor revisa tu conexión.');
        }
    }

    handleGuardarCambios = async () => {
        const { nombre, apellido, citaEncontrada, marcaCarro, placasCarro, colorCarro, horaSeleccionada, diaEntrada, puertaEntrada, moduloVisita } = this.state;
    
        try {
            const response = await fetch('https://spousal-probabiliti.000webhostapp.com/editar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: citaEncontrada.id,
                    nombre,
                    apellido,
                    marcaCarro,
                    placasCarro,
                    colorCarro,
                    horaEntrada: horaSeleccionada,
                    diaEntrada,
                    puertaEntrada,
                    moduloVisita,
                }).toString(),
            });
    
            //console.log('Server Response:', response);
    
            // Verificar el estado de la respuesta
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const data = await response.json();
    
            console.log('Parsed Data:', data);
    
            if (data && data.error) {
                // Mostrar el mensaje de error devuelto por el servidor
                Alert.alert('Error al guardar cambios. ' + data.error);
            } else {
                Alert.alert('Cambios guardados con éxito.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            Alert.alert('Error de red, por favor revisa tu conexión.');
        }
    }
  
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

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
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

                <TouchableOpacity onPress={this.handleBuscarCita} style={styles.buttonBuscar}>
                    <Text style={styles.buttonText}>Buscar Cita</Text>
                </TouchableOpacity>

                {this.state.citaEncontrada && (
                    <>
                        <Text style={styles.citaEncontrada}>
                            Cita encontrada: {this.state.citaEncontrada.nombre} {this.state.citaEncontrada.apellido}
                        </Text>

                        {/* Formulario de edición */}
                        <Text style={styles.label}>Marca de Vehículo:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handleMarcaCarroChange}
                            value={this.state.marcaCarro}
                        />

                        <Text style={styles.label}>Placas de Vehículo:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handlePlacasCarroChange}
                            value={this.state.placasCarro}
                        />

                        <Text style={styles.label}>Color de Vehículo:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handleColorCarroChange}
                            value={this.state.colorCarro}
                        />

                        <Text style={styles.horaEncontrada}>Hora registrada anteriormente: {this.state.citaEncontrada.horaEntrada}</Text>
                        <Text style={styles.label}>Hora de Visita:</Text>
                        <Picker
                            selectedValue={this.state.horaSeleccionada}
                            onValueChange={this.handleHoraEntradaChange}
                            style={styles.picker}
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

                        <TouchableOpacity onPress={this.handleGuardarCambios} style={styles.buttonGuardar}>
                            <Text style={styles.buttonText}>Guardar Cambios</Text>
                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity onPress={this.handleCancelar} style={styles.buttonCancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    picker: {
        width: 300,
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        color: 'white',
    },
    buttonBuscar: {
        backgroundColor: 'blue',
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
    citaEncontrada: {
        fontSize: 18,
        color: 'green',
        marginTop: 10,
    },
    buttonCancelar: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonGuardar: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 5,
    },
    horaEncontrada: {
        fontSize: 18,
        color: 'green',
        marginTop: 10,
    },
});
