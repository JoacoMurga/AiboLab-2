import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFiltroStore } from '../store/useFiltroStore';

// Opciones del filtro. La clave coincide con el campo "tipo" de la agenda.
const opciones = [
  { clave: 'todos', texto: 'Todo' },
  { clave: 'medicacion', texto: 'Medicación' },
  { clave: 'tarea', texto: 'Tareas' },
  { clave: 'actividad', texto: 'Actividades' },
];

// Botones para filtrar la agenda por tipo.
// No recibe props: lee y cambia el filtro directamente en el store de Zustand.
export default function FiltroTipo() {
  // Tomamos solo lo que usamos, así el componente se vuelve a dibujar
  // únicamente cuando cambia este valor.
  const tipoSeleccionado = useFiltroStore((estado) => estado.tipoSeleccionado);
  const cambiarTipo = useFiltroStore((estado) => estado.cambiarTipo);

  return (
    <View style={styles.fila}>
      {opciones.map((opcion) => {
        const activo = opcion.clave === tipoSeleccionado;

        return (
          <Pressable
            key={opcion.clave}
            onPress={() => cambiarTipo(opcion.clave)}
            accessibilityRole="button"
            accessibilityState={{ selected: activo }}
            style={[styles.boton, activo && styles.botonActivo]}
          >
            {/* El tilde indica cuál está elegido sin depender solo del color. */}
            <Text style={[styles.texto, activo && styles.textoActivo]}>
              {activo ? '✓ ' : ''}
              {opcion.texto}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  boton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C9D4D8',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginBottom: 8,
  },
  botonActivo: {
    borderColor: '#1F7B7B',
    backgroundColor: '#1F7B7B',
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E484E',
  },
  textoActivo: {
    color: '#FFFFFF',
  },
});
