import React, { useState } from 'react';

const SettingsSection = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings />;
            case 'preferences':
                return <p>Preferencias en construcción</p>;
            case 'notifications':
                return <p>Notificaciones en construcción</p>;
            case 'security':
                return <p>Seguridad en construcción</p>;
            default:
                return <ProfileSettings />;
        }
    };

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Configuración</h2>
                <p className="text-subtext-light dark:text-subtext-dark">Administra tu perfil, preferencias y seguridad</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="lg:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </main>
    );
};

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
    const getLinkClass = (tab) => 
        `flex items-center px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-gray-100 dark:bg-gray-700 text-primary font-semibold' : 'text-subtext-light dark:text-subtext-dark hover:bg-gray-100 dark:hover:bg-gray-700'}`;

    return (
        <nav className="space-y-1">
            <a className={getLinkClass('profile')} href="#" onClick={() => setActiveTab('profile')}>
                <span className="material-icons mr-3">person</span>
                Perfil
            </a>
            <a className={getLinkClass('preferences')} href="#" onClick={() => setActiveTab('preferences')}>
                <span className="material-icons mr-3">tune</span>
                Preferencias
            </a>
            <a className={getLinkClass('notifications')} href="#" onClick={() => setActiveTab('notifications')}>
                <span className="material-icons mr-3">notifications</span>
                Notificaciones
            </a>
            <a className={getLinkClass('security')} href="#" onClick={() => setActiveTab('security')}>
                <span className="material-icons mr-3">security</span>
                Seguridad
            </a>
        </nav>
    );
};

const ProfileSettings = () => (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm">
        <div className="border-b border-border-light dark:border-border-dark pb-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Perfil</h3>
            <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <span className="material-icons text-5xl text-subtext-light dark:text-subtext-dark">person</span>
                </div>
                <div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">Cambiar foto</button>
                    <button className="text-subtext-light dark:text-subtext-dark hover:text-red-500 px-4 py-2 rounded-lg text-sm">Eliminar</button>
                </div>
            </div>
        </div>
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
                    <input className="w-full pl-3 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary" id="name" type="text" defaultValue="Carlos Mendoza" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Correo electrónico</label>
                    <input className="w-full pl-3 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary" id="email" type="email" defaultValue="carlos.mendoza@example.com" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="bio">Biografía</label>
                <textarea className="w-full pl-3 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary" id="bio" rows="3" defaultValue="Administrador de políticas públicas con experiencia en análisis de datos y desarrollo de estrategias digitales."></textarea>
            </div>
            <div className="flex justify-end pt-4">
                <button className="text-subtext-light dark:text-subtext-dark px-4 py-2 rounded-lg mr-2" type="button">Cancelar</button>
                <button className="bg-primary text-white px-4 py-2 rounded-lg" type="submit">Guardar cambios</button>
            </div>
        </form>
    </div>
);

export default SettingsSection;
