import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '../utils/type/type';
import dataProducts from '../utils/data/dataProducts';

interface ProductStore {
  // État
  products: ProductType[];
  carProducts: ProductType[];
  homeProducts: ProductType[];
  electronicsProducts: ProductType[];
  terrainProducts: ProductType[];
  
  // Actions
  addProduct: (product: ProductType) => void;
  deleteProduct: (productId: number) => void;
  updateProduct: (product: ProductType) => void;
  resetToDefaultData: () => void;
  
  // Getters
  getProductsByCategory: (category: string) => ProductType[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      // État initial
      products: dataProducts,
      carProducts: dataProducts.filter(p => p.isVoiture),
      homeProducts: dataProducts.filter(p => p.isHome),
      electronicsProducts: dataProducts.filter(p => p.isElectronic),
      terrainProducts: dataProducts.filter(p => p.isTerrain),

      // Actions
      addProduct: (product: ProductType) => {
        const newProduct = {
          ...product,
          id: Date.now(),
          status: product.status || "none",
        };

        console.log('Ajout d\'un nouveau produit:', newProduct);

        set((state) => {
          const newProducts = [...state.products, newProduct];
          
          // Ajouter dans la catégorie correspondante
          let newCarProducts = state.carProducts;
          let newHomeProducts = state.homeProducts;
          let newElectronicsProducts = state.electronicsProducts;
          let newTerrainProducts = state.terrainProducts;

          if (newProduct.isVoiture) {
            newCarProducts = [...state.carProducts, newProduct];
          }
          if (newProduct.isHome) {
            newHomeProducts = [...state.homeProducts, newProduct];
          }
          if (newProduct.isElectronic) {
            newElectronicsProducts = [...state.electronicsProducts, newProduct];
          }
          if (newProduct.isTerrain) {
            newTerrainProducts = [...state.terrainProducts, newProduct];
          }

          return {
            products: newProducts,
            carProducts: newCarProducts,
            homeProducts: newHomeProducts,
            electronicsProducts: newElectronicsProducts,
            terrainProducts: newTerrainProducts,
          };
        });
      },

      deleteProduct: (productId: number) => {
        console.log('Suppression du produit avec ID:', productId);

        set((state) => ({
          products: state.products.filter(p => p.id !== productId),
          carProducts: state.carProducts.filter(p => p.id !== productId),
          homeProducts: state.homeProducts.filter(p => p.id !== productId),
          electronicsProducts: state.electronicsProducts.filter(p => p.id !== productId),
          terrainProducts: state.terrainProducts.filter(p => p.id !== productId),
        }));
      },

      updateProduct: (updatedProduct: ProductType) => {
        console.log('Mise à jour du produit:', updatedProduct);

        set((state) => {
          // Mettre à jour dans la liste générale
          const newProducts = state.products.map(p => 
            p.id === updatedProduct.id ? updatedProduct : p
          );

          // Mettre à jour dans les catégories appropriées
          let newCarProducts = state.carProducts.map(p => 
            p.id === updatedProduct.id ? updatedProduct : p
          );
          let newHomeProducts = state.homeProducts.map(p => 
            p.id === updatedProduct.id ? updatedProduct : p
          );
          let newElectronicsProducts = state.electronicsProducts.map(p => 
            p.id === updatedProduct.id ? updatedProduct : p
          );
          let newTerrainProducts = state.terrainProducts.map(p => 
            p.id === updatedProduct.id ? updatedProduct : p
          );

          return {
            products: newProducts,
            carProducts: newCarProducts,
            homeProducts: newHomeProducts,
            electronicsProducts: newElectronicsProducts,
            terrainProducts: newTerrainProducts,
          };
        });
      },

      resetToDefaultData: () => {
        if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs par défaut ? Cette action ne peut pas être annulée.")) {
          set({
            products: dataProducts,
            carProducts: dataProducts.filter(p => p.isVoiture),
            homeProducts: dataProducts.filter(p => p.isHome),
            electronicsProducts: dataProducts.filter(p => p.isElectronic),
            terrainProducts: dataProducts.filter(p => p.isTerrain),
          });
        }
      },

      // Getters
      getProductsByCategory: (category: string) => {
        const state = get();
        switch (category) {
          case 'voiture':
            return state.carProducts;
          case 'home':
            return state.homeProducts;
          case 'electronic':
            return state.electronicsProducts;
          case 'terrain':
            return state.terrainProducts;
          default:
            return state.products;
        }
      },
    }),
    {
      name: 'mintsa-products-storage',
      partialize: (state) => ({
        products: state.products,
        carProducts: state.carProducts,
        homeProducts: state.homeProducts,
        electronicsProducts: state.electronicsProducts,
        terrainProducts: state.terrainProducts,
      }),
    }
  )
); 