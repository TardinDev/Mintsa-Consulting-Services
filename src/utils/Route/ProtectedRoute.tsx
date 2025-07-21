import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {

    // Si l'utilisateur n'est pas authentifié, redirige-le vers la page de connexion
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié, affiche le composant enfant
  return children;
};

export default ProtectedRoute;
