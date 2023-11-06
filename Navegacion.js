import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inscripcion from './Inscripcion';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inscripcion">
        <Stack.Screen name="Inscripcion" component={Inscripcion} />
        {/* Puedes agregar más pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
