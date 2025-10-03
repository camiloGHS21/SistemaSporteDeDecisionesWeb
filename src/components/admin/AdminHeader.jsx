import React from 'react';

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-text-light">Usuarios</h2>
        <p className="text-subtext-light">Administrar usuarios y sus roles</p>
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <span className="material-symbols-outlined">add</span>
        <span>Añadir usuario</span>
      </button>
    </div>
  );
};

export default AdminHeader;
