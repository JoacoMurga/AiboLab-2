import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';

import Etiqueta from '../../src/components/Etiqueta';
import { estados, textosPorTipo } from '../../src/components/RecordatorioCard';
import { obtenerAgenda } from '../../src/servicios/agenda';
import { useFotosStore } from '../../src/store/useFotosStore';

// Detalle de un recordatorio - ruta dinamica /recordatorio/[id]
export default function DetalleRecordatorio() {
  // id que viene en la URL (llega como string)
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // misma key que en la pantalla principal, asi la toma de la cache
  const { data, isLoading } = useQuery({ queryKey: ['agenda'], queryFn: obtenerAgenda });

  const foto = useFotosStore((estado) => estado.fotos[id]);
  const guardarFoto = useFotosStore((estado) => estado.guardarFoto);
  const eliminarFoto = useFotosStore((estado) => estado.eliminarFoto);
  const [aviso, setAviso] = useState('');
  // para pedir confirmacion antes de borrar
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);

  // si entraron directo por URL no hay a donde volver, vamos al inicio
  const volver = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // --- CAMARA ---
  const sacarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      setAviso('Sin permiso para usar la cámara. Podés activarlo en los ajustes del celular.');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!resultado.canceled) {
      guardarFoto(id, resultado.assets[0].uri);
      setAviso('');
    }
  };

  const quitarFoto = () => {
    eliminarFoto(id);
    setConfirmandoBorrado(false);
  };

  // --- GALERIA ---
  const elegirDeGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      setAviso('Sin permiso para ver tus fotos. Podés activarlo en los ajustes del celular.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });
    if (!resultado.canceled) {
      guardarFoto(id, resultado.assets[0].uri);
      setAviso('');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#2A9D9D" />
      </View>
    );
  }

  // el id del JSON es numero, por eso el Number()
  const recordatorio = (data || []).find((item) => item.id === Number(id));

  if (!recordatorio) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text style={styles.avisoTexto}>No encontramos este recordatorio.</Text>
        <Pressable onPress={volver} accessibilityRole="button" style={styles.botonPrincipal}>
          <Text style={styles.botonPrincipalTexto}>Volver a la agenda</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const estadoMostrado = estados[recordatorio.estado] || estados.pendiente;
  const esMedicacion = recordatorio.tipo === 'medicacion';

  return (
    <SafeAreaView style={styles.pantalla}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Pressable onPress={volver} accessibilityRole="button" style={styles.volver}>
          <Text style={styles.volverTexto}>‹ Volver a la agenda</Text>
        </Pressable>

        <View style={styles.tarjeta}>
          <Text style={styles.tipo}>{textosPorTipo[recordatorio.tipo]}</Text>
          <Text style={styles.titulo}>{recordatorio.titulo}</Text>
          <Text style={styles.hora}>Hoy a las {recordatorio.hora}</Text>
          <Text style={styles.detalle}>{recordatorio.detalle}</Text>

          <View style={styles.fila}>
            <Etiqueta texto={estadoMostrado.texto} tipo={estadoMostrado.color} />
          </View>

          <View style={styles.responsable}>
            <Image style={styles.avatar} source={{ uri: recordatorio.responsableFoto }} />
            <Text style={styles.responsableTexto}>A cargo de {recordatorio.responsableNombre}</Text>
          </View>
        </View>

        {/* foto solo para medicacion */}
        {esMedicacion && (
          <View style={styles.tarjeta}>
            <Text style={styles.subtitulo}>Foto del medicamento</Text>
            <Text style={styles.ayuda}>
              Así es la caja o el blíster, para reconocerlo fácil al momento de tomarlo.
            </Text>

            {foto ? (
              <Image source={{ uri: foto }} style={styles.foto} />
            ) : (
              <View style={[styles.foto, styles.sinFoto]}>
                <Text style={styles.sinFotoTexto}>Todavía no hay foto</Text>
              </View>
            )}

            <Pressable onPress={sacarFoto} accessibilityRole="button" style={styles.botonPrincipal}>
              <Text style={styles.botonPrincipalTexto}>{foto ? 'Sacar otra foto' : 'Sacar foto'}</Text>
            </Pressable>
            <Pressable onPress={elegirDeGaleria} accessibilityRole="button" style={styles.botonSecundario}>
              <Text style={styles.botonSecundarioTexto}>Elegir de la galería</Text>
            </Pressable>

            {foto && !confirmandoBorrado && (
              <Pressable
                onPress={() => setConfirmandoBorrado(true)}
                accessibilityRole="button"
                style={styles.botonQuitar}
              >
                <Text style={styles.botonQuitarTexto}>Quitar foto</Text>
              </Pressable>
            )}

            {foto && confirmandoBorrado && (
              <View style={styles.confirmacion}>
                <Text style={styles.confirmacionTexto}>¿Seguro que querés quitar la foto?</Text>
                <View style={styles.filaBotones}>
                  <Pressable
                    onPress={() => setConfirmandoBorrado(false)}
                    accessibilityRole="button"
                    style={[styles.botonSecundario, styles.botonMitad]}
                  >
                    <Text style={styles.botonSecundarioTexto}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    onPress={quitarFoto}
                    accessibilityRole="button"
                    style={[styles.botonPeligro, styles.botonMitad]}
                  >
                    <Text style={styles.botonPrincipalTexto}>Sí, quitar</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {aviso ? <Text style={styles.aviso}>{aviso}</Text> : null}
          </View>
        )}
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
    padding: 20,
    paddingBottom: 36,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F6F6',
  },
  volver: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginBottom: 8,
  },
  volverTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F7B7B',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E7E8',
  },
  tipo: {
    fontSize: 13,
    color: '#6B787E',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2B3438',
    marginTop: 4,
  },
  hora: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F7B7B',
    marginTop: 8,
  },
  detalle: {
    fontSize: 17,
    color: '#54626A',
    marginTop: 8,
    lineHeight: 24,
  },
  fila: {
    marginTop: 14,
  },
  responsable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F3',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6EBEC',
  },
  responsableTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#54626A',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B3438',
  },
  ayuda: {
    fontSize: 15,
    color: '#6B787E',
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 21,
  },
  foto: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 14,
  },
  sinFoto: {
    backgroundColor: '#E6EBEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sinFotoTexto: {
    fontSize: 16,
    color: '#54626A',
  },
  botonPrincipal: {
    backgroundColor: '#1F7B7B',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botonPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  botonSecundario: {
    borderWidth: 2,
    borderColor: '#1F7B7B',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  botonSecundarioTexto: {
    color: '#1F7B7B',
    fontSize: 17,
    fontWeight: '700',
  },
  botonQuitar: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  botonQuitarTexto: {
    color: '#A8443A',
    fontSize: 17,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  confirmacion: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FBE7E3',
  },
  confirmacionTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B3438',
    textAlign: 'center',
  },
  filaBotones: {
    flexDirection: 'row',
    marginTop: 4,
  },
  botonMitad: {
    flex: 1,
    marginHorizontal: 4,
  },
  botonPeligro: {
    backgroundColor: '#A8443A',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  aviso: {
    fontSize: 15,
    color: '#A8443A',
    marginTop: 12,
    textAlign: 'center',
  },
  avisoTexto: {
    fontSize: 17,
    color: '#54626A',
    marginBottom: 16,
    textAlign: 'center',
  },
});
