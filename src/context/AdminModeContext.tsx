import React, { createContext, useContext, useState, useEffect } from 'react';
import { useClerkAuth } from './ClerkAuthContext';

interface AdminModeContextType {
  isAdminPanelVisible: boolean;
  toggleAdminPanel: () => void;
  showAdminPanel: () => void;
  hideAdminPanel: () => void;
}

const AdminModeContext = createContext<AdminModeContextType | undefined>(undefined);

export const AdminModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isAuthenticated } = useClerkAuth();
  const [isAdminPanelVisible, setIsAdminPanelVisible] = useState(false);

  // Afficher automatiquement le panneau admin pour les admins connectés
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      setIsAdminPanelVisible(true);
    } else {
      setIsAdminPanelVisible(false);
    }
  }, [isAuthenticated, isAdmin]);

  const toggleAdminPanel = () => {
    if (isAdmin) {
      setIsAdminPanelVisible(prev => !prev);
    }
  };

  const showAdminPanel = () => {
    if (isAdmin) {
      setIsAdminPanelVisible(true);
    }
  };

  const hideAdminPanel = () => {
    setIsAdminPanelVisible(false);
  };

  return (
    <AdminModeContext.Provider value={{
      isAdminPanelVisible,
      toggleAdminPanel,
      showAdminPanel,
      hideAdminPanel
    }}>
      {children}
    </AdminModeContext.Provider>
  );
};

export const useAdminMode = (): AdminModeContextType => {
  const context = useContext(AdminModeContext);
  if (!context) {
    throw new Error('useAdminMode must be used within an AdminModeProvider');
  }
  return context;
}; 