// Pide la agenda. Como no hay backend usamos el api/agenda.json del repo
const URL_AGENDA =
  'https://raw.githubusercontent.com/JoacoMurga/AiboLab-2/main/api/agenda.json';

export async function obtenerAgenda() {
  const respuesta = await fetch(URL_AGENDA);

  // fetch no tira error con 404/500, hay que chequearlo
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar la agenda');
  }

  return respuesta.json();
}
