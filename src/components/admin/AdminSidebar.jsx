import React from 'react';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-background-light flex flex-col border-r border-border-light">
      <div className="p-6">
        <h1 className="text-xl font-bold text-text-light">Panel de administración</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <a className="flex items-center gap-3 px-3 py-2 text-subtext-light hover:bg-primary/10 hover:text-primary rounded-lg" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span>Panel de control</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg" href="#">
          <span className="material-symbols-outlined">group</span>
          <span>Usuarios</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-subtext-light hover:bg-primary/10 hover:text-primary rounded-lg" href="#">
          <span className="material-symbols-outlined">description</span>
          <span>Informes</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-subtext-light hover:bg-primary/10 hover:text-primary rounded-lg" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span>Configuración</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-subtext-light hover:bg-primary/10 hover:text-primary rounded-lg" href="#">
          <span className="material-symbols-outlined">help</span>
          <span>Ayuda</span>
        </a>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
