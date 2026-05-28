import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useClerkAuth } from '../../../hooks/useClerkAuth';
import theme from '../../../utils/Theme/theme';
import ImageGallery from './ImageGallery';

interface ProductCardProps {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: number;
  status: string;
  onDetailsClick: () => void;
  onDelete: () => void;
  onEditClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  images,
  name,
  description,
  price,
  status,
  onDetailsClick,
  onDelete,
  onEditClick,
}) => {
  const { isAuthenticated, isAdmin } = useClerkAuth();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible': return theme.success;
      case 'vendu': return theme.primary;
      case 'en_location': return theme.warning;
      case 'épuisé': return theme.error;
      default: return theme.success;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible': return `${theme.success}18`;
      case 'vendu': return `${theme.primary}18`;
      case 'en_location': return `${theme.warning}18`;
      case 'épuisé': return `${theme.error}18`;
      default: return `${theme.success}18`;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'none': return 'Disponible';
      case 'vendu': return 'Vendu';
      case 'en_location': return 'En location';
      case 'épuisé': return 'Épuisé';
      default: return status;
    }
  };

  return (
    <CardContainer role="article" aria-label={`Service: ${name}`}>
      <ImageContainer>
        <ImageGallery images={images} alt={name} onImageClick={onDetailsClick} />
        <ImageOverlay>
          <ViewButton onClick={onDetailsClick} aria-label={`Voir les details de ${name}`}>
            <FaEye size={16} aria-hidden="true" />
            Details
          </ViewButton>
        </ImageOverlay>
        <StatusBadge
          $statusColor={getStatusColor(status)}
          $statusBgColor={getStatusBgColor(status)}
          aria-label={`Statut: ${getStatusText(status)}`}
        >
          {getStatusText(status)}
        </StatusBadge>
      </ImageContainer>

      <CardContent>
        <ProductName>{name}</ProductName>
        <ProductDescription>{description}</ProductDescription>

        <PriceContainer>
          <PriceLabel>Prix</PriceLabel>
          <PriceValue aria-label={`Prix: ${price.toLocaleString()} FCFA`}>
            {price.toLocaleString()} <PriceUnit>FCFA</PriceUnit>
          </PriceValue>
        </PriceContainer>

        {isAuthenticated && isAdmin && (
          <AdminControls>
            <AdminButton onClick={onEditClick} $variant="edit" aria-label={`Modifier ${name}`}>
              <FaEdit size={13} aria-hidden="true" />
              Modifier
            </AdminButton>
            <AdminButton onClick={onDelete} $variant="delete" aria-label={`Supprimer ${name}`}>
              <FaTrash size={13} aria-hidden="true" />
              Supprimer
            </AdminButton>
          </AdminControls>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ProductCard;

const CardContainer = styled.div`
  background: ${theme.gray100};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  max-width: 300px;
  border: 1px solid ${theme.line};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.copperLine};
    box-shadow: ${theme.shadowMd};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${theme.gray200};

  ${CardContainer}:hover & {
    img {
      transform: scale(1.05);
    }
  }

  img {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 160px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 200px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(14, 11, 9, 0) 35%, rgba(14, 11, 9, 0.78) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0.85rem;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 3;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled.button`
  background: ${theme.gradientGold};
  color: ${theme.black};
  border: none;
  padding: 0.5rem 1.1rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.78rem;
  letter-spacing: 0.01em;
  transform: translateY(6px);
  transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 0.3s ease;
  box-shadow: ${theme.shadowCopper};

  ${CardContainer}:hover & {
    transform: translateY(0);
  }

  &:hover {
    box-shadow: 0 14px 38px rgba(199, 123, 59, 0.42);
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondaryLight};
    outline-offset: 2px;
  }
`;

const StatusBadge = styled.div<{ $statusColor: string; $statusBgColor: string }>`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(14, 11, 9, 0.55);
  color: ${({ $statusColor }) => $statusColor};
  padding: 0.32rem 0.7rem 0.32rem 0.6rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ $statusColor }) => `${$statusColor}40`};
  z-index: 4;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ $statusColor }) => $statusColor};
    box-shadow: 0 0 8px ${({ $statusBgColor }) => $statusBgColor};
  }
`;

const CardContent = styled.div`
  padding: 1.1rem 1.15rem 1.15rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.45rem;
`;

const ProductName = styled.h3`
  font-family: ${theme.fontDisplay};
  font-size: 1.05rem;
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.25;
  letter-spacing: -0.015em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  transition: color 0.3s ease;

  ${CardContainer}:hover & {
    color: ${theme.secondaryLight};
  }
`;

const ProductDescription = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  font-size: 0.82rem;
  line-height: 1.55;
  margin: 0;
  padding-bottom: 0.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: 0.8rem;
  border-top: 1px solid ${theme.line};
  margin-top: auto;
`;

const PriceLabel = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.66rem;
  color: ${theme.gray500};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const PriceValue = styled.span`
  font-family: ${theme.fontDisplay};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.gray900};
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum';
`;

const PriceUnit = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  color: ${theme.primary};
  letter-spacing: 0.04em;
`;

const AdminControls = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${theme.line};
  margin-top: 0.5rem;
`;

const AdminButton = styled.button<{ $variant: 'edit' | 'delete' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.6rem;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  background: transparent;
  color: ${({ $variant }) => $variant === 'edit' ? theme.info : theme.error};
  border: 1px solid ${({ $variant }) => $variant === 'edit' ? `${theme.info}33` : `${theme.error}33`};

  &:hover {
    color: ${theme.white};
    background: ${({ $variant }) => $variant === 'edit' ? `${theme.info}22` : `${theme.error}22`};
    border-color: ${({ $variant }) => $variant === 'edit' ? theme.info : theme.error};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;
