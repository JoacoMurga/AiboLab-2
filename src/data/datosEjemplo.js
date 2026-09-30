// Datos estáticos de ejemplo.
// La agenda del día ya no está acá: ahora se pide por red con TanStack Query
// (ver src/servicios/agenda.js). Acá quedan los datos que casi no cambian
// durante el día: la persona y su red de cuidado.

// Persona acompañada por la red de cuidado.
export const persona = {
  nombre: 'Elsa',
  apellido: 'Ferreyra',
  foto: 'https://ui-avatars.com/api/?name=Elsa+Ferreyra&background=2A9D9D&color=fff&size=160&bold=true',
};

// Integrantes de la red de cuidado de la persona.
export const redDeCuidado = [
  {
    id: 1,
    nombre: 'Marcela Duarte',
    rol: 'Cuidadora',
    disponible: true,
    foto: 'https://ui-avatars.com/api/?name=Marcela+Duarte&background=3E484E&color=fff&size=128&bold=true',
  },
  {
    id: 2,
    nombre: 'Javier Ferreyra',
    rol: 'Hijo',
    disponible: true,
    foto: 'https://ui-avatars.com/api/?name=Javier+Ferreyra&background=3E484E&color=fff&size=128&bold=true',
  },
  {
    id: 3,
    nombre: 'Dra. Silvia Roldán',
    rol: 'Médica de cabecera',
    disponible: false,
    foto: 'https://ui-avatars.com/api/?name=Silvia+Roldan&background=3E484E&color=fff&size=128&bold=true',
  },
  {
    id: 4,
    nombre: 'Ana Ferreyra',
    rol: 'Hija',
    disponible: false,
    foto: 'https://ui-avatars.com/api/?name=Ana+Ferreyra&background=3E484E&color=fff&size=128&bold=true',
  },
];
