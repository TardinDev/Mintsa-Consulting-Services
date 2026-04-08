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
            {price.toLocaleString()} FCFA
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
  background: ${theme.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
  border: 1px solid ${theme.gray200};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(15, 43, 91, 0.1), 0 2px 8px rgba(15, 43, 91, 0.06);
    border-color: ${theme.gray300};
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
  background: ${theme.gray100};

  ${CardContainer}:hover & {
    img {
      transform: scale(1.04);
    }
  }

  img {
    transition: transform 0.4s ease;
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
  background: rgba(15, 43, 91, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled.button`
  background: ${theme.white};
  color: ${theme.primary};
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${theme.secondary};
    color: ${theme.white};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondary};
    outline-offset: 2px;
  }
`;

const StatusBadge = styled.div<{ $statusColor: string; $statusBgColor: string }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: ${({ $statusBgColor }) => $statusBgColor};
  color: ${({ $statusColor }) => $statusColor};
  padding: 0.3rem 0.75rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ $statusColor }) => `${$statusColor}30`};
  z-index: 4;
`;

const CardContent = styled.div`
  padding: 1rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.4rem;
`;

const ProductName = styled.h3`
  font-family: 'Plus Jakarta Sans Variable', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${theme.gray900};
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  transition: color 0.25s ease;

  ${CardContainer}:hover & {
    color: ${theme.primary};
  }
`;

const ProductDescription = styled.p`
  color: ${theme.gray600};
  font-size: 0.8rem;
  line-height: 1.55;
  margin: 0;
  padding-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  background: ${theme.gray50};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.gray200};
  margin-top: auto;
`;

const PriceLabel = styled.span`
  font-size: 0.7rem;
  color: ${theme.gray500};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PriceValue = styled.span`
  font-size: 1rem;
  font-weight: 800;
  color: ${theme.primary};
  letter-spacing: -0.02em;
`;

const AdminControls = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 0.65rem;
  border-top: 1px solid ${theme.gray200};
  margin-top: 0.35rem;
`;

const AdminButton = styled.button<{ $variant: 'edit' | 'delete' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.6rem;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  background: ${({ $variant }) => $variant === 'edit' ? `${theme.info}12` : `${theme.error}12`};
  color: ${({ $variant }) => $variant === 'edit' ? theme.info : theme.error};
  border: 1px solid ${({ $variant }) => $variant === 'edit' ? `${theme.info}25` : `${theme.error}25`};

  &:hover {
    color: ${theme.white};
    background: ${({ $variant }) => $variant === 'edit' ? theme.info : theme.error};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;
