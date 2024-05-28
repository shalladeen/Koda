import React from 'react';
import { useAuth } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/SignupPage" />;
  }

  return children;
};

export default RequireAuth;
