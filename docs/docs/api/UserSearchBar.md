---
sidebar_label: 'UserSearchBar'
---

# Componente UserSearchBar

**Ruta del archivo:** `src/components/admin/UserSearchBar.jsx`

## Descripción

Este archivo contiene el componente de la barra de búsqueda de usuarios. Un componente que renderiza una barra de búsqueda para filtrar usuarios.

## Props

- **searchQuery**: `string` - La consulta de búsqueda actual.
- **setSearchQuery**: `function` - La función para actualizar la consulta de búsqueda.

## Retorna

- `{JSX.Element}`: La barra de búsqueda de usuarios renderizada.


## Código Fuente

```jsx
import React from 'react';

const UserSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-card-light p-6 rounded-xl shadow-sm mb-8">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light">search</span>
        <input
          className="w-full pl-10 pr-4 py-2 border border-border-light rounded-lg bg-background-light text-text-light focus:ring-primary focus:border-primary"
          placeholder="Buscar usuarios"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserSearchBar;
```
