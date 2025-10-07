---
sidebar_label: 'UsersTable'
---

# Componente UsersTable

**Ruta del archivo:** `src/components/admin/UsersTable.jsx`

## Descripción

Este archivo contiene el componente de la tabla de usuarios para la sección de administración. Un componente que muestra una tabla de usuarios con funcionalidades de crear, editar, eliminar y ver.

## Props

- **isCreateModalOpen**: `boolean` - Un booleano que indica si el modal de creación está abierto.
- **setIsCreateModalOpen**: `function` - La función para abrir o cerrar el modal de creación.
- **searchQuery**: `string` - La consulta de búsqueda para filtrar usuarios.

## Estado

- **users**: `Array<object>` - La lista de usuarios. Por defecto es `[]`.
- **loading**: `boolean` - Indica si se están cargando los usuarios. Por defecto es `true`.
- **error**: `string | null` - El mensaje de error si la carga de usuarios falla. Por defecto es `null`.
- **selectedUser**: `object | null` - El usuario seleccionado para editar o ver. Por defecto es `null`.
- **isEditModalOpen**: `boolean` - Controla si el modal de edición está abierto. Por defecto es `false`.
- **isViewModalOpen**: `boolean` - Controla si el modal de vista está abierto. Por defecto es `false`.
- **isConfirmModalOpen**: `boolean` - Controla si el modal de confirmación de eliminación está abierto. Por defecto es `false`.
- **userToDelete**: `string | null` - El ID del usuario a eliminar. Por defecto es `null`.
- **newUser**: `object` - El objeto para el nuevo usuario a crear.

## Retorna

- `{JSX.Element}`: La tabla de usuarios renderizada.

## Código Fuente

```jsx
import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser, createUser } from '@api/admin';
import ConfirmationModal from '../common/ConfirmationModal';

const UsersTable = ({ isCreateModalOpen, setIsCreateModalOpen, searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState({ nombre_usuario: '', email: '', password: '', role: 'ROLE_USER' });

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteRequest = (userId) => {
    setUserToDelete(userId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Attempting to delete user with ID:', userToDelete);
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        setUsers(users.filter((user) => user.id !== userToDelete));
      } catch (error) {
        alert(`Error al eliminar el usuario: ${error.message}`);
      }
    }
    setIsConfirmModalOpen(false);
    setUserToDelete(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const updatedUser = await updateUser(selectedUser.id, selectedUser);
      setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      alert('Error al actualizar el usuario.');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setIsCreateModalOpen(false);
      setNewUser({ nombre_usuario: '', email: '', password: '', role: 'ROLE_USER' });
      fetchUsers(); // Refresh users list
    } catch (error) {
      alert(`Error al crear el usuario: ${error.message}`);
    }
  };

  const handleModalChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const filteredUsers = users.filter(user =>
    user.nombre_usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="overflow-x-auto rounded-xl shadow-sm border border-border-light">
        <table className="w-full text-sm text-left text-subtext-light">
          <thead className="text-xs text-text-light uppercase bg-background-light">
            <tr>
              <th className="px-6 py-3" scope="col">Nombre</th>
              <th className="px-6 py-3" scope="col">Rol</th>
              <th className="px-6 py-3" scope="col">Estado</th>
              <th className="px-6 py-3 text-right" scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="bg-card-light border-b border-border-light">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img alt={user.nombre_usuario} className="h-10 w-10 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${user.id}`} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-light">{user.nombre_usuario}</div>
                      <div className="text-sm text-subtext-light">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(user)} className="p-2 rounded-lg hover:bg-gray-100 text-subtext-light"><span className="material-symbols-outlined text-base">edit</span></button>
                    <button onClick={() => handleDeleteRequest(user.id)} className="p-2 rounded-lg hover:bg-gray-100 text-subtext-light"><span className="material-symbols-outlined text-base">delete</span></button>
                    <button onClick={() => handleView(user)} className="p-2 rounded-lg hover:bg-gray-100 text-subtext-light"><span className="material-symbols-outlined text-base">visibility</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          message="¿Estás seguro de que quieres eliminar este usuario?"
        />

        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h2>
              <form onSubmit={handleCreateUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" name="nombre_usuario" value={newUser.nombre_usuario} onChange={handleNewUserChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" value={newUser.email} onChange={handleNewUserChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input type="password" name="password" value={newUser.password} onChange={handleNewUserChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Rol</label>
                  <select name="role" value={newUser.role} onChange={handleNewUserChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="ROLE_USER">User</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Crear</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
              <form onSubmit={handleUpdateUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" name="nombre_usuario" value={selectedUser.nombre_usuario} onChange={handleModalChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" value={selectedUser.email} onChange={handleModalChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Rol</label>
                  <input type="text" name="role" value={selectedUser.role} onChange={handleModalChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isViewModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Ver Usuario</h2>
              <div className="mb-4">
                <strong>Nombre:</strong> {selectedUser.nombre_usuario}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div className="mb-4">
                <strong>Rol:</strong> {selectedUser.role}
              </div>
              <div className="mb-4">
                <strong>Estado:</strong> {selectedUser.status}
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UsersTable;
```
