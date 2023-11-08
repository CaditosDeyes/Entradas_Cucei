import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Inicio extends Component {
    constructor(props) {
        super(props);
    }

    ir_a_crear_cita = () => {
        this.props.navigation.navigate('CrearCita');
    }

    ir_a_ver_cita = () => {
        this.props.navigation.navigate('VerCita');
    }

    render() {
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
                }} onPress={this.ir_a_crear_cita}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 10,
                        color: "white",
                    }}>Crear Cita</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 250,
                    height: 50,
                    backgroundColor: "yellow",
                    borderRadius: 40,
                    marginLeft: 80,
                    marginTop: 20,
                }} onPress={this.ir_a_ver_cita}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 10,
                        color: "black",
                    }}>Ver Cita</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
