import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ClerkProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ClerkProtectedRoute: React.FC<ClerkProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, isLoaded, isAdmin } = useAuthStore();

  // Afficher un loader pendant le chargement
  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #ffffff',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Rediriger si non authentifié
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Rediriger si admin requis mais utilisateur non admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Afficher le contenu protégé
  return <>{children}</>;
};

export default ClerkProtectedRoute; 