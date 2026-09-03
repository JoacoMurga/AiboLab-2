import { Image, StyleSheet, Text, View } from 'react-native';
import Etiqueta from './Etiqueta';

// Este es el componente reutilizable principal del proyecto.
// Representa un punto de la agenda de cuidado del día: una toma de
// medicación, una tarea del cuidador o una actividad.
// Recibe todos los datos por props y adentro usa otro componente
// nuestro (Etiqueta), al que también le pasa props.
export default function RecordatorioCard({
  hora,
  tipo,
  titulo,
  detalle,
  estado,
  responsableNombre,
  responsableFoto,
}) {
  const textoTipo = textosPorTipo[tipo] || 'Recordatorio';
  const estadoMostrado = estados[estado] || estados.pendiente;

  return (
    <View style={styles.tarjeta}>
      <View style={styles.fila}>
        <View style={styles.horaBloque}>
          <Text style={styles.hora}>{hora}</Text>
        </View>

        <View style={styles.cuerpo}>
          <Text style={styles.tipo}>{textoTipo}</Text>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.detalle}>{detalle}</Text>

          <View style={styles.estadoBloque}>
            <Etiqueta texto={estadoMostrado.texto} tipo={estadoMostrado.color} />
          </View>
        </View>
      </View>

      <View style={styles.responsable}>
        <Image style={styles.avatar} source={{ uri: responsableFoto }} />
        <Text style={styles.responsableTexto}>A cargo de {responsableNombre}</Text>
      </View>
    </View>
  );
}

// Traducciones de los valores que vienen en los datos a lo que ve el usuario.
const textosPorTipo = {
  medicacion: 'Medicación',
  tarea: 'Tarea de cuidado',
  actividad: 'Actividad',
};

const estados = {
  confirmada: { texto: 'Confirmada', color: 'ok' },
  pendiente: { texto: 'Pendiente', color: 'pendiente' },
  omitida: { texto: 'Sin confirmar', color: 'alerta' },
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E1E7E8',
  },
  fila: {
    flexDirection: 'row',
  },
  horaBloque: {
    backgroundColor: '#EFF5F5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  hora: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2A9D9D',
  },
  cuerpo: {
    flex: 1,
    marginLeft: 14,
  },
  tipo: {
    fontSize: 12,
    color: '#8A969B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2B3438',
    marginTop: 2,
  },
  detalle: {
    fontSize: 15,
    color: '#6B787E',
    marginTop: 4,
    lineHeight: 21,
  },
  estadoBloque: {
    marginTop: 10,
  },
  responsable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F3',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E6EBEC',
  },
  responsableTexto: {
    marginLeft: 10,
    fontSize: 14,
    color: '#6B787E',
  },
});
