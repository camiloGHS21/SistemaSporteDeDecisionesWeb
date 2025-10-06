# Admin API

## Base URL

`http://localhost:8080/api/admin`

## Autenticación

Todas las peticiones a la API de administración requieren un token de autenticación con el rol `ROLE_ADMIN`.

## Endpoints

### Dashboard

#### `GET /dashboard-stats`

Obtiene las estadísticas del dashboard.

**Respuesta:**

```json
{
  "totalUsers": 10,
  "reportsGenerated": 5,
  "siteVisits": 1000,
  "openIssues": 10
}
```

### Usuarios

#### `GET /users`

Obtiene la lista de todos los usuarios.

**Respuesta:**

```json
[
  {
    "id": 1,
    "nombre_usuario": "admin",
    "email": "admin@example.com",
    "role": "ROLE_ADMIN",
    "status": "Activo"
  }
]
```

#### `GET /users/{id}`

Obtiene un usuario por su ID.

**Respuesta:**

```json
{
  "id": 1,
  "nombre_usuario": "admin",
  "email": "admin@example.com",
  "role": "ROLE_ADMIN",
  "status": "Activo"
}
```

#### `POST /users`

Crea un nuevo usuario.

**Petición:**

```json
{
  "nombre_usuario": "test",
  "email": "test@example.com",
  "password": "password",
  "role": "ROLE_USER"
}
```

**Respuesta:**

```json
{
  "id": 2,
  "nombre_usuario": "test",
  "email": "test@example.com",
  "role": "ROLE_USER",
  "status": "Activo"
}
```

#### `PUT /users/{id}`

Actualiza un usuario existente.

**Petición:**

```json
{
  "nombre_usuario": "test2",
  "email": "test2@example.com",
  "password": "new_password", // Opcional
  "role": "ROLE_USER"
}
```

**Respuesta:**

```json
{
  "id": 2,
  "nombre_usuario": "test2",
  "email": "test2@example.com",
  "role": "ROLE_USER",
  "status": "Activo"
}
```

#### `DELETE /users/{id}`

Elimina un usuario.

### Reportes

#### `GET /reports`

Obtiene la lista de todos los reportes.

**Respuesta:**

```json
[
  {
    "id": 1,
    "title": "Reporte de ventas",
    "user": "admin",
    "date": "2025-10-05T08:53:14.000+00:00"
  }
]
```

#### `GET /reports/{id}`

Obtiene un reporte por su ID.

**Respuesta:**

```json
{
  "id": 1,
  "title": "Reporte de ventas",
  "user": "admin",
  "date": "2025-10-05T08:53:14.000+00:00"
}
```

#### `DELETE /reports/{id}`

Elimina un reporte.
