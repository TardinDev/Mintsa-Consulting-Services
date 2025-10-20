import React from 'react';
import styled from 'styled-components';
import Toast, { ToastType } from './Toast';
import theme from '../../utils/Theme/theme';

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

const ToastContainerComponent: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <Container>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={onClose}
        />
      ))}
    </Container>
  );
};

export default ToastContainerComponent;

const Container = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: ${theme.zTooltip};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
  }
`;
