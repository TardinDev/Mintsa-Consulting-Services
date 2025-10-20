import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';
import theme from '../../utils/Theme/theme';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <BackToTopButton
      onClick={scrollToTop}
      $isVisible={isVisible}
      aria-label="Retour en haut"
    >
      <FaArrowUp />
    </BackToTopButton>
  );
};

export default BackToTop;

const BackToTopButton = styled.button<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: ${theme.zFixed};
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $isVisible }) => ($isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)')};

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
    font-size: 1.125rem;
  }
`;
