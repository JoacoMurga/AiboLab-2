import { create } from 'zustand';

// Store del filtro de la agenda
// tipoSeleccionado: 'todos' | 'medicacion' | 'tarea' | 'actividad'
export const useFiltroStore = create((set) => ({
  tipoSeleccionado: 'todos',
  cambiarTipo: (tipo) => set({ tipoSeleccionado: tipo }),
}));
