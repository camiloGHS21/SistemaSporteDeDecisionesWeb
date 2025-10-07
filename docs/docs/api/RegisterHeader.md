---
sidebar_label: 'RegisterHeader'
---

# Componente RegisterHeader

## Descripción

`RegisterHeader` es un componente de React diseñado para ser utilizado como el encabezado en la página de registro de la aplicación. Muestra el logotipo de la aplicación, el título principal "Perspectivas políticas" y un subtítulo que invita a los usuarios a crear una cuenta. Este componente es puramente presentacional y no maneja ningún estado o lógica de negocio.

## Vista Previa

![Vista Previa de RegisterHeader](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente está pensado para ser usado en la parte superior de la página de registro.

```jsx
import React from 'react';
import RegisterHeader from './RegisterHeader';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <RegisterHeader />
      {/* Otros componentes de la página de registro */}
    </div>
  );
};

export default RegisterPage;
```

## Estructura del Componente

El componente consiste en un contenedor principal `div` con `flexbox` para centrar su contenido. Dentro de este contenedor se encuentran:

- Un elemento `<svg>` que actúa como el logotipo de la aplicación.
- Un `div` que contiene el título principal (`<h1>`).
- Un `div` que contiene el subtítulo (`<p>`).

## Estilos

Los estilos se aplican mediante clases de Tailwind CSS directamente en el JSX, lo que permite un diseño rápido y consistente. Las clases principales utilizadas son:
- `flex`, `flex-col`, `items-center`, `gap-4`: Para el layout general.
- `text-2xl`, `sm:text-3xl`, `font-bold`, `text-center`, `text-gray-900`: Para el título.
- `text-sm`, `text-center`, `text-gray-600`: Para el subtítulo.

## Dependencias

- **React**: Necesario para renderizar el componente.

Este componente no tiene props, estado interno ni realiza efectos secundarios, lo que lo hace simple y predecible.

## Código Fuente

```jsx
import React from 'react';

const RegisterHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0 w-12 h-12 relative"
        preserveAspectRatio="none"
      >
        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="#2563EB" />
      </svg>
      <div className="flex flex-col justify-start items-center">
        <p className="flex-grow-0 flex-shrink-0 text-2xl sm:text-3xl font-bold text-center text-gray-900">
          Perspectivas políticas
        </p>
      </div>
      <div className="flex flex-col justify-start items-center">
        <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-gray-600">
          Crea una cuenta
        </p>
      </div>
    </div>
  );
};

export default RegisterHeader;
```