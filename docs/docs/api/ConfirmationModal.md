---
sidebar_label: 'ConfirmationModal'
---

# Componente ConfirmationModal

## Descripción

`ConfirmationModal` es un componente de React que muestra un cuadro de diálogo modal para solicitar al usuario la confirmación de una acción crítica, como eliminar un elemento. El modal se superpone al resto del contenido de la página hasta que el usuario interactúa con él.

## Vista Previa

![Vista Previa de ConfirmationModal](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Props

- `isOpen` (Boolean): Un booleano que controla la visibilidad del modal. Si es `true`, el modal se muestra; si es `false`, se oculta (retorna `null`).
- `onClose` (Function): La función que se ejecuta cuando el usuario hace clic en el botón "Cancelar". Típicamente, esta función debería cambiar el estado que controla `isOpen` a `false`.
- `onConfirm` (Function): La función que se ejecuta cuando el usuario hace clic en el botón de confirmación (por ejemplo, "Eliminar").
- `title` (String): El título que se muestra en la parte superior del modal.
- `message` (String): El mensaje o pregunta de confirmación que se muestra en el cuerpo del modal.

## Funcionalidades

- **Visibilidad Controlada**: El modal solo se renderiza si la prop `isOpen` es verdadera.
- **Superposición**: Utiliza un `div` con `position: fixed` y un fondo semitransparente para cubrir toda la pantalla y centrar el modal, evitando que el usuario interactúe con el contenido de fondo.
- **Acciones Claras**: Proporciona dos botones distintos:
  - Un botón de "Cancelar" con un estilo neutro.
  - Un botón de "Eliminar" (o confirmación) con un color de advertencia (rojo) para indicar una acción destructiva.

## Uso

El estado `isOpen` debe ser manejado por el componente padre.

## Código Fuente

```jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-card-light p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-text-light mb-4">{title}</h2>
        <p className="text-subtext-light mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
```

## Dependencias

- **React**: Es la única dependencia, necesaria para la renderización condicional y el manejo de props.