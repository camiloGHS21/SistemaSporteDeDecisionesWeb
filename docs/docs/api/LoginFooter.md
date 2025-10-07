---
sidebar_label: 'LoginFooter'
---

# Componente LoginFooter

## Descripción

`LoginFooter` es un componente de React que se utiliza como pie de página en la vista de inicio de sesión. Su función es ofrecer al usuario rutas de navegación alternativas, como la opción de registrarse si no tiene una cuenta y un enlace a la política de privacidad de la aplicación.

## Vista Previa

![Vista Previa de LoginFooter](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente se suele colocar después del formulario de inicio de sesión.

## Código Fuente

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="flex justify-center items-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register"className="font-medium text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-sm font-medium text-center text-blue-600">
          política de privacidad
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;
```

## Estructura del Componente

El componente se organiza de la siguiente manera:

- Un `div` principal que centra su contenido.
- Un primer `div` que contiene un párrafo (`<p>`) con el texto "¿No tienes una cuenta?" y un componente `<Link>` de `react-router-dom` que dirige al usuario a la página de registro (`/register`).
- Un segundo `div` que contiene un párrafo (`<p>`) con el texto "política de privacidad", que probablemente debería estar enlazado a una página de política de privacidad.

## Dependencias

- **React**: Para la creación y renderizado del componente.
- **react-router-dom**: Se utiliza para el componente `<Link>`, que permite la navegación del lado del cliente a la página de registro sin necesidad de recargar la página completa.