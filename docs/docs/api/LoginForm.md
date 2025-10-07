---
sidebar_label: 'LoginForm'
---

# Componente LoginForm

## Descripción

`LoginForm` es un componente de React que renderiza el formulario de inicio de sesión. Se encarga de capturar las credenciales del usuario (email y contraseña), gestionar el estado del formulario, manejar el envío de los datos a la API de autenticación y mostrar los errores correspondientes.

## Vista Previa

![Vista Previa de LoginForm](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Uso

Este componente es el núcleo de la página de inicio de sesión.
## Código Fuente

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // Use the login function from context
        navigate('/comparar');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('No se pudo conectar al servidor');
    }
  };

  return (
    <form className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
        <input
          className="self-stretch px-3.5 py-4 rounded-md border border-gray-300"
          type="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="self-stretch px-3.5 py-4 rounded-md border border-gray-300"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-sm font-medium text-left text-red-600">Contraseña incorrecta o usuario no registrado.</p>}
      <div className="flex justify-end items-center self-stretch">
        <p className="text-sm font-medium text-left text-blue-600">¿Olvidaste tu contraseña?</p>
      </div>
      <button type="submit" className="flex justify-center items-center self-stretch px-4 py-3 rounded-md bg-blue-600">
        <span className="text-sm font-semibold text-center text-white">iniciar sesión</span>
      </button>
    </form>
  );
};

export default LoginForm;
```

## Funcionalidades

- **Gestión de Estado**: Utiliza `useState` para almacenar el `email`, la `password` y cualquier `error` que ocurra durante el proceso.
- **Contexto de Autenticación**: Hace uso del hook `useAuth` para acceder a la función `login` del `AuthContext`. Esto le permite actualizar el estado de autenticación de la aplicación de forma global.
- **Envío de Formulario (`handleSubmit`)**: 
  - Previene el comportamiento por defecto del formulario.
  - Envía una solicitud `POST` a la API (`/api/auth/login`) con el email y la contraseña.
  - Si la respuesta es exitosa, extrae el token de autenticación, llama a la función `login` del contexto para guardarlo y redirige al usuario a la página `/comparar` usando `useNavigate`.
  - Si la respuesta falla, muestra un mensaje de error.
- **Manejo de Errores**: Muestra un mensaje de error genérico si las credenciales son incorrectas o si hay un problema de conexión con el servidor.

## Estructura del Componente

- Un elemento `<form>` con el manejador `onSubmit`.
- Dos campos `<input>`, uno para el email y otro para la contraseña.
- Un párrafo (`<p>`) que se muestra condicionalmente para los mensajes de error.
- Un enlace para "¿Olvidaste tu contraseña?".
- Un botón (`<button>`) para enviar el formulario.

## Dependencias

- **React**: Para `useState` y la renderización del componente.
- **react-router-dom**: Para `useNavigate`, que permite la redirección después de un inicio de sesión exitoso.
- **AuthContext**: Proporciona la función `login` para gestionar el estado de autenticación de la aplicación.