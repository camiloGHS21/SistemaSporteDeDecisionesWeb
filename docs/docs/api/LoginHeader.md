---
sidebar_label: 'LoginHeader'
---

# Componente LoginHeader

## Descripción

`LoginHeader` es un componente de React diseñado para actuar como el encabezado de la página de inicio de sesión. Su propósito es presentar la identidad visual de la aplicación y dar la bienvenida al usuario. Muestra un logotipo, el nombre de la aplicación "Perspectivas políticas" y un subtítulo que indica la acción a realizar ("Inicia sesión en tu cuenta").

## Vista Previa

![Vista Previa de LoginHeader](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente se coloca en la parte superior de la página de inicio de sesión para darle un contexto visual al usuario.

## Código Fuente

```jsx
import React from 'react';

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="#2563EB" />
      </svg>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Perspectivas políticas
        </h1>
        <p className="text-sm text-center text-gray-600">
          Inicia sesión en tu cuenta
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
```

## Estructura del Componente

El componente está estructurado de la siguiente manera:

- Un `div` contenedor principal que utiliza `flexbox` para organizar y centrar su contenido verticalmente.
- Un elemento `<svg>` que representa el logotipo de la aplicación. El gráfico es un patrón geométrico simple.
- Un `div` que agrupa los textos:
  - Un `h1` para el título principal.
  - Un `p` para el subtítulo.

## Estilos

Los estilos se aplican mediante clases de Tailwind CSS, asegurando consistencia con el resto de la aplicación. Las clases más relevantes son:
- `flex`, `flex-col`, `items-center`, `gap-4`: Para el layout del contenedor.
- `text-3xl`, `font-bold`, `text-center`, `text-gray-900`: Para el estilo del título `h1`.
- `text-sm`, `text-center`, `text-gray-600`: Para el estilo del subtítulo `p`.

## Dependencias

- **React**: Es la única dependencia, necesaria para renderizar el JSX.

Este es un componente puramente visual, sin props, estado interno ni lógica de negocio.