import React, { createContext, useContext, useState } from 'react';
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
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [carProducts, setCarProducts] = useState<ProductType[]>(dataProducts);
  const [homeProducts, setHomeProducts] = useState<ProductType[]>(dataProducts);
  const [electronicsProducts, setElectronicsProducts] = useState<ProductType[]>(dataProducts);
  const [terrainProducts, setTerrainProducts] = useState<ProductType[]>(dataProducts);


  const addProduct = (product: ProductType) => {
    const newProduct = {
      ...product,
      status: product.status || "none", // Défaut si aucun état fourni
    };
  
    setProducts([...products, newProduct]);
  
    // Ajouter également dans la catégorie correspondante
    if (newProduct.isVoiture) setCarProducts([...carProducts, newProduct]);
    if (newProduct.isHome) setHomeProducts([...homeProducts, newProduct]);
    if (newProduct.isElectronic) setElectronicsProducts([...electronicsProducts, newProduct]);
    if (newProduct.isTerrain) setTerrainProducts([...terrainProducts, newProduct]);
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
