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
  width: 100%;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${theme.shadowXl};
    border-color: ${theme.primaryLight};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    height: 220px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 200px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(30, 64, 175, 0.85) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${theme.transition.normal};
  backdrop-filter: blur(4px);

  ${CardContainer}:hover & {
    opacity: 1;
    animation: fadeInScale 0.3s ease-out;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ViewButton = styled.button`
  background: ${theme.white};
  color: ${theme.primary};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${theme.transition.fast};
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    background: ${theme.secondary};
    color: ${theme.white};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StatusBadge = styled.div<{ statusColor: string; statusBgColor: string }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: ${({ statusBgColor }) => statusBgColor};
  color: ${({ statusColor }) => statusColor};
  padding: 0.4rem 0.9rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.4s ease-out;
  transition: all ${theme.transition.fast};

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.5rem;
  line-height: 1.3;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProductDescription = styled.p`
  color: ${theme.gray700};
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: auto;
  padding-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, ${theme.gray50} 0%, ${theme.white} 100%);
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.gray200};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent);
    transition: left 0.5s;
  }

  ${CardContainer}:hover &::before {
    left: 100%;
  }
`;

const PriceLabel = styled.span`
  font-size: 0.8rem;
  color: ${theme.gray600};
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

const PriceValue = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
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
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  ${({ variant }) =>
    variant === 'edit'
      ? `
        background: ${theme.info}20;
        color: ${theme.info};

        &::before {
          background: ${theme.info};
        }

        &:hover {
          color: ${theme.white};
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      `
      : `
        background: ${theme.error}20;
        color: ${theme.error};

        &::before {
          background: ${theme.error};
        }

        &:hover {
          color: ${theme.white};
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      `
  }
`;
