import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import theme from '../../../utils/Theme/theme';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  onImageClick?: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return <NoImage>Aucune image disponible</NoImage>;
  }

  return (
    <GalleryContainer>
      <ImageContainer onClick={onImageClick}>
        <GalleryImage
          src={images[currentImageIndex]}
          alt={`${alt} - Image ${currentImageIndex + 1}`}
          loading="lazy"
          decoding="async"
        />
        
        {images.length > 1 && (
          <>
            <NavigationButton
              $direction="left"
              aria-label="Image précédente"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <FaChevronLeft size={14} />
            </NavigationButton>

            <NavigationButton
              $direction="right"
              aria-label="Image suivante"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <FaChevronRight size={14} />
            </NavigationButton>
          </>
        )}
      </ImageContainer>

      {images.length > 1 && (
        <DotsContainer>
          {images.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentImageIndex}
              aria-label={`Aller à l'image ${index + 1}`}
              onClick={() => goToImage(index)}
            />
          ))}
        </DotsContainer>
      )}
    </GalleryContainer>
  );
};

export default ImageGallery;

const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 180px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const NavigationButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'left' ? 'left: 0.75rem;' : 'right: 0.75rem;')}
  transform: translateY(-50%);
  background: rgba(20, 17, 14, 0.55);
  border: 1px solid ${theme.lineStrong};
  border-radius: 50%;
  width: 2.1rem;
  height: 2.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: ${theme.gray800};
  backdrop-filter: blur(10px);
  z-index: 5;

  &:hover {
    background: rgba(20, 17, 14, 0.8);
    border-color: ${theme.copperLine};
    color: ${theme.secondaryLight};
    transform: translateY(-50%) scale(1.08);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 2px;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 0.85rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.45rem;
  z-index: 5;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.4rem' : '0.5rem')};
  height: 0.5rem;
  border-radius: ${theme.borderRadius.full};
  border: none;
  background: ${({ $active }) =>
    $active ? theme.gradientGold : 'rgba(237, 230, 216, 0.4)'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${({ $active }) => ($active ? theme.gradientGold : theme.secondaryLight)};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 2px;
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gray200};
  color: ${theme.gray500};
  font-family: ${theme.fontBody};
  font-size: 0.85rem;
`;