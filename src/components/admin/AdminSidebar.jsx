import React from 'react';

const AdminSidebar = ({ currentView, setCurrentView }) => {
  const getLinkClass = (view) => {
    return `flex items-center gap-3 px-3 py-2 rounded-lg ${currentView === view ? 'bg-primary/10 text-primary' : 'text-subtext-light hover:bg-primary/10 hover:text-primary'}`;
  };

  return (
    <aside className="w-64 bg-background-light flex flex-col border-r border-border-light">
      <div className="p-6">
        <h1 className="text-xl font-bold text-text-light">Panel de administración</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <a className={getLinkClass('dashboard')} href="#" onClick={() => setCurrentView('dashboard')}>
          <span className="material-symbols-outlined">dashboard</span>
          <span>Panel de control</span>
        </a>
        <a className={getLinkClass('users')} href="#" onClick={() => setCurrentView('users')}>
          <span className="material-symbols-outlined">group</span>
          <span>Usuarios</span>
        </a>
        <a className={getLinkClass('reports')} href="#" onClick={() => setCurrentView('reports')}>
          <span className="material-symbols-outlined">description</span>
          <span>Informes</span>
        </a>
      </nav>
    </aside>
  );
};
export default AdminSidebar;   