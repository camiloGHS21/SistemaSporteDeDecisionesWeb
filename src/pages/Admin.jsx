

import React, { useState } from 'react';
import AdminSidebar from '@components/admin/AdminSidebar';
import AdminHeader from '@components/admin/AdminHeader';
import UserSearchBar from '@components/admin/UserSearchBar';
import UsersTable from '@components/admin/UsersTable';
import ReportsSection from '@components/admin/ReportsSection';
import DashboardSection from '@components/admin/DashboardSection';

const Admin = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="admin-theme flex h-screen bg-background-light font-display">
      <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
      {currentView === 'dashboard' && <DashboardSection />}
      {currentView === 'reports' && <ReportsSection />} 
      {currentView === 'users' && (
        <main className="flex-1 p-8 overflow-y-auto">
          <AdminHeader onAddUser={() => setIsCreateModalOpen(true)} />
          <UserSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <UsersTable isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen} searchQuery={searchQuery} />
        </main>
      )}
    </div>
  );
};

export default Admin;