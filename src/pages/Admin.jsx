

import React, { useState } from 'react';
import Header from '../components/common/Header';
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

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardSection />;
      case 'reports':
        return <ReportsSection />;
      case 'users':
        return (
          <>
            <AdminHeader onAddUser={() => setIsCreateModalOpen(true)} />
            <UserSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <UsersTable isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen} searchQuery={searchQuery} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-light font-display">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;