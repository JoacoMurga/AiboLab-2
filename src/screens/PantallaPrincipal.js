import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import ContactoCuidado from '../components/ContactoCuidado';
import Encabezado from '../components/Encabezado';
import FiltroTipo from '../components/FiltroTipo';
import RecordatorioCard from '../components/RecordatorioCard';
import TarjetaResumen from '../components/TarjetaResumen';
import { persona, redDeCuidado } from '../data/datosEjemplo';
import { obtenerAgenda } from '../servicios/agenda';
import { useFiltroStore } from '../store/useFiltroStore';

const URL_PROYECTO = 'https://github.com/JoacoMurga/AiboLab-2';

export default function PantallaPrincipal() {
  // useQuery pide la agenda y nos da los tres estados: cargando, error y datos.
  // "agenda" es la clave con la que TanStack Query guarda la respuesta en caché.
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['agenda'],
    queryFn: obtenerAgenda,
  });

  // El filtro elegido lo leemos del store global de Zustand.
  const tipoSeleccionado = useFiltroStore((estado) => estado.tipoSeleccionado);

  // Mientras no llegan los datos usamos una lista vacía para no romper los cálculos.
  const agenda = data || [];

  // El resumen cuenta siempre sobre la agenda completa, no sobre la filtrada.
  const confirmadas = agenda.filter((item) => item.estado === 'confirmada').length;
  const pendientes = agenda.filter((item) => item.estado === 'pendiente').length;
  const sinConfirmar = agenda.filter((item) => item.estado === 'omitida').length;

  // Si todavía no hay datos mostramos un guion en vez de un 0,
  // para no dar a entender que no hay nada pendiente.
  const hayDatos = !isLoading && !error;

  const agendaFiltrada =
    tipoSeleccionado === 'todos'
      ? agenda
      : agenda.filter((item) => item.tipo === tipoSeleccionado);

  // Lo que se ve arriba de la lista: encabezado, resumen, título y filtros.
  const cabecera = (
    <View>
      <Encabezado nombre={persona.nombre} fecha="Jueves 3 de septiembre" foto={persona.foto} />

      <View style={styles.resumen}>
        <TarjetaResumen valor={hayDatos ? confirmadas : '–'} etiqueta="Confirmadas" />
        <TarjetaResumen valor={hayDatos ? pendientes : '–'} etiqueta="Pendientes" acento />
        <TarjetaResumen valor={hayDatos ? sinConfirmar : '–'} etiqueta="Sin confirmar" />
      </View>

      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Tu día</Text>
        <Text style={styles.bajadaSeccion}>
          Medicación, tareas de cuidado y actividades previstas para hoy.
        </Text>
        <FiltroTipo />
      </View>
    </View>
  );

  // Lo que se ve cuando la lista no tiene elementos. Puede ser porque
  // todavía está cargando, porque hubo un error o porque el filtro no trae nada.
  let listaVacia;
  if (isLoading) {
    listaVacia = (
      <View style={styles.aviso}>
        <ActivityIndicator size="large" color="#2A9D9D" />
        <Text style={styles.avisoTexto}>Cargando tu agenda…</Text>
      </View>
    );
  } else if (error) {
    listaVacia = (
      <View style={styles.aviso}>
        <Text style={styles.avisoTexto}>No pudimos cargar la agenda. Revisá la conexión.</Text>
        <Pressable onPress={() => refetch()} accessibilityRole="button" style={styles.botonReintentar}>
          <Text style={styles.botonReintentarTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  } else {
    listaVacia = (
      <View style={styles.aviso}>
        <Text style={styles.avisoTexto}>No hay recordatorios de este tipo para hoy.</Text>
      </View>
    );
  }

  // Lo que se ve debajo de la lista: la red de cuidado y el pie.
  const pie = (
    <View>
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Tu red de cuidado</Text>
        <Text style={styles.bajadaSeccion}>
          Personas que acompañan y reciben los avisos de AIBO.
        </Text>
      </View>

      {/* La red de cuidado son pocas personas, así que alcanza con un ScrollView horizontal. */}
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

      {/* Linking abre el enlace en el navegador del sistema, fuera de la app. */}
      <Pressable onPress={() => Linking.openURL(URL_PROYECTO)} accessibilityRole="link">
        <Text style={styles.enlace}>Conocé más sobre el proyecto AIBO</Text>
      </Pressable>

      <Text style={styles.pie}>Versión 0.2 · Agenda cargada desde la red</Text>
    </View>
  );

  // Toda la pantalla es una FlatList: la agenda va en el medio y el resto
  // en la cabecera y el pie. Así evitamos meter una FlatList dentro de un ScrollView.
  return (
    <FlatList
      data={agendaFiltrada}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <RecordatorioCard
            hora={item.hora}
            tipo={item.tipo}
            titulo={item.titulo}
            detalle={item.detalle}
            estado={item.estado}
            responsableNombre={item.responsableNombre}
            responsableFoto={item.responsableFoto}
          />
        </View>
      )}
      ListHeaderComponent={cabecera}
      ListEmptyComponent={listaVacia}
      ListFooterComponent={pie}
      contentContainerStyle={styles.contenido}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
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
  item: {
    paddingHorizontal: 20,
  },
  aviso: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avisoTexto: {
    fontSize: 16,
    color: '#54626A',
    marginTop: 12,
    textAlign: 'center',
  },
  botonReintentar: {
    marginTop: 16,
    backgroundColor: '#1F7B7B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  botonReintentarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  listaHorizontal: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  enlace: {
    fontSize: 16,
    color: '#1F7B7B',
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 28,
  },
  pie: {
    fontSize: 13,
    color: '#6B787E',
    textAlign: 'center',
    marginTop: 12,
  },
});
