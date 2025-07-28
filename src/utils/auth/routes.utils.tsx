import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('access_token'); 
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export {}; 
