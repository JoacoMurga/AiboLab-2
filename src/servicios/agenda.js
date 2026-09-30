// Servicio que pide la agenda del día.
// Todavía no tenemos backend, así que usamos como "API" un archivo JSON
// que está en el propio repositorio (api/agenda.json). GitHub lo sirve
// en esta URL, y la app lo pide con fetch como si fuera un servidor real.
const URL_AGENDA =
  'https://raw.githubusercontent.com/JoacoMurga/AiboLab-2/main/api/agenda.json';

export async function obtenerAgenda() {
  const respuesta = await fetch(URL_AGENDA);

  // fetch no falla solo con un 404 o un 500, así que lo revisamos nosotros.
  // Si tiramos el error, TanStack Query lo detecta y reintenta.
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar la agenda');
  }

  return respuesta.json();
}
