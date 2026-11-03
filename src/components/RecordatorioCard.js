import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Etiqueta from './Etiqueta';

// Tarjeta de un recordatorio de la agenda (medicacion, tarea o actividad)
// onPress viene de la pantalla
export default function RecordatorioCard({
  hora,
  tipo,
  titulo,
  detalle,
  estado,
  responsableNombre,
  responsableFoto,
  onPress,
}) {
  const textoTipo = textosPorTipo[tipo] || 'Recordatorio';
  const estadoMostrado = estados[estado] || estados.pendiente;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${titulo}, ${hora}. Ver detalle`}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.tarjetaPresionada]}
    >
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
        <Text style={styles.verDetalle}>Ver detalle ›</Text>
      </View>
    </Pressable>
  );
}

// textos para mostrar (se usan tambien en el detalle)
export const textosPorTipo = {
  medicacion: 'Medicación',
  tarea: 'Tarea de cuidado',
  actividad: 'Actividad',
};

export const estados = {
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
  tarjetaPresionada: {
    backgroundColor: '#EFF5F5',
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
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#6B787E',
  },
  verDetalle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F7B7B',
  },
});
