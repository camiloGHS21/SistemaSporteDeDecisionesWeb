---
sidebar_label: 'NotFound'
---

# Componente NotFound

**Ruta del archivo:** `src/pages/NotFound.jsx`

## Descripción

Página de error 404 que se muestra cuando una ruta no es encontrada. Componente que renderiza un mensaje de "Página no encontrada" con opciones para volver a la página de inicio o a la página anterior.

## Props

Este componente no recibe props.

## Componentes Utilizados

- `Link` de `react-router-dom`

## Retorna

- `{JSX.Element}`: La página 404 renderizada.

## Código Fuente

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-2.5 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-24 md:py-32 bg-[#f8f9fa]">
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-full max-w-md gap-8 p-8 bg-white rounded-lg shadow-md">
        {/* Icono de error 404 */}
        <div className="flex flex-col items-center gap-4 w-full">
          <svg
            width={64}
            height={64}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-500"
          >
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path d="M20 20L44 44M44 20L20 44" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-6xl font-bold text-center text-gray-900">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              ¡Ups! Página no encontrada
            </h2>
            <p className="text-sm text-center text-gray-600 max-w-xs">
              La página que estás buscando no existe o ha sido movida.
            </p>
          </div>
        </div>

        {/* Botón para regresar */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/"
            className="flex justify-center items-center w-full px-4 py-3 bg-[#0D6EFD] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Volver al inicio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex justify-center items-center w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Página anterior
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
```