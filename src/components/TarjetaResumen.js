import { StyleSheet, Text, View } from 'react-native';

// Tarjeta chica con un número y su etiqueta.
// La usamos tres veces en la pantalla principal cambiando solo las props.
export default function TarjetaResumen({ valor, etiqueta, acento = false }) {
  return (
    <View style={styles.contenedor}>
      <Text style={[styles.valor, acento && styles.valorAcento]}>{valor}</Text>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E7E8',
  },
  valor: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3E484E',
  },
  valorAcento: {
    color: '#2A9D9D',
  },
  etiqueta: {
    fontSize: 14,
    color: '#6B787E',
    marginTop: 4,
    textAlign: 'center',
  },
});
