import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NotFound from '@pages/NotFound'; // Import NotFound

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/admin/auth/validate', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error validating admin status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    validateAdmin();
  }, []);

  if (isLoading) {
    return <div>Verificando acceso...</div>; // Or a proper loading spinner
  }

  return isAdmin ? <Outlet /> : <NotFound />;
};

export default AdminRoute;