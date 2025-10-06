import React from 'react';
import { Outlet } from 'react-router-dom';
import NotFound from '@pages/NotFound'; // Import NotFound
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando acceso...</div>; // Or a proper loading spinner
  }

  return isAuthenticated && isAdmin ? <Outlet /> : <NotFound />;
};

export default AdminRoute;