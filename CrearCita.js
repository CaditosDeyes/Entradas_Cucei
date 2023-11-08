import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            correo: '',
        };
    }

    handleNombreChange = (text) => {
        this.setState({ nombre: text });
    }

    handleCorreoChange = (text) => {
        this.setState({ correo: text });
    }

    handleSubmit = () => {
        // Aquí puedes procesar los datos del formulario, por ejemplo, enviarlos a un servidor o realizar alguna acción específica
        // Por ahora, simplemente mostraremos los datos en la consola
        console.log('Nombre:', this.state.nombre);
        console.log('Correo:', this.state.correo);
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

                <Text style={styles.label}>Correo Electrónico:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleCorreoChange}
                    value={this.state.correo}
                />

                <Button title="Enviar" onPress={this.handleSubmit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        width: 250,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
