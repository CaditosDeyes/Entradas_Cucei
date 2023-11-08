import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Inicio';
import CrearCita from './CrearCita';
import VerCita from './VerCita';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="CrearCita" component={CrearCita} />
        <Stack.Screen name="VerCita" component={VerCita} />
        {/* Puedes agregar más pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
