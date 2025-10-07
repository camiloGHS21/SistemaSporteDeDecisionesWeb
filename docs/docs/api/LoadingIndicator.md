---
sidebar_label: 'LoadingIndicator'
---

# Componente LoadingIndicator

## Descripción

`LoadingIndicator` es un componente de React que se utiliza para mostrar un estado de carga a pantalla completa. Es ideal para operaciones asíncronas como la subida de archivos o la obtención de datos, ya que bloquea la interacción del usuario con el resto de la aplicación y proporciona feedback visual sobre el progreso.

## Vista Previa

![Vista Previa de LoadingIndicator](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Props

- `message` (String): El mensaje que se muestra sobre la barra de progreso (ej. "Subiendo y procesando archivo...").
- `fileName` (String): Un nombre de archivo opcional que se puede mostrar para dar más contexto sobre lo que se está cargando.
- `progress` (Number): Un número entre 0 y 100 que representa el porcentaje de progreso de la operación. Este valor se usa para determinar el ancho de la barra de progreso.

## Funcionalidades

- **Superposición a Pantalla Completa**: Utiliza `position: fixed` y un fondo semitransparente para cubrir toda la ventana del navegador, centrando el indicador de carga.
- **Mensajes Dinámicos**: Muestra un mensaje y, opcionalmente, un nombre de archivo para informar al usuario sobre la operación en curso.
- **Barra de Progreso**: Visualiza el progreso de la operación mediante una barra que se llena horizontalmente. El ancho de la barra se actualiza dinámicamente según la prop `progress`.

## Uso

Este componente se renderiza condicionalmente en el componente padre, basado en un estado de carga.

## Código Fuente

```jsx
import React from 'react';

const LoadingIndicator = ({ message, fileName, progress }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-1/3 max-w-md text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{message}</h3>
        {fileName && <p className="text-gray-600 mb-4 break-all">{fileName}</p>}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
```

## Dependencias

- **React**: Es la única dependencia, necesaria para renderizar el JSX y manejar las props.