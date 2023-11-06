import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from 'react-native';

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
        this.setState({modalVentanaCrearCuenta:false});
        //codigo para enviar y recibir datos del server
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
                if(xhttp.responseText === "1"){
                    Alert.alert("Cuenta creada correctamente");
                }else{
                    Alert.alert("Error, intentelo de nuevo");
                }
            }
        };
        xhttp.open("GET", "https://spousal-probabiliti.000webhostapp.com/datos.php?nombre="+this.state.nombre+"&correo="+this.state.correo+"&password="+this.state.password, true);
        xhttp.send();
        }

        const iniciarSesion = () => {
            this.setState({ modalVentanaIniciarSesion: true });
        }

        const cierraModalVentanaIniciarSesion = () => {
        this.setState({modalVentanaIniciarSesion:false});
        //codigo para enviar y recibir datos del server
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
                if(xhttp.responseText === "1"){
                    Alert.alert("Sesión Iniciada Correctamente");
                }else{
                    Alert.alert("Error, intentelo de nuevo");
                }
            }
        };
        xhttp.open("GET", "https://spousal-probabiliti.000webhostapp.com/datos.php?nombre="+this.state.nombre+"&correo="+this.state.correo+"&password="+this.state.password, true);
        xhttp.send();
        }

        return (
            <View>
                <Image
                    style={styles.logoCUCEI}
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
                    marginLeft: 50,
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
                    marginLeft: 50,
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
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 20,
                            color: "white",
                        }}>Nombre:</Text>
                        <TextInput
                            style={styles.textInputCrearCuenta}
                            onChangeText={nombre => this.setState({ nombre })}>
                        </TextInput>

                        <Text style={{
                            fontSize: 20,
                            marginLeft: 20,
                            color: "white",
                        }}>Correo:</Text>
                        <TextInput
                            style={styles.textInputCrearCuenta}
                            onChangeText={correo => this.setState({ correo })}>
                        </TextInput>

                        <Text style={{
                            fontSize: 20,
                            marginLeft: 20,
                            color: "white",
                        }}>Password:</Text>
                        <TextInput
                            style={styles.textInputCrearCuenta}
                            onChangeText={password => this.setState({ password })}>
                        </TextInput>
                        <TouchableOpacity style={{
                            borderWidth: 2,
                            width: 200,
                            height: 50,
                            marginLeft: 60,
                            borderRadius: 40,
                        }} onPress={cierraModalCrearCuenta}>
                            <Text style={{
                                fontSize: 20,
                                textAlign: "center",
                                marginTop: 10,
                                color: "white",
                            }}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.modalVentanaIniciarSesion}
                    animationType="slide"
                >
                    <View style={{
                        borderWidth: 2,
                        width: 300,
                        height: 300,
                        marginLeft: 55,
                        marginTop: 300,
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
                            onChangeText={nombre => this.setState({ nombre })} >
                        </TextInput>

                        <Text style={{
                            fontSize: 20,
                            marginLeft: 20,
                            color: "black",
                        }}>Correo:</Text>
                        <TextInput
                            style={styles.textInputIniciarSesion}
                            onChangeText={correo => this.setState({ correo })}>
                        </TextInput>

                        <Text style={{
                            fontSize: 20,
                            marginLeft: 20,
                            color: "black",
                        }}>Password:</Text>
                        <TextInput
                            style={styles.textInputIniciarSesion}
                            onChangeText={password => this.setState({ password })} >
                        </TextInput>
                        <TouchableOpacity style={{
                            borderWidth: 2,
                            width: 200,
                            height: 50,
                            marginLeft: 60,
                            borderRadius: 40,
                        }} onPress={cierraModalVentanaIniciarSesion}>
                            <Text style={{
                                fontSize: 20,
                                textAlign: "center",
                                marginTop: 10,
                                color: "black",
                            }}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoCUCEI: {
        width: 275,
        height: 390,
        marginTop: 0,
        marginLeft: 32,
    },
    textInputCrearCuenta: {
        color: 'white',
    },
    textInputIniciarSesion: {
        color: 'white',
    },
});
