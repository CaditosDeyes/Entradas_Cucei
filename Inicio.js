import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class Inicio extends Component {
    constructor(props) {
        super(props);
    }

    ir_a_crear_cita = () => {
        console.log("Presionaste el botón 'Crear Cita'");
        this.props.navigation.navigate('CrearCita');
    }

    ir_a_editar_cita = () => {
        console.log("Presionaste el botón 'EditarCita'");
        this.props.navigation.navigate('EditarCita');
    }

    ir_a_eliminar_cita = () => {
        console.log("Presionaste el botón 'EliminarCita'");
        this.props.navigation.navigate('EliminarCita');
    }

    render() {
        return (
            <View>
                <Image
                    style={{
                        width: windowWidth,
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
                    marginTop: 10,
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
                    marginTop: 12,
                }} onPress={this.ir_a_editar_cita}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 10,
                        color: "black",
                    }}>Editar Cita</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 250,
                    height: 50,
                    backgroundColor: "red",
                    borderRadius: 40,
                    marginLeft: 80,
                    marginTop: 12,
                }} onPress={this.ir_a_eliminar_cita}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 10,
                        color: "white",
                    }}>Eliminar Cita</Text>
                </TouchableOpacity>
            </View>
        );
    }
}