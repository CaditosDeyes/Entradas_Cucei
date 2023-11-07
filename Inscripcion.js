import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, Image, StyleSheet, Dimensions, Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
            // Código para enviar y recibir datos del servidor
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Acción típica a realizar cuando el documento está listo
                    console.log(xhttp.responseText);
                    if (xhttp.responseText === "1") {
                        Alert.alert("Cuenta creada correctamente");
                    } else {
                        Alert.alert("Error, inténtelo de nuevo");
                    }
                }
            };
            xhttp.open("GET", "https://spousal-probabiliti.000webhostapp.com/datos.php?nombre=" + this.state.nombre + "&correo=" + this.state.correo + "&password=" + this.state.password, true);
            xhttp.send();
        }

        const cancelarModalCrearCuenta = () => {
            this.setState({ modalVentanaCrearCuenta: false });
        }

        const iniciarSesion = () => {
            this.setState({ modalVentanaIniciarSesion: true });
        }

        const cierraModalVentanaIniciarSesion = () => {
            this.setState({ modalVentanaIniciarSesion: false });
            // Código para enviar y recibir datos del servidor
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Acción típica a realizar cuando el documento está listo
                    console.log(xhttp.responseText);
                    if (xhttp.responseText === "1") {
                        Alert.alert("Sesión Iniciada Correctamente");
                    } else {
                        Alert.alert("Error, inténtelo de nuevo");
                    }
                }
            };
            xhttp.open("GET", "https://spousal-probabiliti.000webhostapp.com/datos.php?nombre=" + this.state.nombre + "&correo=" + this.state.correo + "&password=" + this.state.password, true);
            xhttp.send();
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
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: 300,
                            height: 300,
                            backgroundColor: "blue",
                            borderRadius: 40,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 20,
                                color: "white",
                            }}>Nombre:</Text>
                            <TextInput
                                style={styles.textInputCrearCuenta}
                                onChangeText={nombre => this.setState({ nombre })}
                                underlineColorAndroid="white" // Resalta el borde del campo de entrada
                            />
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 20,
                                color: "white",
                            }}>Correo:</Text>
                            <TextInput
                                style={styles.textInputCrearCuenta}
                                onChangeText={correo => this.setState({ correo })}
                                underlineColorAndroid="white" // Resalta el borde del campo de entrada
                            />
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 20,
                                color: "white",
                            }}>Password:</Text>
                            <TextInput
                                style={styles.textInputCrearCuenta}
                                onChangeText={password => this.setState({ password })}
                                secureTextEntry={true}
                                underlineColorAndroid="white" // Resalta el borde del campo de entrada
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 10,
                            }}>
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 50,
                                    borderRadius: 40,
                                    backgroundColor: 'white',
                                }} onPress={cancelarModalCrearCuenta}>
                                    <Text style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        marginTop: 10,
                                        color: "blue",
                                    }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 50,
                                    borderRadius: 40,
                                    backgroundColor: 'white',
                                }} onPress={cierraModalCrearCuenta}>
                                    <Text style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        marginTop: 10,
                                        color: "blue",
                                    }}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.modalVentanaIniciarSesion}
                    animationType="slide"
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: 300,
                            height: 300,
                            backgroundColor: "yellow",
                            borderRadius: 40,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 20,
                                color: "black",
                            }}>Nombre:</Text>
                            <TextInput
                                style={styles.textInputIniciarSesion}
                                onChangeText={nombre => this.setState({ nombre })}
                                underlineColorAndroid="black" // Resalta el borde del campo de entrada
                            />
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 20,
                                color: "black",
                            }}>Correo:</Text>
                            <TextInput
                                style={styles.textInputIniciarSesion}
                                onChangeText={correo => this.setState({ correo })}
                                underlineColorAndroid="black" // Resalta el borde del campo de entrada
                            />
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 20,
                                color: "black",
                            }}>Password:</Text>
                            <TextInput
                                style={styles.textInputIniciarSesion}
                                onChangeText={password => this.setState({ password })}
                                secureTextEntry={true}
                                underlineColorAndroid="black" // Resalta el borde del campo de entrada
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 10,
                            }}>
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 50,
                                    borderRadius: 40,
                                    backgroundColor: 'white',
                                }} onPress={cancelarModalIniciarSesion}>
                                    <Text style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        marginTop: 10,
                                        color: "blue",
                                    }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 50,
                                    borderRadius: 40,
                                    backgroundColor: 'white',
                                }} onPress={cierraModalVentanaIniciarSesion}>
                                    <Text style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        marginTop: 10,
                                        color: "blue",
                                    }}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoCUCEI: {
        width: windowWidth,
        height: 390,
        marginTop: 0,
        marginLeft: 0,
    },
    textInputCrearCuenta: {
        color: 'white',
    },
    textInputIniciarSesion: {
        color: 'black',
    },
});
