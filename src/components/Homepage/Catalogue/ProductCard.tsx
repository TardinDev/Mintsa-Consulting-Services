import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useClerkAuth } from '../../../context/ClerkAuthContext';
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
      case 'disponible':
        return theme.success;
      case 'vendu':
        return theme.primary;
      case 'en_location':
        return theme.warning;
      case 'épuisé':
        return theme.error;
      default:
        return theme.success; // Par défaut, "aucun" devient "disponible" en vert
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible':
        return `${theme.success}20`;
      case 'vendu':
        return `${theme.primary}20`;
      case 'en_location':
        return `${theme.warning}20`;
      case 'épuisé':
        return `${theme.error}20`;
      default:
        return `${theme.success}20`; // Par défaut, "aucun" devient "disponible" en vert
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'none':
        return 'Disponible';
      case 'vendu':
        return 'Vendu';
      case 'en_location':
        return 'En location';
      case 'épuisé':
        return 'Épuisé';
      default:
        return status;
    }
  };

  return (
    <CardContainer>
      <ImageContainer>
        <ImageGallery images={images} alt={name} onImageClick={onDetailsClick} />
        <ImageOverlay>
          <ViewButton onClick={onDetailsClick}>
            <FaEye size={20} />
            Voir détails
          </ViewButton>
        </ImageOverlay>
        <StatusBadge 
          statusColor={getStatusColor(status)}
          statusBgColor={getStatusBgColor(status)}
        >
          {getStatusText(status)}
        </StatusBadge>
      </ImageContainer>

      <CardContent>
        <ProductName>{name}</ProductName>
        <ProductDescription>{description}</ProductDescription>
        
        <PriceContainer>
          <PriceLabel>Prix estimé :</PriceLabel>
          <PriceValue>{price.toLocaleString()} FCFA</PriceValue>
        </PriceContainer>

        {isAuthenticated && isAdmin && (
          <AdminControls>
            <AdminButton onClick={onEditClick} variant="edit">
              <FaEdit size={16} />
              Modifier
            </AdminButton>
            <AdminButton onClick={onDelete} variant="delete">
              <FaTrash size={16} />
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
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadowMd};
  transition: all ${theme.transition.normal};
  position: relative;
  max-width: 280px;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadowLg};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 160px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transition.normal};

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 64, 175, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${theme.transition.normal};

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled.button`
  background: ${theme.white};
  color: ${theme.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${theme.transition.fast};
  font-size: 0.8rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadowMd};
  }
`;

const StatusBadge = styled.div<{ statusColor: string; statusBgColor: string }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: ${({ statusBgColor }) => statusBgColor};
  color: ${({ statusColor }) => statusColor};
  padding: 0.35rem 0.75rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  color: ${theme.gray600};
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: ${theme.gray50};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.gray200};
`;

const PriceLabel = styled.span`
  font-size: 0.8rem;
  color: ${theme.gray600};
  font-weight: 500;
`;

const PriceValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.primary};
`;

const AdminControls = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${theme.gray200};
`;

const AdminButton = styled.button<{ variant: 'edit' | 'delete' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transition.fast};

  ${({ variant }) => 
    variant === 'edit' 
      ? `
        background: ${theme.info}20;
        color: ${theme.info};
        
        &:hover {
          background: ${theme.info};
          color: ${theme.white};
          transform: translateY(-1px);
        }
      `
      : `
        background: ${theme.error}20;
        color: ${theme.error};
        
        &:hover {
          background: ${theme.error};
          color: ${theme.white};
          transform: translateY(-1px);
        }
      `
  }
`;
