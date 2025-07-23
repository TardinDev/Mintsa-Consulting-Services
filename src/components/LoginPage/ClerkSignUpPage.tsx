import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import theme from '../../utils/Theme/theme';

const ClerkSignUpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SignUpContainer>
      <SignUpBackground />
      <SignUpCard>
        <CardHeader>
          <SignUpTitle>Créer un compte</SignUpTitle>
          <SignUpSubtitle>Rejoignez notre communauté</SignUpSubtitle>
        </CardHeader>

        <SignUpFormContainer>
          <SignUp 
            appearance={{
              elements: {
                rootBox: 'width: 100%;',
                card: 'background: transparent; box-shadow: none; padding: 0;',
                headerTitle: 'display: none;',
                headerSubtitle: 'display: none;',
                formButtonPrimary: `
                  background: ${theme.white};
                  color: ${theme.primary};
                  font-size: 1rem;
                  font-weight: 700;
                  padding: 0.875rem 2rem;
                  border: none;
                  border-radius: ${theme.borderRadius.lg};
                  cursor: pointer;
                  transition: all ${theme.transition.normal};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                  width: 100%;
                  margin-top: 0.75rem;
                  box-shadow: ${theme.shadowLg};

                  &:hover {
                    transform: translateY(-2px);
                    box-shadow: ${theme.shadow2xl};
                    background: ${theme.gray50};
                  }
                `,
                socialButtonsBlockButton: `
                  border: 2px solid ${theme.white};
                  background: transparent;
                  color: ${theme.white};
                  font-weight: 600;
                  padding: 0.625rem 1.25rem;
                  border-radius: ${theme.borderRadius.lg};
                  transition: all ${theme.transition.normal};
                  margin-bottom: 0.5rem;
                  backdrop-filter: blur(10px);
                  font-size: 0.875rem;

                  &:hover {
                    background: ${theme.white}20;
                    transform: translateY(-1px);
                    border-color: ${theme.white};
                  }
                `,
                formFieldInput: `
                  border: 2px solid ${theme.white}40;
                  border-radius: ${theme.borderRadius.lg};
                  padding: 0.875rem 1rem;
                  font-size: 0.875rem;
                  transition: all ${theme.transition.normal};
                  background: ${theme.white}10;
                  backdrop-filter: blur(10px);
                  color: ${theme.white};

                  &::placeholder {
                    color: ${theme.white}80;
                  }

                  &:focus {
                    border-color: ${theme.white};
                    box-shadow: 0 0 0 3px ${theme.white}20;
                    outline: none;
                    background: ${theme.white}20;
                  }
                `,
                formFieldLabel: `
                  font-weight: 600;
                  color: ${theme.white};
                  font-size: 0.75rem;
                  margin-bottom: 0.375rem;
                `,
                footerActionLink: `
                  color: ${theme.white};
                  font-weight: 600;
                  text-decoration: none;
                  transition: all ${theme.transition.fast};
                  font-size: 0.75rem;

                  &:hover {
                    color: ${theme.white};
                    text-decoration: underline;
                    text-shadow: 0 0 10px ${theme.white}50;
                  }
                `,
                dividerLine: `background: ${theme.white}40; height: 1px;`,
                dividerText: `
                  color: ${theme.white}; 
                  background: transparent; 
                  padding: 0 0.75rem; 
                  font-size: 0.75rem;
                  font-weight: 500;
                `,
                formFieldError: `
                  color: #fecaca;
                  font-size: 0.75rem;
                  margin-top: 0.375rem;
                `,
                formFieldErrorText: `
                  color: #fecaca;
                  font-size: 0.75rem;
                `,
                formFieldInputShowPasswordButton: `
                  color: ${theme.white};
                  background: none;
                  border: none;
                  cursor: pointer;
                  padding: 0.375rem;
                  border-radius: ${theme.borderRadius.md};
                  transition: all ${theme.transition.fast};

                  &:hover {
                    background: ${theme.white}20;
                    color: ${theme.white};
                  }
                `,
                formFieldAction: `
                  color: ${theme.white};
                  font-weight: 600;
                  text-decoration: none;
                  font-size: 0.75rem;
                  transition: all ${theme.transition.fast};

                  &:hover {
                    color: ${theme.white};
                    text-decoration: underline;
                    text-shadow: 0 0 10px ${theme.white}50;
                  }
                `,
                formFieldHintText: `
                  color: ${theme.white}80;
                  font-size: 0.75rem;
                  margin-top: 0.25rem;
                `,
                formResendCodeLink: `
                  color: ${theme.white};
                  font-weight: 600;
                  text-decoration: none;
                  font-size: 0.75rem;
                  transition: all ${theme.transition.fast};

                  &:hover {
                    color: ${theme.white};
                    text-decoration: underline;
                    text-shadow: 0 0 10px ${theme.white}50;
                  }
                `,
                formFieldRow: 'gap: 0.75rem;',
                formField: 'margin-bottom: 1rem;',
                formButtonReset: `
                  background: ${theme.white}20;
                  color: ${theme.white};
                  font-size: 0.875rem;
                  font-weight: 600;
                  padding: 0.75rem 1.5rem;
                  border: 2px solid ${theme.white}40;
                  border-radius: ${theme.borderRadius.lg};
                  cursor: pointer;
                  transition: all ${theme.transition.normal};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                  width: 100%;
                  margin-top: 0.75rem;
                  backdrop-filter: blur(10px);

                  &:hover {
                    background: ${theme.white}30;
                    transform: translateY(-1px);
                    border-color: ${theme.white};
                  }
                `,
                formFieldCheckbox: `
                  border: 2px solid ${theme.white}40;
                  border-radius: ${theme.borderRadius.md};
                  background: ${theme.white}10;
                  transition: all ${theme.transition.fast};

                  &:checked {
                    background: ${theme.white};
                    border-color: ${theme.white};
                  }

                  &:focus {
                    border-color: ${theme.white};
                    box-shadow: 0 0 0 3px ${theme.white}20;
                    outline: none;
                  }
                `,
                formFieldLabelRow: 'gap: 0.5rem; align-items: flex-start;',
                formFieldLabelRowLabel: `
                  font-weight: 600;
                  color: ${theme.white};
                  font-size: 0.75rem;
                  margin-bottom: 0.375rem;
                  line-height: 1.4;
                `,
                formFieldLabelRowRequired: `
                  color: #fecaca;
                  font-weight: 600;
                `,
                formFieldLabelRowOptional: `
                  color: ${theme.white}60;
                  font-weight: 400;
                  font-size: 0.625rem;
                `
              }
            }}
            redirectUrl="/verify-email"
            routing="path"
            path="/signup"
            signInUrl="/login"
            afterSignUpUrl="/"
            afterSignInUrl="/"
          />
        </SignUpFormContainer>

        <BackToHome onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </BackToHome>
      </SignUpCard>
    </SignUpContainer>
  );
};

export default ClerkSignUpPage;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientPrimary};
  padding: 1rem;
  padding-left: 4rem;
  position: relative;
  overflow: hidden;
`;

const SignUpBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.15"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
  opacity: 0.6;
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(10px) rotate(240deg); }
  }
`;

const SignUpCard = styled.div`
  background: ${theme.gradientPrimary};
  padding: 2.5rem;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadow2xl};
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 2;
  animation: slideInUp 0.6s ease-out;
  border: 1px solid ${theme.white}20;
  backdrop-filter: blur(20px);

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 2rem;
    margin: 0.5rem;
    max-width: 400px;
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

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SignUpTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.white};
  margin-bottom: 0.375rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SignUpSubtitle = styled.p`
  color: ${theme.white};
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
  opacity: 0.9;
`;

const SignUpFormContainer = styled.div`
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const BackToHome = styled.button`
  background: ${theme.white}10;
  border: 1px solid ${theme.white}30;
  color: ${theme.white};
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
  transition: all ${theme.transition.fast};
  padding: 0.625rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${theme.white}20;
    border-color: ${theme.white}50;
    transform: translateY(-1px);
  }
`; 