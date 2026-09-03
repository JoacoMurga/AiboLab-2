import { Image, StyleSheet, Text, View } from 'react-native';
import Etiqueta from './Etiqueta';

// Tarjeta de un integrante de la red de cuidado.
// La mostramos en un listado horizontal, así que tiene un ancho fijo.
export default function ContactoCuidado({ nombre, rol, foto, disponible }) {
  return (
    <View style={styles.tarjeta}>
      <Image style={styles.foto} source={{ uri: foto }} />
      <Text style={styles.nombre} numberOfLines={2}>
        {nombre}
      </Text>
      <Text style={styles.rol}>{rol}</Text>

      <View style={styles.etiqueta}>
        <Etiqueta
          texto={disponible ? 'Disponible' : 'No disponible'}
          tipo={disponible ? 'ok' : 'neutro'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E7E8',
  },
  foto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6EBEC',
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2B3438',
    marginTop: 10,
    textAlign: 'center',
  },
  rol: {
    fontSize: 13,
    color: '#6B787E',
    marginTop: 2,
    textAlign: 'center',
  },
  etiqueta: {
    marginTop: 10,
  },
});
