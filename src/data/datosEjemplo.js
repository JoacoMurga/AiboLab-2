// Datos estáticos de ejemplo.
// En esta primera versión todavía no consumimos el backend, así que la
// información vive acá. Cuando exista la API, este archivo se reemplaza
// y los componentes no se tocan, porque reciben todo por props.

// Persona acompañada por la red de cuidado.
export const persona = {
  nombre: 'Elsa',
  apellido: 'Ferreyra',
  foto: 'https://ui-avatars.com/api/?name=Elsa+Ferreyra&background=2A9D9D&color=fff&size=160&bold=true',
};

// Agenda de cuidado del día.
// tipo: 'medicacion' | 'tarea' | 'actividad'
// estado: 'confirmada' | 'pendiente' | 'omitida'
export const agendaDelDia = [
  {
    id: 1,
    hora: '08:00',
    tipo: 'medicacion',
    titulo: 'Enalapril 10 mg',
    detalle: '1 comprimido con el desayuno',
    estado: 'confirmada',
    responsableNombre: 'Elsa',
    responsableFoto:
      'https://ui-avatars.com/api/?name=Elsa+Ferreyra&background=2A9D9D&color=fff&size=64&bold=true',
  },
  {
    id: 2,
    hora: '09:30',
    tipo: 'tarea',
    titulo: 'Control de presión arterial',
    detalle: 'Registrar el valor en la libreta de seguimiento',
    estado: 'confirmada',
    responsableNombre: 'Marcela',
    responsableFoto:
      'https://ui-avatars.com/api/?name=Marcela+Duarte&background=3E484E&color=fff&size=64&bold=true',
  },
  {
    id: 3,
    hora: '12:00',
    tipo: 'medicacion',
    titulo: 'Metformina 500 mg',
    detalle: '1 comprimido después del almuerzo',
    estado: 'pendiente',
    responsableNombre: 'Elsa',
    responsableFoto:
      'https://ui-avatars.com/api/?name=Elsa+Ferreyra&background=2A9D9D&color=fff&size=64&bold=true',
  },
  {
    id: 4,
    hora: '15:00',
    tipo: 'actividad',
    titulo: 'Caminata en la plaza',
    detalle: 'Salida acompañada de 20 minutos',
    estado: 'pendiente',
    responsableNombre: 'Marcela',
    responsableFoto:
      'https://ui-avatars.com/api/?name=Marcela+Duarte&background=3E484E&color=fff&size=64&bold=true',
  },
  {
    id: 5,
    hora: '17:00',
    tipo: 'medicacion',
    titulo: 'Vitamina D',
    detalle: '1 gota bajo la lengua',
    estado: 'omitida',
    responsableNombre: 'Elsa',
    responsableFoto:
      'https://ui-avatars.com/api/?name=Elsa+Ferreyra&background=2A9D9D&color=fff&size=64&bold=true',
  },
  {
    id: 6,
    hora: '21:00',
    tipo: 'medicacion',
    titulo: 'Enalapril 10 mg',
    detalle: '1 comprimido antes de dormir',
    estado: 'pendiente',
    responsableNombre: 'Elsa',
    responsableFoto:
      'https://ui-avatars.com/api/?name=Elsa+Ferreyra&background=2A9D9D&color=fff&size=64&bold=true',
  },
];

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
