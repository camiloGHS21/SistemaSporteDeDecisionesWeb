import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // The user is authenticated if a token exists.
  // The actual validation will happen in the ProtectedRoute.
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
