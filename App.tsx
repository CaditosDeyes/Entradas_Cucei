import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import MainStack from './MainStack';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Puedes ajustar el color de fondo según tus preferencias
  },
});

export default App;
