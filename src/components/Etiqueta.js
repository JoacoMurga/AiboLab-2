import { StyleSheet, Text, View } from 'react-native';

// Etiqueta de estado. Es el componente más chico del proyecto y lo usamos
// dentro de otros componentes. Recibe por props el texto y el tipo, y el
// tipo define los colores.
export default function Etiqueta({ texto, tipo = 'neutro' }) {
  const colores = coloresPorTipo[tipo] || coloresPorTipo.neutro;

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      <Text style={[styles.texto, { color: colores.texto }]}>{texto}</Text>
    </View>
  );
}

const coloresPorTipo = {
  neutro: { fondo: '#E6EBEC', texto: '#54626A' },
  ok: { fondo: '#DFF0EA', texto: '#1F7A5C' },
  pendiente: { fondo: '#E0F2F2', texto: '#1F7B7B' },
  alerta: { fondo: '#FBE7E3', texto: '#A8443A' },
};

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  texto: {
    // Texto un poco más grande de lo habitual: el público de AIBO son
    // adultos mayores y la accesibilidad visual es un requisito del proyecto.
    fontSize: 14,
    fontWeight: '600',
  },
});
