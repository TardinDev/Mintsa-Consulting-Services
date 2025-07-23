import React, { createContext, useContext, useCallback } from 'react';
import { useUser, useAuth as useClerkAuthHook } from '@clerk/clerk-react';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt: Date;
}

interface ClerkAuthContextType {
  isAuthenticated: boolean;
  isLoaded: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  isAdmin: boolean;
}

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

// Liste des emails admin autorisés
const ADMIN_EMAILS = [
  'tardindavy@gmail.com',
  'mintsaservicesc@gmail.com',
  // Ajoutez d'autres emails admin si nécessaire
];

export const ClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuthHook();

  const isAuthenticated = isLoaded && !!user;

  const isAdmin = React.useMemo(() => {
    if (!isLoaded || !user) return false;
    
    const userEmail = user.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (!userEmail) return false;
    
    return ADMIN_EMAILS.includes(userEmail);
  }, [user, isLoaded]);

  const login = useCallback(() => {
    // Cette fonction est maintenant gérée par Clerk
    // Elle peut être utilisée pour des actions post-connexion
    console.log('Utilisateur connecté via Clerk');
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }, [signOut]);

  const currentUser: User | null = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
  } : null;

  return (
    <ClerkAuthContext.Provider value={{ 
      isAuthenticated, 
      isLoaded, 
      user: currentUser, 
      login, 
      logout,
      isAdmin 
    }}>
      {children}
    </ClerkAuthContext.Provider>
  );
};

export const useClerkAuth = (): ClerkAuthContextType => {
  const context = useContext(ClerkAuthContext);
  if (!context) {
    throw new Error('useClerkAuth must be used within a ClerkAuthProvider');
  }
  return context;
}; 