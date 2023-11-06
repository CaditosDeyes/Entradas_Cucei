import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class Inscripcion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVentanaCrearCuenta: false,
            modalVentanaIniciarSesion: false,
            nombre: '',
            correo: '',
            password: '',
        };
    }

    render() {
        const crearCuenta = () => {
            this.setState({ modalVentanaCrearCuenta: true });
        }

        const cierraModalCrearCuenta = () => {
            this.setState({ modalVentanaCrearCuenta: false });
        }

        const cancelarModalCrearCuenta = () => {
            this.setState({ modalVentanaCrearCuenta: false });
        }

        const iniciarSesion = () => {
            this.setState({ modalVentanaIniciarSesion: true });
        }

        const cierraModalVentanaIniciarSesion = () => {
            this.setState({ modalVentanaIniciarSesion: false });
        }

        const cancelarModalIniciarSesion = () => {
            this.setState({ modalVentanaIniciarSesion: false });
        }

        return (
            <View>
                <Image
                    style={{
                        width: windowWidth, // Ajustar el ancho de la imagen
                        height: 390,
                    }}
                    source={require('./img/logo_cucei.jpg')}
                />
                <Text style={{
                    fontSize: 40,
                    textAlign: "center",
                    color: "black",
                }}>Registro De Visitas CUCEI</Text>

                <TouchableOpacity style={{
                    width: 250,
                    height: 50,
                    backgroundColor: "blue",
                    borderRadius: 40,
                    marginLeft: 80,
                    marginTop: 20,
                }} onPress={crearCuenta}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 10,
                        color: "white",
                    }}>Crear Cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 250,
                    height: 50,
                    backgroundColor: "yellow",
                    borderRadius: 40,
                    marginLeft: 80,
                    marginTop: 20,
                }} onPress={iniciarSesion}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 10,
                        color: "black",
                    }}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={this.state.modalVentanaCrearCuenta}
                    animationType="slide"
                >
                    <View style={{
                        borderWidth: 2,
                        width: 300,
                        height: 300,
                        marginLeft: 55,
                        marginTop: 350,
                        backgroundColor: "blue",
                        borderRadius: 40,
                    }}>
                        <Text style={styles.textFormulario}>Nombre:</Text>
                        <TextInput
                            style={styles.textInputCrearCuenta}
                            onChangeText={nombre => this.setState({ nombre })}>
                        </TextInput>

                        <Text style={styles.textFormulario}>Correo:</Text>
                        <TextInput
                            style={styles.textInputCrearCuenta}
                            onChangeText={correo => this.setState({ correo })}>
                        </TextInput>

                        <Text style={styles.textFormulario}>Password:</Text>
                        <TextInput
                            style={styles.textInputCrearCuenta}
                            onChangeText={password => this.setState({ password })}>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelarButton} onPress={cancelarModalCrearCuenta}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.aceptarButton} onPress={cierraModalCrearCuenta}>
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.modalVentanaIniciarSesion}
                    animationType="slide"
                >
                    <View style={{
                        borderWidth: 1,
                        width: 400,
                        height: 300,
                        marginLeft: 5,
                        marginTop: 380,
                        //marginEnd: 200,
                        backgroundColor: "blue",
                        borderRadius: 40,
                    }}>
                        <Text style={styles.textFormulario}>Nombre:</Text>
                        <TextInput
                            style={styles.textInputIniciarSesion}
                            onChangeText={nombre => this.setState({ nombre })} >
                        </TextInput>

                        <Text style={styles.textFormulario}>Correo:</Text>
                        <TextInput
                            style={styles.textInputIniciarSesion}
                            onChangeText={correo => this.setState({ correo })}>
                        </TextInput>

                        <Text style={styles.textFormulario}>Password:</Text>
                        <TextInput
                            style={styles.textInputIniciarSesion}
                            onChangeText={password => this.setState({ password })} >
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelarButton} onPress={cancelarModalIniciarSesion}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.aceptarButton} onPress={cierraModalVentanaIniciarSesion}>
                                <Text style={styles.buttonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoCUCEI: {
        height: 390,
    },
    textInputCrearCuenta: {
        color: 'white',
    },
    textInputIniciarSesion: {
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
    },
    cancelarButton: {
        backgroundColor: 'red',
        width: 120,
        height: 50,
        borderRadius: 40,
        marginTop: -35,
    },
    aceptarButton: {
        backgroundColor: 'blue',
        width: 120,
        height: 50,
        borderRadius: 40,
        marginTop: -35,
    },
    textFormulario:{
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        color: "white",
    },
});
