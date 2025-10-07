---
sidebar_label: 'InformePreview'
---

# Componente InformePreview

## Descripción

`InformePreview` es un componente de React simple y estático que actúa como un marcador de posición o una sección de vista previa para un informe generado. Su propósito es indicar al usuario dónde aparecerá la vista previa del informe y proporcionar un breve texto descriptivo.

## Vista Previa

![Vista Previa de InformePreview](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente se utiliza en la página de generación de informes, generalmente junto al formulario de configuración, para mostrar una representación visual del informe que se va a generar.

## Código Fuente

```jsx
import React from 'react';

const InformePreview = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Vista Previa del Informe</h3>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="p-4">
          <h4 className="text-base font-bold text-gray-900">Informe de Políticas Digitales</h4>
          <p className="mt-1 text-sm text-blue-600">
           Vista previa del informe generado. Revisa los datos y el formato antes de descargar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformePreview;
```

## Estructura del Componente

El componente consiste en:
- Un `div` principal estilizado como una tarjeta.
- Un título `h3` para la sección: "Vista Previa del Informe".
- Un `div` interior que contiene:
  - Un título `h4` para el informe: "Informe de Políticas Digitales".
  - Un párrafo (`p`) con un mensaje para el usuario, indicándole que revise la vista previa antes de descargar.

## Funcionalidad Actual

En su estado actual, este componente es estático y no muestra una vista previa real de los datos. Sirve como un placeholder visual. Para una funcionalidad completa, este componente debería ser modificado para recibir los datos del informe a través de props y renderizarlos dinámicamente.

## Dependencias

- **React**: Es la única dependencia, necesaria para renderizar el JSX.

No tiene props, estado interno ni lógica de negocio.
