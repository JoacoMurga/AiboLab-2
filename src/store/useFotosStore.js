import { create } from 'zustand';

// Store de fotos de los medicamentos, por id de recordatorio
// TODO: por ahora queda en memoria, se pierde al recargar
export const useFotosStore = create((set) => ({
  fotos: {},
  guardarFoto: (id, uri) =>
    set((estado) => ({ fotos: { ...estado.fotos, [id]: uri } })),
  eliminarFoto: (id) =>
    set((estado) => {
      const fotos = { ...estado.fotos };
      delete fotos[id];
      return { fotos };
    }),
}));
