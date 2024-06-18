import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, logout, fetchUser, authLogin } from '../../services/authService';
import { updateProfile } from '../../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (getToken()) {
        const userData = await fetchUser();
        if (userData) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };
    initializeAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    setIsLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const login = async (email, password) => {
    const response = await authLogin(email, password);
    if (response.token) {
      const userData = await fetchUser();
      setUser(userData);
      setIsLoggedIn(true);
    }
  };

  const updateUserProfile = async (updates) => {
    const updatedUser = await updateProfile(updates);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout, login, isLogoutDialogOpen, closeLogoutDialog, user, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
