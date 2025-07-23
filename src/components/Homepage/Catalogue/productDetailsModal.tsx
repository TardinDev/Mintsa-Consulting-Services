import React from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import { ProductType } from '../../../utils/type/type';

type ProductDetailsModalProps = {
  product: ProductType | null;
  onClose: () => void;
};

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ModalContent>
          <ImageSection>
            <ImageGallery images={product.images} alt={product.name} />
          </ImageSection>
          
          <DetailsSection>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <PriceContainer>
              <PriceLabel>Prix :</PriceLabel>
              <PriceValue>{product.price.toLocaleString()} FCFA</PriceValue>
            </PriceContainer>
            <StatusBadge status={product.status}>
              {product.status}
            </StatusBadge>
          </DetailsSection>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default ProductDetailsModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageSection = styled.div`
  height: 60vh;
  overflow: hidden;
  flex: 3;
`;

const DetailsSection = styled.div`
  padding: 1.5rem;
  flex: 1;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const ProductName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const PriceLabel = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
`;

const PriceValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e40af;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ status }) => {
    switch (status.toLowerCase()) {
      case 'disponible':
        return '#dcfce7';
      case 'vendu':
        return '#fee2e2';
      case 'en_location':
        return '#fef3c7';
      case 'épuisé':
        return '#f3f4f6';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${({ status }) => {
    switch (status.toLowerCase()) {
      case 'disponible':
        return '#166534';
      case 'vendu':
        return '#991b1b';
      case 'en_location':
        return '#92400e';
      case 'épuisé':
        return '#374151';
      default:
        return '#374151';
    }
  }};
`;
