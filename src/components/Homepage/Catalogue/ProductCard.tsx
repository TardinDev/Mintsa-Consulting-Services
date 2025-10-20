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
  background: linear-gradient(145deg, ${theme.white} 0%, ${theme.gray50} 100%);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 2px 8px -2px rgba(0, 0, 0, 0.08),
    0 4px 16px -4px rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  backdrop-filter: blur(10px);

  /* Bordure animée au gradient */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 1rem;
    padding: 2px;
    background: linear-gradient(
      135deg,
      ${theme.primary}60,
      ${theme.secondary}60,
      ${theme.accent}60,
      ${theme.primary}60
    );
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: gradientShift 6s ease infinite;
  }

  /* Effet de brillance diagonal */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-20deg);
    transition: left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover {
    transform: translateY(-12px) rotateX(2deg);
    box-shadow:
      0 8px 32px -4px rgba(37, 99, 235, 0.15),
      0 16px 64px -8px rgba(37, 99, 235, 0.12),
      0 0 0 1px rgba(37, 99, 235, 0.1);
    border-color: rgba(37, 99, 235, 0.2);

    &::before {
      opacity: 1;
    }

    &::after {
      left: 150%;
    }
  }

  &:active {
    transform: translateY(-10px) rotateX(1deg);
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    &:hover {
      transform: translateY(-6px);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, ${theme.gray100} 0%, ${theme.gray200} 100%);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Gradient overlay sophistiqué */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.02) 60%,
      rgba(0, 0, 0, 0.08) 100%
    );
    pointer-events: none;
    z-index: 1;
    transition: opacity 0.4s ease;
  }

  /* Effet de vignette */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  ${CardContainer}:hover & {
    transform: scale(1.05);

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 240px;

    ${CardContainer}:hover & {
      transform: scale(1.02);
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 220px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(135deg,
      rgba(37, 99, 235, 0.96) 0%,
      rgba(30, 64, 175, 0.92) 50%,
      rgba(20, 40, 120, 0.94) 100%
    );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(12px) saturate(180%);
  z-index: 3;
  transform: scale(0.95);

  /* Pattern decoratif */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  ${CardContainer}:hover & {
    opacity: 1;
    visibility: visible;
    transform: scale(1);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    backdrop-filter: blur(8px) saturate(150%);
  }
`;

const ViewButton = styled.button`
  background: ${theme.white};
  color: ${theme.primary};
  border: none;
  padding: 1rem 2rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 1rem;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(37, 99, 235, 0.1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;

  /* Fond gradient anime */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${theme.secondary} 0%,
      ${theme.primary} 50%,
      ${theme.accent} 100%
    );
    background-size: 200% 200%;
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: gradientFlow 3s ease infinite;
  }

  /* Particules brillantes */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: scale(1.12) translateY(-4px) rotateZ(-1deg);
    box-shadow:
      0 16px 32px rgba(0, 0, 0, 0.25),
      0 0 0 2px rgba(37, 99, 235, 0.3);
    color: ${theme.white};

    &::before {
      opacity: 1;
    }

    &::after {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  &:active {
    transform: scale(1.06) translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${theme.primaryLight};
    outline-offset: 4px;
  }

  @keyframes gradientFlow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.875rem 1.75rem;
    font-size: 0.9375rem;
  }
`;

const StatusBadge = styled.div<{ statusColor: string; statusBgColor: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ statusBgColor }) => statusBgColor};
  color: ${({ statusColor }) => statusColor};
  padding: 0.5rem 1.125rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(16px) saturate(180%);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px ${({ statusColor }) => `${statusColor}20`},
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 4;
  border: 1.5px solid ${({ statusColor }) => `${statusColor}40`};
  position: relative;
  overflow: hidden;

  /* Effet de lueur interne */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ statusColor }) => `${statusColor}30`},
      transparent
    );
    transition: left 0.6s ease;
  }

  ${CardContainer}:hover & {
    transform: scale(1.1) translateY(-3px) rotateZ(2deg);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.2),
      0 0 0 2px ${({ statusColor }) => `${statusColor}30`},
      0 0 20px ${({ statusColor }) => `${statusColor}20`},
      inset 0 1px 0 rgba(255, 255, 255, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: 0.75rem;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.25rem;
  }
`;

const ProductName = styled.h3`
  font-size: 1.1875rem;
  font-weight: 800;
  color: ${theme.gray900};
  margin-bottom: 0.5rem;
  line-height: 1.35;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  letter-spacing: -0.02em;

  /* Underline effect on hover */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: ${theme.gradientPrimary};
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  ${CardContainer}:hover & {
    background: ${theme.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateX(4px);

    &::after {
      width: 60%;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.0625rem;
  }
`;

const ProductDescription = styled.p`
  color: ${theme.gray600};
  font-size: 0.875rem;
  line-height: 1.65;
  margin-bottom: auto;
  padding-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
  transition: color 0.3s ease;

  ${CardContainer}:hover & {
    color: ${theme.gray700};
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1.125rem 1.375rem;
  background:
    linear-gradient(135deg, ${theme.gray50} 0%, ${theme.white} 100%);
  border-radius: 0.875rem;
  border: 2px solid ${theme.gray200};
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);

  /* Shimmer effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(37, 99, 235, 0.12),
      transparent
    );
    transition: left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Glow effect */
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 0.875rem;
    background: linear-gradient(
      135deg,
      ${theme.primary}40,
      ${theme.secondary}40
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
    filter: blur(8px);
  }

  ${CardContainer}:hover & {
    border-color: ${theme.primary}60;
    background: linear-gradient(
      135deg,
      ${theme.primary}10 0%,
      ${theme.white} 100%
    );
    box-shadow:
      0 4px 12px rgba(37, 99, 235, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.875rem 1rem;
  }
`;

const PriceLabel = styled.span`
  font-size: 0.8125rem;
  color: ${theme.gray600};
  font-weight: 500;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;

  ${CardContainer}:hover & {
    color: ${theme.gray700};
  }
`;

const PriceValue = styled.span`
  font-size: 1.25rem;
  font-weight: 900;
  color: ${theme.primary};
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  letter-spacing: -0.03em;

  /* Subtle glow on number */
  &::before {
    content: attr(data-price);
    position: absolute;
    inset: 0;
    background: ${theme.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transition: opacity 0.4s ease;
    filter: blur(4px);
  }

  ${CardContainer}:hover & {
    background: ${theme.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: scale(1.1) translateX(4px);
    filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.3));

    &::before {
      opacity: 0.5;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const AdminControls = styled.div`
  display: flex;
  gap: 0.625rem;
  padding-top: 1rem;
  border-top: 1.5px solid ${theme.gray200};
  margin-top: 0.25rem;
  transition: border-color 0.3s ease;

  ${CardContainer}:hover & {
    border-top-color: ${theme.gray300};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 0.5rem;
    padding-top: 0.875rem;
  }
`;

const AdminButton = styled.button<{ variant: 'edit' | 'delete' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;

  /* Ripple effect background */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Shine effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transform: skewX(-20deg);
    transition: left 0.6s ease;
  }

  &:hover::before {
    width: 350px;
    height: 350px;
  }

  &:hover::after {
    left: 150%;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 3px;
  }

  ${({ variant }) =>
    variant === 'edit'
      ? `
        background: ${theme.info}12;
        color: ${theme.info};
        border: 1.5px solid ${theme.info}25;
        box-shadow:
          0 2px 4px rgba(59, 130, 246, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);

        &::before {
          background: ${theme.info};
        }

        &:hover {
          color: ${theme.white};
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 8px 16px rgba(59, 130, 246, 0.35),
            0 0 0 2px ${theme.info}20;
          border-color: transparent;
        }

        &:active {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }
      `
      : `
        background: ${theme.error}12;
        color: ${theme.error};
        border: 1.5px solid ${theme.error}25;
        box-shadow:
          0 2px 4px rgba(239, 68, 68, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);

        &::before {
          background: ${theme.error};
        }

        &:hover {
          color: ${theme.white};
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 8px 16px rgba(239, 68, 68, 0.35),
            0 0 0 2px ${theme.error}20;
          border-color: transparent;
        }

        &:active {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
        }
      `
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.625rem 0.875rem;
    font-size: 0.75rem;
    gap: 0.375rem;
  }
`;
