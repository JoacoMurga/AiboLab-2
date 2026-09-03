import { Image, StyleSheet, Text, View } from 'react-native';

// Encabezado de la pantalla principal.
// La marca queda fija porque es la identidad de la app, pero el saludo,
// la fecha y la foto llegan por props.
export default function Encabezado({ nombre, fecha, foto }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.marca}>
        <Text style={styles.marcaTexto}>AIBO</Text>
        <View style={styles.punto} />
        <Text style={styles.lema}>Tu red de cuidado</Text>
      </View>

      <View style={styles.fila}>
        <Image style={styles.foto} source={{ uri: foto }} />
        <View style={styles.saludoBloque}>
          <Text style={styles.saludo}>Hola, {nombre}</Text>
          <Text style={styles.fecha}>{fecha}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#3E484E',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marcaTexto: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 4,
  },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A9D9D',
    marginHorizontal: 10,
  },
  lema: {
    color: '#A7B4B9',
    fontSize: 13,
    letterSpacing: 1,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4E585E',
  },
  saludoBloque: {
    marginLeft: 14,
    flex: 1,
  },
  saludo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  fecha: {
    color: '#A7B4B9',
    fontSize: 15,
    marginTop: 2,
  },
});
