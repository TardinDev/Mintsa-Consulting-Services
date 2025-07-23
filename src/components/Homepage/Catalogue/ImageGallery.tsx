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
        />
        
        {images.length > 1 && (
          <>
            <NavigationButton 
              direction="left" 
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <FaChevronLeft size={16} />
            </NavigationButton>
            
            <NavigationButton 
              direction="right" 
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <FaChevronRight size={16} />
            </NavigationButton>
          </>
        )}
      </ImageContainer>

      {images.length > 1 && (
        <DotsContainer>
          {images.map((_, index) => (
            <Dot 
              key={index}
              active={index === currentImageIndex}
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
  height: 200px;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
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
  transition: transform ${theme.transition.normal};

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transition.fast};
  color: ${theme.gray700};
  backdrop-filter: blur(10px);

  &:hover {
    background: ${theme.white};
    transform: translateY(-50%) scale(1.1);
    box-shadow: ${theme.shadowMd};
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => 
    active ? theme.white : 'rgba(255, 255, 255, 0.5)'
  };
  cursor: pointer;
  transition: all ${theme.transition.fast};
  backdrop-filter: blur(10px);

  &:hover {
    background: ${theme.white};
    transform: scale(1.2);
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gray100};
  color: ${theme.gray500};
  font-size: 0.875rem;
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
`; 