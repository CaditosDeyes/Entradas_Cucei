import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Inscripcion';

const App = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 0,
    //justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
