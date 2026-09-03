import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import ContactoCuidado from './src/components/ContactoCuidado';
import Encabezado from './src/components/Encabezado';
import RecordatorioCard from './src/components/RecordatorioCard';
import TarjetaResumen from './src/components/TarjetaResumen';
import { agendaDelDia, persona, redDeCuidado } from './src/data/datosEjemplo';

export default function App() {
  // Contamos los estados de la agenda para armar el resumen del día.
  const confirmadas = agendaDelDia.filter((item) => item.estado === 'confirmada').length;
  const pendientes = agendaDelDia.filter((item) => item.estado === 'pendiente').length;
  const sinConfirmar = agendaDelDia.filter((item) => item.estado === 'omitida').length;

  return (
    <SafeAreaView style={styles.pantalla}>
      <StatusBar barStyle="light-content" backgroundColor="#3E484E" />

      <ScrollView contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
        <Encabezado
          nombre={persona.nombre}
          fecha="Jueves 3 de septiembre"
          foto={persona.foto}
        />

        <View style={styles.resumen}>
          <TarjetaResumen valor={confirmadas} etiqueta="Confirmadas" />
          <TarjetaResumen valor={pendientes} etiqueta="Pendientes" acento />
          <TarjetaResumen valor={sinConfirmar} etiqueta="Sin confirmar" />
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Tu día</Text>
          <Text style={styles.bajadaSeccion}>
            Medicación, tareas de cuidado y actividades previstas para hoy.
          </Text>

          {agendaDelDia.map((item) => (
            <RecordatorioCard
              key={item.id}
              hora={item.hora}
              tipo={item.tipo}
              titulo={item.titulo}
              detalle={item.detalle}
              estado={item.estado}
              responsableNombre={item.responsableNombre}
              responsableFoto={item.responsableFoto}
            />
          ))}
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Tu red de cuidado</Text>
          <Text style={styles.bajadaSeccion}>
            Personas que acompañan y reciben los avisos de AIBO.
          </Text>
        </View>

        {/* Este ScrollView es horizontal: la red de cuidado se recorre de costado. */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaHorizontal}
        >
          {redDeCuidado.map((contacto) => (
            <ContactoCuidado
              key={contacto.id}
              nombre={contacto.nombre}
              rol={contacto.rol}
              foto={contacto.foto}
              disponible={contacto.disponible}
            />
          ))}
        </ScrollView>

        <Text style={styles.pie}>Versión 0.1 — Unidad I · Datos de ejemplo</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F4F6F6',
  },
  contenido: {
    paddingBottom: 36,
  },
  resumen: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -18,
  },
  seccion: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B3438',
  },
  bajadaSeccion: {
    fontSize: 15,
    color: '#6B787E',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 21,
  },
  listaHorizontal: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  pie: {
    fontSize: 13,
    color: '#9AA5AA',
    textAlign: 'center',
    marginTop: 28,
  },
});
