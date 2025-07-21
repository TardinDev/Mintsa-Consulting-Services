import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { useAdminMode } from '../../../context/AdminModeContext';
import theme from '../../../utils/Theme/theme';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  status: string;
  onDetailsClick: () => void;
  onDelete: () => void;
  onEditClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  description,
  price,
  status,
  onDetailsClick,
  onDelete,
  onEditClick,
}) => {
  const { isAuthenticated } = useAuth();
  const { isAdminMode } = useAdminMode();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible':
        return theme.success;
      case 'en cours':
        return theme.warning;
      case 'terminé':
        return theme.info;
      default:
        return theme.gray500;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponible':
        return `${theme.success}20`;
      case 'en cours':
        return `${theme.warning}20`;
      case 'terminé':
        return `${theme.info}20`;
      default:
        return `${theme.gray500}20`;
    }
  };

  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage src={image} alt={name} />
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
          {status}
        </StatusBadge>
      </ImageContainer>

      <CardContent>
        <ProductName>{name}</ProductName>
        <ProductDescription>{description}</ProductDescription>
        
        <PriceContainer>
          <PriceLabel>Prix estimé :</PriceLabel>
          <PriceValue>{price.toLocaleString()} FCFA</PriceValue>
        </PriceContainer>

        {isAuthenticated && isAdminMode && (
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

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadowLg};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
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
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${theme.transition.fast};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadowMd};
  }
`;

const StatusBadge = styled.div<{ statusColor: string; statusBgColor: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ statusBgColor }) => statusBgColor};
  color: ${({ statusColor }) => statusColor};
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  color: ${theme.gray600};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${theme.gray50};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.gray200};
`;

const PriceLabel = styled.span`
  font-size: 0.875rem;
  color: ${theme.gray600};
  font-weight: 500;
`;

const PriceValue = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.primary};
`;

const AdminControls = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${theme.gray200};
`;

const AdminButton = styled.button<{ variant: 'edit' | 'delete' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.875rem;
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
