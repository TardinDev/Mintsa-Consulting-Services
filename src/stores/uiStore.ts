import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  // État
  isAdminPanelVisible: boolean;
  activeTab: "all" | "voiture" | "home" | "electronic" | "terrain";
  selectedProductForEdit: any | null;
  selectedProductForDetails: any | null;
  
  // Actions
  toggleAdminPanel: () => void;
  setAdminPanelVisible: (visible: boolean) => void;
  setActiveTab: (tab: "all" | "voiture" | "home" | "electronic" | "terrain") => void;
  setSelectedProductForEdit: (product: any | null) => void;
  setSelectedProductForDetails: (product: any | null) => void;
  closeDetailsModal: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // État initial
      isAdminPanelVisible: false,
      activeTab: 'all',
      selectedProductForEdit: null,
      selectedProductForDetails: null,

      // Actions
      toggleAdminPanel: () => {
        set((state) => ({
          isAdminPanelVisible: !state.isAdminPanelVisible,
        }));
      },

      setAdminPanelVisible: (visible: boolean) => {
        set({ isAdminPanelVisible: visible });
      },

      setActiveTab: (tab: "all" | "voiture" | "home" | "electronic" | "terrain") => {
        set({ activeTab: tab });
      },

      setSelectedProductForEdit: (product: any | null) => {
        set({ selectedProductForEdit: product });
      },

      setSelectedProductForDetails: (product: any | null) => {
        set({ selectedProductForDetails: product });
      },

      closeDetailsModal: () => {
        set({ selectedProductForDetails: null });
      },
    }),
    {
      name: 'mintsa-ui-storage',
      partialize: (state) => ({
        isAdminPanelVisible: state.isAdminPanelVisible,
        activeTab: state.activeTab,
      }),
    }
  )
); 