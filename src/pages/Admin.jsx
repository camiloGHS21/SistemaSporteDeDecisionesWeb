import React from 'react';
import AdminSidebar from '@components/admin/AdminSidebar';
import AdminHeader from '@components/admin/AdminHeader';
import UserSearchBar from '@components/admin/UserSearchBar';
import UsersTable from '@components/admin/UsersTable';
import ReportsSection from '@components/admin/ReportsSection';

const Admin = () => {
  const users = [
    {
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@example.com',
      role: 'Administrador',
      status: 'Activo',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChs5KnisLr8aXctJYFP62J8JjA7fy7WKTJBhaDM9Aiu03ZR7VoQnRkroeo9RFF_Vr0rhFFkmPVKJLvG_5AkTNz5loV6KIJnvdIWCQVc0mvNtw_2I3KAwUe7YkfX0ltM7lBuU_VSjTse21sOS4gAYyYUCwzMhhUGja3djZPJdCZt2EYSXY7sZlDpOy2kHWV_kZiDKg20mwctm9t26AEegUmR4sqUlSNBsNRA5LlgnInvCniwGW9C3JIzdJa6mOz2m2uRqJUQlG9aUA',
    },
    {
      name: 'Sofía Ramirez',
      email: 'sofia.ramirez@example.com',
      role: 'Editor',
      status: 'Activo',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAik7xIwnWhNo121JuNMWNG6gDQkxVMRyE32WgUl10HApkRMKsVUS-0egQjpAhM2n19BoIAvATuyI3l6yp2ZoXN3_GR48-BmuDRCfZ6OpoJ3CpXvc6XoIC6XFAjXRJOPk1Ve6l0bwEWebapCcIw4ozybOjbmuZE9_GIhViaJerIx2LpPb2p90coR6FtS-iM7vp2EWPubPoO-qcDZJXWhcgIadzWgbCyVDVg2X1xbc7tQTf688T-Ut7e5cMTdJNZsPJyT7bWk0rmWN0',
    },
    {
      name: 'Diego Torres',
      email: 'diego.torres@example.com',
      role: 'Lector',
      status: 'Inactivo',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6al4o2HPDbwxxkAx_VSvkbdj96UsXRYuuJwXX_asWuENLoNpkm7kjVj1uuzSHSNELDOitYpkwZfoXrp5dkyrsYKFYUzBzEelW_LEEbUf677b2jsxZcUC7Keob23PJZaCmncYIM1xCQSSHUYUsGTFovMiiS6dKoKMQqIR9ni8Wc_Ufu7WaIvMz8MS08-Qpz343SzWFBhYybJvaWleHxbamaphITsIFb1QeGil4Ej4pQ6jXaE_awiMNEvnwAWsAZapmwBSP5kbT9XE',
    },
  ];

  const reports = [
    {
      title: 'Informe de políticas digitales',
      user: 'Carlos Mendoza',
      date: '2024-07-26',
    },
    {
      title: 'Análisis comparativo de países',
      user: 'Sofía Ramirez',
      date: '2024-07-20',
    },
    {
      title: 'Evaluación de impacto de políticas',
      user: 'Isabel Vargas',
      date: '2024-07-15',
    },
  ];

  return (
    <div className="admin-theme flex h-screen bg-background-light font-display">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <AdminHeader />
        <UserSearchBar />
        <UsersTable users={users} />
        <ReportsSection reports={reports} />
      </main>
    </div>
  );
};

export default Admin;