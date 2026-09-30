import { create } from 'zustand';

// Store global con Zustand para el filtro de la agenda.
// Los botones de filtro escriben el tipo elegido y la pantalla lo lee
// para mostrar solo esos recordatorios. Así no hace falta pasarlo por
// props de un componente a otro.
// tipoSeleccionado: 'todos' | 'medicacion' | 'tarea' | 'actividad'
export const useFiltroStore = create((set) => ({
  tipoSeleccionado: 'todos',
  cambiarTipo: (tipo) => set({ tipoSeleccionado: tipo }),
}));
