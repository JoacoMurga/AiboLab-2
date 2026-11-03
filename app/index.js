import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import PantallaPrincipal from '../src/screens/PantallaPrincipal';

// Pantalla de inicio (agenda)
export default function Inicio() {
  return (
    <SafeAreaView style={styles.pantalla}>
      <PantallaPrincipal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F4F6F6',
  },
});
