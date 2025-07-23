import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt: Date;
}

interface AuthStore {
  // État
  user: User | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  isAdmin: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoaded: (loaded: boolean) => void;
  logout: () => void;
}

// Liste des emails admin autorisés
const ADMIN_EMAILS = [
  'tardindavy@gmail.com',
  'mintsaservicesc@gmail.com',
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      isAuthenticated: false,
      isLoaded: false,
      isAdmin: false,

      // Actions
      setUser: (user: User | null) => {
        const isAdmin = user ? ADMIN_EMAILS.includes(user.email.toLowerCase()) : false;
        
        set({
          user,
          isAuthenticated: !!user,
          isAdmin,
        });
      },

      setAuthenticated: (authenticated: boolean) => {
        set({ isAuthenticated: authenticated });
      },

      setLoaded: (loaded: boolean) => {
        set({ isLoaded: loaded });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
    }),
    {
      name: 'mintsa-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
); 