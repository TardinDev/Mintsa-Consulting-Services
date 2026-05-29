import React from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import { ProductType } from '../../../utils/type/type';
import theme from '../../../utils/Theme/theme';

type ProductDetailsModalProps = {
  product: ProductType | null;
  onClose: () => void;
};

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Fermer">×</CloseButton>

        <ModalContent>
          <ImageSection>
            <ImageGallery images={product.images} alt={product.name} />
          </ImageSection>

          <DetailsSection>
            <StatusBadge $status={product.status}>
              {product.status}
            </StatusBadge>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <PriceContainer>
              <PriceLabel>Prix</PriceLabel>
              <PriceValue>{product.price.toLocaleString()} <PriceUnit>FCFA</PriceUnit></PriceValue>
            </PriceContainer>
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
  background: rgba(7, 5, 4, 0.78);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: overlayIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background: ${theme.gray100};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.xl};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: ${theme.shadowXl};
  animation: modalIn 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(20, 17, 14, 0.6);
  border: 1px solid ${theme.lineStrong};
  border-radius: 50%;
  width: 2.4rem;
  height: 2.4rem;
  font-size: 1.4rem;
  line-height: 1;
  color: ${theme.gray800};
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${theme.copperLine};
    color: ${theme.secondaryLight};
    transform: scale(1.08);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 2px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageSection = styled.div`
  height: 58vh;
  overflow: hidden;
  flex: 3;
  background: ${theme.gray200};
`;

const DetailsSection = styled.div`
  padding: 1.75rem 2rem 2rem;
  flex: 1;
  background: ${theme.gray100};
  border-top: 1px solid ${theme.line};
`;

const ProductName = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.4rem, 2.6vw, 1.8rem);
  font-weight: 600;
  color: ${theme.white};
  margin: 0 0 0.6rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

const ProductDescription = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  font-size: 0.92rem;
  line-height: 1.65;
  margin: 0 0 1.25rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${theme.line};
`;

const PriceLabel = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.7rem;
  color: ${theme.gray500};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const PriceValue = styled.span`
  font-family: ${theme.fontDisplay};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.gray900};
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum';
`;

const PriceUnit = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.primary};
  letter-spacing: 0.04em;
`;

const statusToColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'disponible':
      return theme.success;
    case 'vendu':
      return theme.primary;
    case 'en_location':
      return theme.warning;
    case 'épuisé':
      return theme.error;
    default:
      return theme.gray500;
  }
};

const StatusBadge = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
  padding: 0.34rem 0.8rem 0.34rem 0.7rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 0.66rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(20, 17, 14, 0.4);
  border: 1px solid ${({ $status }) => `${statusToColor($status)}40`};
  color: ${({ $status }) => statusToColor($status)};

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ $status }) => statusToColor($status)};
    box-shadow: 0 0 8px ${({ $status }) => `${statusToColor($status)}80`};
  }
`;
