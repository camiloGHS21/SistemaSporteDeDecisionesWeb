import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        logout(); // Ensure all state is cleared if no token is found
        setIsLoading(false);
        return;
      }

      try {
        // 1. Validate general token
        const authResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/validate`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!authResponse.ok) {
          logout(); // Token is invalid, logout
          return;
        }

        // If validation is successful, we can be sure we are authenticated.
        // This might be redundant if the initial state is already set, but it's safe.
        if (!isAuthenticated) setIsAuthenticated(true);

        // 2. Validate if admin
        const adminResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/auth/validate`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (adminResponse.ok) {
          const isAdminResponse = await adminResponse.json();
          setIsAdmin(isAdminResponse === true);
        }
      } catch (error) {
        console.error('Error during session validation:', error);
        logout(); // Logout on any error
      } finally {
        setIsLoading(false);
      }
    };

    // The effect should run if the initial state is authenticated, or when isAuthenticated changes.
    if (isAuthenticated) {
      validateSession();
    } else {
      // Not authenticated, so we are done loading and there is no admin.
      setIsAdmin(false);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};