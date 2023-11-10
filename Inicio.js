import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions, Modal, TextInput, Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            nombre: '',
            apellido: '',
            showEditarModal: false,
            citaData: {}, // Inicializado como un objeto vacío
        };
    }

    ir_a_crear_cita = () => {
        console.log("Presionaste el botón 'Crear Cita'");
        this.props.navigation.navigate('CrearCita');
    }

    ir_a_editar_cita = () => {
        console.log("Presionaste el botón 'EditarCita'");
        this.setState({ showEditarModal: true });
    }

    ir_a_eliminar_cita = () => {
        console.log("Presionaste el botón 'EliminarCita'");
        this.setState({ showModal: true });
    }

    handleAceptarModal = () => {
        this.setState({ showModal: false });

        // Si hay datos de la cita, navega a la pantalla EditarCita
        if (this.state.citaData) {
            this.props.navigation.navigate('EditarCita', {
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                citaData: this.state.citaData, // Pasa los datos de la cita
            });
        }
    }

    handleCancelarModal = () => {
        this.setState({ showModal: false });
    }

    handleNombreCitaChange = (text) => {
        this.setState({ nombre: text });
    }

    handleApellidoCitaChange = (text) => {
        this.setState({ apellido: text });
    }

    buscarCitaYEditar = () => {
        const { nombre, apellido } = this.state;

        fetch(`https://spousal-probabiliti.000webhostapp.com/editar.php?nombre=${nombre}&apellido=${apellido}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.errorCode === 1) {
                    // Datos de la cita encontrada
                    this.setState({ citaData: data });
                    this.handleAceptarEditarModal(); // Llama a la función para mostrar los detalles o editar la cita
                } else if (data && data.errorCode === 3) {
                    // Cita no encontrada
                    console.log('Cita no encontrada');
                    Alert.alert('Cita no encontrada', 'La cita con el nombre y apellido proporcionados no fue encontrada.');
                } else {
                    // Manejar otros casos de respuesta del servidor si es necesario
                    console.log('Respuesta inesperada del servidor');
                    Alert.alert('Error', 'Error al buscar la cita. Por favor, inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                Alert.alert('Error', 'Error al buscar la cita. Por favor, inténtalo de nuevo.');
            });
    }

    handleAceptarEditarModal = () => {
        this.setState({ showEditarModal: false });
        this.buscarCitaYEditar();
    }

    handleCancelarEditarModal = () => {
        this.setState({ showEditarModal: false });
    }

    handleNombreEditarChange = (text) => {
        this.setState({ nombre: text });
    }

    handleApellidoEditarChange = (text) => {
        this.setState({ apellido: text });
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

                {/* Modal para editar la cita */}
                <Modal
                    visible={this.state.showEditarModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text>Ingresa el nombre y apellido para buscar la cita:</Text>
                            <TextInput
                                placeholder="Nombre"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                                onChangeText={this.handleNombreEditarChange}
                            />
                            <TextInput
                                placeholder="Apellido"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                                onChangeText={this.handleApellidoEditarChange}
                            />
                            <TouchableOpacity onPress={this.buscarCitaYEditar} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ color: 'white' }}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleCancelarEditarModal} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal para eliminar la cita */}
                <Modal
                    visible={this.state.showModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text>Ingresa el nombre y apellido registrado en la cita:</Text>
                            <TextInput
                                placeholder="Nombre"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                                onChangeText={this.handleNombreCitaChange}
                            />
                            <TextInput
                                placeholder="Apellido"
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                                onChangeText={this.handleApellidoCitaChange}
                            />
                            <TouchableOpacity onPress={this.handleAceptarModal} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ color: 'white' }}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleCancelarModal} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
