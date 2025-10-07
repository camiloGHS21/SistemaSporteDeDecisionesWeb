---
sidebar_label: 'DataSourcesSection'
---

# Componente DataSourcesSection

## Descripción

`DataSourcesSection` es un componente de React puramente informativo que se utiliza para mostrar las fuentes de datos externas de las que se nutre la aplicación. Actualmente, destaca la API del Banco Mundial como la fuente principal de datos.

## Vista Previa

![Vista Previa de DataSourcesSection](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente está diseñado para ser parte de una página más grande, como una sección de "Recursos" o "Acerca de", donde se explica el origen de los datos de la aplicación.

## Código Fuente

```jsx
import React from 'react';

const DataSourcesSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4 border-b border-border-light dark:border-border-dark pb-2">
        1. Fuentes de Datos Externas
      </h2>
      <p className="text-subtext-light dark:text-subtext-dark mb-6">
        El sistema se conecta a APIs externas para obtener datos actualizados. La fuente principal es:
      </p>
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
          Banco Mundial
        </h3>
        <p className="text-subtext-light dark:text-subtext-dark mb-4">
          Utilizamos la API del Banco Mundial para acceder a una amplia gama de indicadores de desarrollo de países de todo el mundo. Esto nos permite proporcionar comparaciones detalladas y actualizadas.
        </p>
        <a 
          className="text-primary hover:underline flex items-center" 
          href="https://api.worldbank.org/v2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explorar API del Banco Mundial
          <span className="material-icons ml-1 text-sm">open_in_new</span>
        </a>
      </div>
    </div>
  );
};

export default DataSourcesSection;
```

## Estructura del Componente

El componente se estructura de la siguiente manera:

- Un `div` principal que contiene toda la sección.
- Un título `h2` para la sección: "1. Fuentes de Datos Externas".
- Un párrafo (`p`) introductorio.
- Un `div` estilizado como una tarjeta que contiene la información específica sobre la fuente de datos (Banco Mundial).
  - Un título `h3` para el nombre de la fuente.
  - Un párrafo (`p`) con la descripción de cómo se utiliza la API.
  - Un enlace `<a>` que lleva a la documentación oficial de la API del Banco Mundial, abriéndose en una nueva pestaña (`target="_blank"`).

## Estilos

Los estilos se aplican mediante clases de Tailwind CSS y están preparados para soportar un modo oscuro (`dark:`).
- `text-2xl`, `font-semibold`, `border-b`: Para el título principal de la sección.
- `bg-card-light`, `dark:bg-card-dark`, `p-6`, `rounded-lg`, `border`: Para el contenedor de la tarjeta de información.
- `text-primary`, `hover:underline`: Para el enlace externo.

## Dependencias

- **React**: Es la única dependencia, necesaria para renderizar el JSX.

Este componente es estático, no tiene props, estado interno ni interactividad más allá del enlace externo.