import React from 'react';

const UsersTable = ({ users }) => {
  return (
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
          {users.map((user, index) => (
            <tr key={index} className="bg-card-light border-b border-border-light">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img alt={user.name} className="h-10 w-10 rounded-full object-cover" src={user.imageUrl} />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-text-light">{user.name}</div>
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
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-subtext-light"><span className="material-symbols-outlined text-base">edit</span></button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-subtext-light"><span className="material-symbols-outlined text-base">delete</span></button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-subtext-light"><span className="material-symbols-outlined text-base">visibility</span></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
