---
sidebar_label: 'RegisterFooter'
---

# Componente RegisterFooter

## Descripción

`RegisterFooter` es un componente de React que funciona como el pie de página para la sección de registro. Proporciona enlaces de navegación esenciales para el usuario, incluyendo una opción para ir a la página de inicio de sesión si ya tienen una cuenta, y un enlace a la política de privacidad.

## Vista Previa

![Vista Previa de RegisterFooter](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente se coloca típicamente al final de un formulario o página de registro.

```jsx
import React from 'react';
import RegisterForm from './RegisterForm';
import RegisterFooter from './RegisterFooter';

const RegisterPage = () => {
  return (
    <div className="register-page">
      {/* ... otros componentes ... */}
      <RegisterForm />
      <RegisterFooter />
    </div>
  );
};

export default RegisterPage;
```

## Estructura del Componente

El componente se compone de:
- Un `div` principal que alinea los elementos en una columna.
- Un `div` que contiene el texto y el enlace para "Iniciar Sesión". Se utiliza `<a>` para este enlace.
- Un `div` con un componente `<Link>` de `react-router-dom` para la "política de privacidad".

## Dependencias

- **React**: Para la creación y renderizado del componente.
- **react-router-dom**: Utilizado para el enlace de navegación a la política de privacidad, permitiendo la navegación dentro de la aplicación sin recargar la página.

## Código Fuente

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterFooter = () => {
  return (
    <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2">
      <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-[8.526512829121202e-14px]">
        <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-[#6c757d]">
          ¿Ya tienes una cuenta?&nbsp;
        </p>
        <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
          <a href="/" className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-[#4263eb]">
            Inicia Sesión
          </a>
        </div>
      </div>
      <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
        <Link to="/" className="flex-grow-0 flex-shrink-0 text-xs text-center text-[#4263eb]">
          política de privacidad
        </Link>
      </div>
    </div>
  );
};

export default RegisterFooter;
```