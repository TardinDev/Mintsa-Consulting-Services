import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import ProductDetailsModal from './productDetailsModal';
import dataproducts from '../../../utils/data/dataproducts';

type Product = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  isRecent: boolean;
  isBestSeller: boolean;
};

const Catalogue: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'bestSeller'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = dataproducts.filter((product: Product) => {
    if (activeTab === 'recent') return product.isRecent;
    if (activeTab === 'bestSeller') return product.isBestSeller;
    return true;
  });

  const handleDetailsClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Container>
      <Tabs>
        <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All</Tab>
        <Tab active={activeTab === 'recent'} onClick={() => setActiveTab('recent')}>Recent</Tab>
        <Tab active={activeTab === 'bestSeller'} onClick={() => setActiveTab('bestSeller')}>Le plus vendu</Tab>
      </Tabs>

      <CardContainer>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
            onDetailsClick={() => handleDetailsClick(product)}
          />
        ))}
      </CardContainer>

      {selectedProduct && (
        <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
      )}
    </Container>
  );
};

// Styles
const Container = styled.div`
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  gap:4px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#333' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ddd;
  }
`;

const CardContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export default Catalogue;
