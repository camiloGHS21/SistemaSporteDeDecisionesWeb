---
sidebar_label: 'ProtectedRoute'
---

# Componente ProtectedRoute

## Descripción

`ProtectedRoute` es un componente de envoltura (wrapper) de `react-router-dom` que se utiliza para proteger rutas en la aplicación. Solo permite el acceso a las rutas anidadas si el usuario está autenticado. Si el usuario no está autenticado, lo redirige a la página de inicio (`/`).

## Uso

Este componente se utiliza en la configuración de rutas de `react-router-dom` para envolver las rutas que requieren que el usuario haya iniciado sesión.

## Código Fuente

```jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div></div>; // Or a proper loading spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
```

## Funcionalidades

- **Verificación de Autenticación**: Utiliza el hook `useAuth` para acceder al estado de `isAuthenticated` y `isLoading` del `AuthContext`.
- **Estado de Carga**: Mientras se verifica el estado de autenticación (`isLoading` es `true`), el componente puede mostrar un indicador de carga (actualmente renderiza un `div` vacío).
- **Redirección**: Si el usuario no está autenticado (`isAuthenticated` es `false`), utiliza el componente `<Navigate>` de `react-router-dom` para redirigirlo a la ruta raíz (`/`). La prop `replace` se usa para que la página de inicio reemplace la ruta protegida en el historial de navegación.
- **Renderizado de Rutas Anidadas**: Si el usuario está autenticado, renderiza el componente `<Outlet />`, que a su vez renderiza el componente de la ruta anidada que coincida con la URL actual.

## Dependencias

- **React**: Para la lógica del componente.
- **react-router-dom**: Para los componentes `<Navigate>` y `<Outlet>`.
- **AuthContext**: Para obtener el estado de autenticación del usuario a través del hook `useAuth`.