import styled, { keyframes } from 'styled-components';
import theme from '../../utils/Theme/theme';

const LoadingSpinner: React.FC = () => (
  <SpinnerContainer role="status" aria-label="Chargement en cours">
    <Spinner />
    <LoadingText>Chargement...</LoadingText>
  </SpinnerContainer>
);

export default LoadingSpinner;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: ${theme.gray50};
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${theme.gray200};
  border-top-color: ${theme.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  color: ${theme.gray500};
  font-size: 0.95rem;
  font-weight: 500;
`;
