---
sidebar_label: 'AdminHeader'
---

# Componente AdminHeader

**Ruta del archivo:** `src/components/admin/AdminHeader.jsx`

## Descripción

Este archivo contiene el componente del encabezado para la sección de administración de usuarios. Un componente que muestra el encabezado de la sección de usuarios y un botón para añadir nuevos usuarios.

## Props

- **onAddUser**: `function` - La función a llamar cuando se hace clic en el botón de añadir usuario.

## Retorna

- `{JSX.Element}`: El encabezado de la sección de usuarios renderizado.

## Código Fuente

```jsx
import React from 'react';

const AdminHeader = ({ onAddUser }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-text-light">Usuarios</h2>
        <p className="text-subtext-light">Administrar usuarios y sus roles</p>
      </div>
      <button onClick={onAddUser} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <span className="material-symbols-outlined">add</span>
        <span>Añadir usuario</span>
      </button>
    </div>
  );
};

export default AdminHeader;
```