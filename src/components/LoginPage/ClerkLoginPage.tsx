import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import theme from '../../utils/Theme/theme';

const clerkAppearance = {
  variables: {
    colorPrimary: '#c77b3b',
    colorBackground: 'transparent',
    colorText: '#ede6d8',
    colorTextSecondary: '#b8ad99',
    colorInputBackground: '#241e18',
    colorInputText: '#ede6d8',
    colorDanger: '#d06a5b',
    colorSuccess: '#6aa886',
    colorNeutral: '#ede6d8',
    fontFamily: "'Inter Variable', 'Inter', sans-serif",
    borderRadius: '0.4rem'
  },
  elements: {
    rootBox: 'width: 100%;',
    card: 'background: transparent; box-shadow: none; padding: 0; width: 100%;',
    headerTitle: 'display: none;',
    headerSubtitle: 'display: none;',
    formButtonPrimary: `
      background: linear-gradient(135deg, #a55f28 0%, #c77b3b 48%, #e0a05c 100%);
      color: #0e0b09;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      padding: 0.85rem 2rem;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      margin-top: 0.75rem;
      box-shadow: 0 12px 36px rgba(199, 123, 59, 0.28);
      text-transform: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 44px rgba(199, 123, 59, 0.42);
      }
    `,
    socialButtonsBlockButton: `
      border: 1px solid rgba(237, 230, 216, 0.16);
      background: transparent;
      color: #ede6d8;
      font-weight: 600;
      padding: 0.7rem 1.25rem;
      border-radius: 0.4rem;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;

      &:hover {
        background: rgba(199, 123, 59, 0.08);
        border-color: #c77b3b;
      }
    `,
    formFieldInput: `
      border: 1px solid rgba(237, 230, 216, 0.16);
      border-radius: 0.4rem;
      padding: 0.9rem 1rem;
      font-size: 0.95rem;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      background: #241e18;
      color: #ede6d8;

      &::placeholder {
        color: #8b8170;
      }

      &:focus {
        border-color: #c77b3b;
        box-shadow: 0 0 0 3px rgba(199, 123, 59, 0.32);
        outline: none;
      }
    `,
    formFieldLabel: `
      font-weight: 600;
      color: #b8ad99;
      font-size: 0.8rem;
      letter-spacing: 0.01em;
      margin-bottom: 0.4rem;
    `,
    footerActionLink: `
      color: #e0a05c;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.18s ease;
      font-size: 0.8rem;

      &:hover {
        color: #f0bd80;
        text-decoration: underline;
      }
    `,
    dividerLine: `background: rgba(237, 230, 216, 0.09); height: 1px;`,
    dividerText: `
      color: #8b8170;
      background: transparent;
      padding: 0 0.75rem;
      font-size: 0.78rem;
      font-weight: 500;
    `,
    formFieldError: `
      color: #d06a5b;
      font-size: 0.78rem;
      margin-top: 0.375rem;
    `,
    formFieldErrorText: `
      color: #d06a5b;
      font-size: 0.78rem;
    `,
    formFieldInputShowPasswordButton: `
      color: #b8ad99;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.375rem;
      border-radius: 0.4rem;
      transition: all 0.18s ease;

      &:hover {
        color: #ede6d8;
      }
    `,
    formFieldAction: `
      color: #e0a05c;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.8rem;
      transition: all 0.18s ease;

      &:hover {
        color: #f0bd80;
        text-decoration: underline;
      }
    `,
    formFieldHintText: `
      color: #8b8170;
      font-size: 0.78rem;
      margin-top: 0.25rem;
    `,
    formResendCodeLink: `
      color: #e0a05c;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.8rem;
      transition: all 0.18s ease;

      &:hover {
        color: #f0bd80;
        text-decoration: underline;
      }
    `,
    formFieldRow: 'gap: 0.75rem;',
    formField: 'margin-bottom: 1rem;',
    formButtonReset: `
      background: transparent;
      color: #ede6d8;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border: 1px solid rgba(237, 230, 216, 0.16);
      border-radius: 0.4rem;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      margin-top: 0.75rem;

      &:hover {
        background: rgba(199, 123, 59, 0.08);
        border-color: #c77b3b;
      }
    `
  }
};

const ClerkLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <Glow aria-hidden="true" />
      <GoldLine aria-hidden="true" />

      <LoginLayout>
        <BrandSide aria-hidden="true">
          <Watermark>M</Watermark>
          <BrandContent>
            <Eyebrow>
              <EyebrowDot />
              Espace client — MINTSA
            </Eyebrow>
            <BrandTitle>
              Votre espace,<br />
              <Accent>en toute</Accent> confiance.
            </BrandTitle>
            <BrandText>
              Suivez vos demandes, vos devis et vos dossiers — au même endroit,
              avec la rigueur et la discrétion d'une agence de conseil.
            </BrandText>
          </BrandContent>
        </BrandSide>

        <FormSide>
          <LoginCard>
            <CardHeader>
              <LoginTitle>Connexion</LoginTitle>
              <LoginSubtitle>Accédez à votre espace personnel</LoginSubtitle>
            </CardHeader>

            <SignInContainer>
              <SignIn
                appearance={clerkAppearance}
                redirectUrl="/"
                routing="path"
                path="/login"
                signUpUrl="/signup"
                afterSignInUrl="/"
              />
            </SignInContainer>

            <BackToHome onClick={() => navigate('/')}>
              ← Retour à l'accueil
            </BackToHome>
          </LoginCard>
        </FormSide>
      </LoginLayout>
    </LoginContainer>
  );
};

export default ClerkLoginPage;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientConsulting};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

const Glow = styled.div`
  position: absolute;
  top: -20%;
  left: -8%;
  width: 60vw;
  height: 60vw;
  max-width: 820px;
  max-height: 820px;
  background: radial-gradient(circle, rgba(199, 123, 59, 0.2) 0%, rgba(199, 123, 59, 0.05) 40%, transparent 66%);
  pointer-events: none;
  z-index: -1;
  animation: ${fadeIn} 2s ease-out both;
`;

const GoldLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${theme.gradientGold};
  z-index: 5;
`;

const LoginLayout = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);
  width: 100%;
  max-width: 1100px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    max-width: 460px;
    gap: 2.5rem;
  }
`;

const BrandSide = styled.div`
  position: relative;
  animation: ${fadeInUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: ${theme.breakpoints.lg}) {
    text-align: center;
  }
`;

const Watermark = styled.div`
  position: absolute;
  top: -30%;
  left: -6%;
  font-family: ${theme.fontDisplay};
  font-size: 22vw;
  font-weight: 600;
  line-height: 0.7;
  color: rgba(237, 230, 216, 0.025);
  pointer-events: none;
  z-index: -1;
  user-select: none;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const BrandContent = styled.div`
  position: relative;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.secondaryLight};
  margin-bottom: 1.5rem;
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 12px ${theme.copperGlow};
  animation: ${pulse} 2.4s ease-in-out infinite;
`;

const BrandTitle = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
`;

const Accent = styled.span`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
`;

const BrandText = styled.p`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.4vw, 1.12rem);
  color: ${theme.gray600};
  line-height: 1.7;
  max-width: 440px;

  @media (max-width: ${theme.breakpoints.lg}) {
    margin: 0 auto;
  }
`;

const FormSide = styled.div`
  animation: ${fadeInUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
`;

const LoginCard = styled.div`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  padding: 2.5rem;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowLg};
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  position: relative;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 2rem 1.5rem;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1.75rem;
`;

const LoginTitle = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: 1.8rem;
  font-weight: 600;
  color: ${theme.white};
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
`;

const LoginSubtitle = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  font-size: 0.95rem;
  margin: 0;
`;

const SignInContainer = styled.div`
  margin-bottom: 0.5rem;
`;

const BackToHome = styled.button`
  background: transparent;
  border: 1px solid ${theme.line};
  color: ${theme.gray600};
  font-family: ${theme.fontBody};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.25rem;
  text-align: center;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0.7rem;
  border-radius: ${theme.borderRadius.md};

  &:hover {
    border-color: ${theme.copperLine};
    color: ${theme.gray800};
    background: rgba(199, 123, 59, 0.06);
  }
`;
