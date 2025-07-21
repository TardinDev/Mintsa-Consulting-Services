import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../utils/Authentification/AuthService';
import InputLogin from './InputLogin';
import theme from '../../utils/Theme/theme';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authenticate } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simuler un délai pour l'expérience utilisateur
    setTimeout(() => {
      if (login(email, password)) {
        authenticate();
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
      setIsLoading(false);
    }, 1000);
  };



  return (
    <LoginContainer>
      <LoginBackground />
      <LoginCard>
        <LoginHeader>
          <LogoContainer>
            <LogoIcon>🏢</LogoIcon>
            <LogoText>Mintsa Consulting</LogoText>
          </LogoContainer>
          <LoginTitle>Espace Administrateur</LoginTitle>
          <LoginSubtitle>Accédez à votre tableau de bord</LoginSubtitle>
        </LoginHeader>

        <LoginForm>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputGroup>
            <InputLabel>Adresse email</InputLabel>
            <InputLogin 
              type="email" 
              placeholder="votre@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Mot de passe</InputLabel>
            <InputLogin 
              type="password" 
              placeholder="Votre mot de passe" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <LoginButton 
            onClick={handleLogin} 
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </LoginButton>
        </LoginForm>

        <BackToHome onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </BackToHome>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientPrimary};
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const LoginBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
`;

const LoginCard = styled.div`
  background: ${theme.white};
  padding: 3rem;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadow2xl};
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 2;
  animation: slideInUp 0.6s ease-out;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 2rem;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  font-size: 2rem;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.primary};
  margin: 0;
`;

const LoginTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: ${theme.gray600};
  font-size: 1rem;
  margin: 0;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-weight: 600;
  color: ${theme.gray700};
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  background: ${theme.error}20;
  color: ${theme.error};
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.875rem;
  border: 1px solid ${theme.error}40;
  animation: shake 0.5s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const LoginButton = styled.button<{ isLoading: boolean }>`
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  cursor: ${({ isLoading }) => isLoading ? 'not-allowed' : 'pointer'};
  transition: all ${theme.transition.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: ${({ isLoading }) => isLoading ? 0.7 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLg};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid ${theme.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const BackToHome = styled.button`
  background: none;
  border: none;
  color: ${theme.primary};
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 1.5rem;
  text-align: center;
  width: 100%;
  transition: all ${theme.transition.fast};

  &:hover {
    color: ${theme.primaryDark};
    text-decoration: underline;
  }
`;
