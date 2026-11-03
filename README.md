# AIBO — Aplicación Móvil

**AIBO: Plataforma de Acompañamiento Integral para Adultos Mayores**
_Tu red de cuidado_

## Descripción y problemática

AIBO está dirigida a adultos mayores que viven solos, con familiares, en residencias o
con el apoyo de cuidadores. Hoy la información sobre el cuidado suele quedar repartida
entre alarmas del teléfono, libretas, mensajes y recetas en papel. Esa dispersión hace
difícil saber con certeza si una medicación fue tomada, si un cuidador realizó una
tarea o quién atendió un aviso.

La aplicación móvil busca reunir todo eso en un solo lugar: la agenda de cuidado del
día, la confirmación de las tomas y las tareas, y la red de personas que acompañan.


## Integrantes

- Murga, Joaquín Iván — 31208
- Manrique, Leandro Primo 31070
- Rodriguez Almada, Melisa Ayelen 31084

## Features

| # | Feature | Estado |
|---|---------|--------|
| 1 | Consultar la agenda de cuidado del día | Implementada |
| 2 | Filtrar la agenda por tipo (medicación, tareas, actividades) | Implementada |
| 3 | Consultar el detalle de un recordatorio | Implementada |
| 4 | Confirmar la toma de una medicación o tarea | Pendiente |

El listado se actualiza a medida que avanza el proyecto.

## Tecnologías

- React Native + Expo (SDK 58)
- JavaScript
- StyleSheet
- TanStack Query (`@tanstack/react-query`)
- Zustand
- expo-linear-gradient
- Expo Router
- expo-image-picker

## Estructura del proyecto

```
├── app
│   ├── _layout.js                  # Stack y Provider de TanStack Query
│   ├── index.js                    # Pantalla principal
│   └── recordatorio
│       └── [id].js                 # Detalle de un recordatorio (ruta dinámica)
├── api
│   └── agenda.json                 # "API" simulada: agenda del día
└── src
    ├── components
    │   ├── ContactoCuidado.js      # Integrante de la red de cuidado
    │   ├── Encabezado.js           # Marca, saludo y fecha (con degradado)
    │   ├── Etiqueta.js             # Etiqueta de estado reutilizable
    │   ├── FiltroTipo.js           # Botones de filtro por tipo
    │   ├── RecordatorioCard.js     # Punto de la agenda (componente principal)
    │   └── TarjetaResumen.js       # Tarjeta de resumen del día
    ├── data
    │   └── datosEjemplo.js         # Datos estáticos (persona y red de cuidado)
    ├── screens
    │   └── PantallaPrincipal.js    # Pantalla con la agenda (FlatList + useQuery)
    ├── servicios
    │   └── agenda.js               # fetch de la agenda
    └── store
        ├── useFiltroStore.js       # Store global de Zustand para el filtro
        └── useFotosStore.js        # Store global de Zustand para las fotos
```

## Cómo ejecutar el proyecto

```bash
npm install
npx expo start
```

Después se presiona `w` para abrirlo en el navegador, o se escanea el código QR con
Expo Go desde el celular (hay que iniciar sesión con `npx expo login`).
