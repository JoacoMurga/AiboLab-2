import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PantallaPrincipal from './src/screens/PantallaPrincipal';

// Cliente de TanStack Query: guarda la caché de las peticiones.
// Lo creamos afuera del componente para que no se reinicie en cada render.
const queryClient = new QueryClient();

export default function App() {
  // TanStack Query necesita envolver la app con su Provider.
  // Zustand, en cambio, no necesita nada de esto.
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.pantalla}>
        <StatusBar barStyle="light-content" backgroundColor="#3E484E" />
        <PantallaPrincipal />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F4F6F6',
  },
});
