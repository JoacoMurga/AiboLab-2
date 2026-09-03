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

| # | Feature 

| 1 | Consultar la agenda de cuidado del día | Implementada 
| 2 | Filtrar la agenda por tipo (medicación, tareas, actividades) | Pendiente 
| 3 | Consultar el detalle de un recordatorio | Pendiente 
| 4 | Confirmar la toma de una medicación o tarea | Pendiente


El listado se actualiza a medida que avanza el proyecto.

## Estado actual — Unidad I

Primera versión del producto: la pantalla principal de la aplicación, con la agenda de
cuidado del día y la red de cuidado, construida sobre datos estáticos.


## Tecnologías

- React Native
- Expo
- JavaScript
- StyleSheet


## Estructura del proyecto

```
├── App.js                          # Pantalla principal
└── src
    ├── components
    │   ├── ContactoCuidado.js      # Integrante de la red de cuidado
    │   ├── Encabezado.js           # Marca, saludo y fecha
    │   ├── Etiqueta.js             # Etiqueta de estado reutilizable
    │   ├── RecordatorioCard.js     # Punto de la agenda (componente principal)
    │   └── TarjetaResumen.js       # Tarjeta de resumen del día
    └── data
        └── datosEjemplo.js         # Datos estáticos
```

## Cómo ejecutar el proyecto

```bash
npm install
npx expo start
```

Después se escanea el código QR con la aplicación **Expo Go** desde un dispositivo
móvil, o se presiona `w` para abrirlo en el navegador.
