import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import theme from '../../utils/Theme/theme';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorBackground />
      <ErrorContent>
        <ErrorHeader>
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page introuvable</ErrorTitle>
          <ErrorSubtitle>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </ErrorSubtitle>
        </ErrorHeader>

        <ErrorActions>
          <PrimaryButton onClick={() => navigate('/')}>
            <FaHome size={20} />
            Retour à l'accueil
          </PrimaryButton>
          
          <SecondaryButton onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
            Page précédente
          </SecondaryButton>
        </ErrorActions>

        <HelpSection>
          <HelpTitle>Besoin d'aide ?</HelpTitle>
          <HelpText>
            Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter.
          </HelpText>
          
          <ContactOptions>
            <ContactOption>
              <ContactIcon>
                <FaEnvelope size={24} />
              </ContactIcon>
              <ContactInfo>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>Mintsaconsulting@gmail.com</ContactValue>
              </ContactInfo>
            </ContactOption>
            
            <ContactOption>
              <ContactIcon>
                <FaPhone size={24} />
              </ContactIcon>
              <ContactInfo>
                <ContactLabel>Téléphone</ContactLabel>
                <ContactValue>+241 74 85 34 84</ContactValue>
              </ContactInfo>
            </ContactOption>
          </ContactOptions>
        </HelpSection>
      </ErrorContent>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientPrimary};
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ErrorBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
`;

const ErrorContent = styled.div`
  background: ${theme.white};
  padding: 4rem;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadow2xl};
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  z-index: 2;
  animation: slideInUp 0.6s ease-out;

  @media (max-width: ${theme.breakpoints.md}) {
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

const ErrorHeader = styled.div`
  margin-bottom: 3rem;
`;

const ErrorCode = styled.div`
  font-size: 8rem;
  font-weight: 900;
  color: ${theme.primary};
  line-height: 1;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: bounce 2s ease-in-out infinite;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 6rem;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const ErrorSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.gray600};
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all ${theme.transition.normal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: ${theme.shadowMd};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLg};
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${theme.primary};
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: 2px solid ${theme.primary};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all ${theme.transition.normal};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${theme.primary};
    color: ${theme.white};
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLg};
  }
`;

const HelpSection = styled.div`
  border-top: 1px solid ${theme.gray200};
  padding-top: 2rem;
`;

const HelpTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.75rem;
`;

const HelpText = styled.p`
  color: ${theme.gray600};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ContactOptions = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const ContactOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${theme.gray50};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.gray200};
  transition: all ${theme.transition.fast};

  &:hover {
    background: ${theme.white};
    box-shadow: ${theme.shadowMd};
    transform: translateY(-2px);
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${theme.primary}20;
  color: ${theme.primary};
  border-radius: ${theme.borderRadius.full};
`;

const ContactInfo = styled.div`
  text-align: left;
`;

const ContactLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.gray600};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  font-size: 1rem;
  color: ${theme.gray900};
  font-weight: 600;
`;
