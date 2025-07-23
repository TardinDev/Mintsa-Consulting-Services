import { useEffect } from 'react';
import { useUser, useAuth as useClerkAuthHook } from '@clerk/clerk-react';
import { useAuthStore } from '../stores/authStore';

export const useClerkAuth = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuthHook();
  
  const { 
    user: storeUser, 
    isAuthenticated, 
    isAdmin, 
    setUser, 
    setLoaded, 
    logout: storeLogout 
  } = useAuthStore();

  // Synchroniser Clerk avec Zustand
  useEffect(() => {
    setLoaded(isLoaded);
    
    if (isLoaded && user) {
      const userData = {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      };
      setUser(userData);
    } else if (isLoaded && !user) {
      setUser(null);
    }
  }, [user, isLoaded, setUser, setLoaded]);

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await signOut();
      storeLogout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return {
    user: storeUser,
    isAuthenticated,
    isLoaded,
    isAdmin,
    logout,
  };
}; 