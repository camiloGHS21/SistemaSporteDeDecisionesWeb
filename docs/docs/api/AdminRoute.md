---
sidebar_label: 'AdminRoute'
---

# Componente AdminRoute

## Descripción

`AdminRoute` es un componente de envoltura (wrapper) de `react-router-dom` similar a `ProtectedRoute`, pero con un nivel adicional de seguridad. Solo permite el acceso a las rutas anidadas si el usuario no solo está autenticado, sino que también tiene el rol de administrador.

## Uso

Se utiliza para proteger secciones de la aplicación que son exclusivas para administradores, como un panel de administración.

## Código Fuente

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NotFound from '@pages/NotFound'; // Import NotFound
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando acceso...</div>; // Or a proper loading spinner
  }

  return isAuthenticated && isAdmin ? <Outlet /> : <NotFound />;
};

export default AdminRoute;
```

## Funcionalidades

- **Doble Verificación**: Utiliza el hook `useAuth` para comprobar dos condiciones: que `isAuthenticated` sea `true` y que `isAdmin` también sea `true`.
- **Estado de Carga**: Mientras se verifica el estado (`isLoading` es `true`), muestra un mensaje de "Verificando acceso...".
- **Acceso Denegado**: Si el usuario no está autenticado o no es un administrador, en lugar de redirigir, renderiza el componente `NotFound`. Esto evita exponer la existencia de rutas de administrador a usuarios no autorizados.
- **Acceso Permitido**: Si se cumplen ambas condiciones, renderiza el componente `<Outlet />`, dando acceso a las rutas anidadas de administrador.

## Dependencias

- **React**: Para la lógica del componente.
- **react-router-dom**: Para el componente `<Outlet>`.
- **@pages/NotFound**: Componente que se muestra cuando el acceso es denegado.
- **AuthContext**: Para obtener los estados `isAuthenticated`, `isAdmin` y `isLoading` a través del hook `useAuth`.