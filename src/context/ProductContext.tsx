import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductType } from '../utils/type/type';
import dataProducts from '../utils/data/dataProducts'

type ProductContextType = {
  products: ProductType[];
  carProducts: ProductType[];
  homeProducts: ProductType[];
  electronicsProducts: ProductType[];
  terrainProducts: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setCarProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setHomeProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setElectronicsProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setTerrainProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  addProduct: (product: ProductType) => void;
  deleteProduct: (productId: number) => void;
  updateProduct: (product: ProductType) => void;
  resetToDefaultData: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Clés pour localStorage
const STORAGE_KEYS = {
  PRODUCTS: 'mintsa_products',
  CAR_PRODUCTS: 'mintsa_car_products',
  HOME_PRODUCTS: 'mintsa_home_products',
  ELECTRONICS_PRODUCTS: 'mintsa_electronics_products',
  TERRAIN_PRODUCTS: 'mintsa_terrain_products',
};

// Fonction pour charger les données depuis localStorage
const loadFromStorage = (key: string, defaultValue: ProductType[]): ProductType[] => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      // Si aucune donnée n'existe, sauvegarder les données par défaut
      saveToStorage(key, defaultValue);
      return defaultValue;
    }
  } catch (error) {
    console.error(`Erreur lors du chargement de ${key}:`, error);
    return defaultValue;
  }
};

// Fonction pour sauvegarder dans localStorage
const saveToStorage = (key: string, data: ProductType[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde de ${key}:`, error);
  }
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialiser les états avec les données du localStorage ou les données par défaut
  const [products, setProducts] = useState<ProductType[]>(() => 
    loadFromStorage(STORAGE_KEYS.PRODUCTS, [])
  );
  
  const [carProducts, setCarProducts] = useState<ProductType[]>(() => 
    loadFromStorage(STORAGE_KEYS.CAR_PRODUCTS, dataProducts)
  );
  
  const [homeProducts, setHomeProducts] = useState<ProductType[]>(() => 
    loadFromStorage(STORAGE_KEYS.HOME_PRODUCTS, dataProducts)
  );
  
  const [electronicsProducts, setElectronicsProducts] = useState<ProductType[]>(() => 
    loadFromStorage(STORAGE_KEYS.ELECTRONICS_PRODUCTS, dataProducts)
  );
  
  const [terrainProducts, setTerrainProducts] = useState<ProductType[]>(() => 
    loadFromStorage(STORAGE_KEYS.TERRAIN_PRODUCTS, dataProducts)
  );

  // Sauvegarder automatiquement les changements dans localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CAR_PRODUCTS, carProducts);
  }, [carProducts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.HOME_PRODUCTS, homeProducts);
  }, [homeProducts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ELECTRONICS_PRODUCTS, electronicsProducts);
  }, [electronicsProducts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TERRAIN_PRODUCTS, terrainProducts);
  }, [terrainProducts]);

  const addProduct = (product: ProductType) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Utiliser timestamp pour un ID unique
      status: product.status || "none",
    };
  
    setProducts(prev => [...prev, newProduct]);
  
    // Ajouter également dans la catégorie correspondante
    if (newProduct.isVoiture) {
      setCarProducts(prev => [...prev, newProduct]);
    }
    if (newProduct.isHome) {
      setHomeProducts(prev => [...prev, newProduct]);
    }
    if (newProduct.isElectronic) {
      setElectronicsProducts(prev => [...prev, newProduct]);
    }
    if (newProduct.isTerrain) {
      setTerrainProducts(prev => [...prev, newProduct]);
    }
  };

  const deleteProduct = (productId: number) => {
    // Supprimer de la liste générale
    setProducts(prev => prev.filter(p => p.id !== productId));
    
    // Supprimer de toutes les catégories
    setCarProducts(prev => prev.filter(p => p.id !== productId));
    setHomeProducts(prev => prev.filter(p => p.id !== productId));
    setElectronicsProducts(prev => prev.filter(p => p.id !== productId));
    setTerrainProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProduct = (updatedProduct: ProductType) => {
    // Mettre à jour dans la liste générale
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    
    // Mettre à jour dans les catégories appropriées
    if (updatedProduct.isVoiture) {
      setCarProducts(prev => 
        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    }
    if (updatedProduct.isHome) {
      setHomeProducts(prev => 
        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    }
    if (updatedProduct.isElectronic) {
      setElectronicsProducts(prev => 
        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    }
    if (updatedProduct.isTerrain) {
      setTerrainProducts(prev => 
        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    }
  };

  const resetToDefaultData = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs par défaut ? Cette action ne peut pas être annulée.")) {
      setProducts([]);
      setCarProducts(dataProducts);
      setHomeProducts(dataProducts);
      setElectronicsProducts(dataProducts);
      setTerrainProducts(dataProducts);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        carProducts,
        homeProducts,
        electronicsProducts,
        terrainProducts,
        setProducts,
        setCarProducts,
        setHomeProducts,
        setElectronicsProducts,
        setTerrainProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        resetToDefaultData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
