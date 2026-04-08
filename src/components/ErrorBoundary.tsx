import React from 'react';
import styled from 'styled-components';
import theme from '../utils/Theme/theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon>!</ErrorIcon>
            <ErrorTitle>Une erreur est survenue</ErrorTitle>
            <ErrorMessage>
              Nous nous excusons pour ce desagrement. Veuillez reessayer ou nous contacter si le probleme persiste.
            </ErrorMessage>
            {import.meta.env.DEV && this.state.error && (
              <ErrorDetails>{this.state.error.message}</ErrorDetails>
            )}
            <RetryButton onClick={this.handleRetry}>
              Reessayer
            </RetryButton>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gray50};
  padding: 2rem;
`;

const ErrorCard = styled.div`
  background: ${theme.white};
  border-radius: ${theme.borderRadius['2xl']};
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: ${theme.shadowXl};
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${theme.error}15;
  color: ${theme.error};
  font-size: 2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${theme.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ErrorDetails = styled.pre`
  background: ${theme.gray100};
  color: ${theme.error};
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.8rem;
  text-align: left;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

const RetryButton = styled.button`
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  padding: 0.875rem 2rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${theme.shadowMd};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLg};
  }

  &:active {
    transform: translateY(0);
  }
`;
