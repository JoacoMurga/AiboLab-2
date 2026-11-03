import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Cliente de TanStack Query
// staleTime de 5 min para que el detalle use la cache y no vuelva a pedir la agenda
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

// Layout general (reemplaza al App.js). Stack: agenda -> detalle
export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      {/* sin header, cada pantalla tiene el suyo */}
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F4F6F6' } }} />
    </QueryClientProvider>
  );
}
