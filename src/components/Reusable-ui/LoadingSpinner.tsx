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
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: ${theme.cream};
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    width: 40vw;
    height: 40vw;
    max-width: 520px;
    max-height: 520px;
    background: radial-gradient(circle, rgba(199, 123, 59, 0.12) 0%, transparent 65%);
    pointer-events: none;
    z-index: -1;
  }
`;

const Spinner = styled.div`
  width: 46px;
  height: 46px;
  border: 2px solid ${theme.gray300};
  border-top-color: ${theme.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
`;

const LoadingText = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray500};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;
