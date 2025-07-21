import React, { createContext, useContext, useState, ReactNode } from 'react';

type AdminModeContextType = {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  
};

const AdminModeContext = createContext<AdminModeContextType | undefined>(undefined);

export const AdminModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
  };

  

  return (
    <AdminModeContext.Provider value={{ isAdminMode, toggleAdminMode,  }}>
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
