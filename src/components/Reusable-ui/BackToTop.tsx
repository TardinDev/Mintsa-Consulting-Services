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
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${theme.gray100};
  color: ${theme.gray700};
  border: 1px solid ${theme.lineStrong};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  box-shadow: ${theme.shadowMd};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: ${theme.zFixed};
  isolation: isolate;
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $isVisible }) => ($isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)')};

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 50%;
    background: radial-gradient(circle at center, ${theme.copperGlow} 0%, transparent 70%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    color: ${theme.primaryLight};
    border-color: ${theme.copperLine};
    box-shadow: ${theme.shadowCopper};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 46px;
    height: 46px;
    font-size: 0.95rem;
  }
`;
