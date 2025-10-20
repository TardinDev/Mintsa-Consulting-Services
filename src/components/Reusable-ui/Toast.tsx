import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import theme from '../../utils/Theme/theme';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'warning':
        return <FaExclamationCircle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <ToastContainer $type={type}>
      <ToastIcon $type={type}>{getIcon()}</ToastIcon>
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={() => onClose(id)} aria-label="Fermer">
        <FaTimes />
      </CloseButton>
      <ProgressBar $duration={duration} $type={type} />
    </ToastContainer>
  );
};

export default Toast;

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${theme.white};
  padding: 1rem 1.25rem;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-left: 4px solid ${({ $type }) => {
    switch ($type) {
      case 'success':
        return theme.success;
      case 'error':
        return theme.error;
      case 'warning':
        return theme.warning;
      case 'info':
        return theme.info;
      default:
        return theme.info;
    }
  }};

  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: 280px;
    max-width: calc(100vw - 2rem);
  }
`;

const ToastIcon = styled.div<{ $type: ToastType }>`
  font-size: 1.5rem;
  color: ${({ $type }) => {
    switch ($type) {
      case 'success':
        return theme.success;
      case 'error':
        return theme.error;
      case 'warning':
        return theme.warning;
      case 'info':
        return theme.info;
      default:
        return theme.info;
    }
  }};
  flex-shrink: 0;
`;

const ToastMessage = styled.div`
  flex: 1;
  font-size: 0.95rem;
  color: ${theme.gray800};
  line-height: 1.5;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.gray500};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all ${theme.transition.fast};
  border-radius: ${theme.borderRadius.md};
  flex-shrink: 0;

  &:hover {
    color: ${theme.gray700};
    background: ${theme.gray100};
  }
`;

const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const ProgressBar = styled.div<{ $duration: number; $type: ToastType }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ $type }) => {
    switch ($type) {
      case 'success':
        return theme.success;
      case 'error':
        return theme.error;
      case 'warning':
        return theme.warning;
      case 'info':
        return theme.info;
      default:
        return theme.info;
    }
  }};
  animation: ${progressAnimation} ${({ $duration }) => $duration}ms linear;
`;
