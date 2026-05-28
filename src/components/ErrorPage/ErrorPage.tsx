import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import { FaHome, FaArrowLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import theme from '../../utils/Theme/theme';
import sadAnimation from '../../assets/images/sad.json';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <Glow aria-hidden="true" />
      <Watermark aria-hidden="true">404</Watermark>
      <GoldLine aria-hidden="true" />

      <ErrorContent>
        <ErrorHeader>
          <LottieWrap aria-hidden="true">
            <Lottie
              animationData={sadAnimation}
              play
              loop
              style={{ width: '100%', maxWidth: '160px', height: 'auto' }}
            />
          </LottieWrap>
          <Eyebrow>
            <EyebrowDot aria-hidden="true" />
            Erreur 404
          </Eyebrow>
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>
            Page <Accent>introuvable</Accent>
          </ErrorTitle>
          <ErrorSubtitle>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </ErrorSubtitle>
        </ErrorHeader>

        <ErrorActions>
          <PrimaryButton onClick={() => navigate('/')}>
            <FaHome size={18} />
            Retour à l'accueil
            <ButtonArrow aria-hidden="true">→</ButtonArrow>
          </PrimaryButton>

          <SecondaryButton onClick={() => navigate(-1)}>
            <FaArrowLeft size={18} />
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
                <FaEnvelope size={20} />
              </ContactIcon>
              <ContactInfo>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>Mintsaconsulting@gmail.com</ContactValue>
              </ContactInfo>
            </ContactOption>

            <ContactOption>
              <ContactIcon>
                <FaPhone size={20} />
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

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientConsulting};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;

const Glow = styled.div`
  position: absolute;
  top: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  max-width: 820px;
  max-height: 820px;
  background: radial-gradient(circle, rgba(199, 123, 59, 0.18) 0%, rgba(199, 123, 59, 0.05) 40%, transparent 66%);
  pointer-events: none;
  z-index: -1;
  animation: ${fadeIn} 2s ease-out both;
`;

const Watermark = styled.div`
  position: absolute;
  bottom: -10%;
  left: -2%;
  font-family: ${theme.fontDisplay};
  font-size: 42vw;
  font-weight: 600;
  line-height: 0.7;
  color: rgba(237, 230, 216, 0.022);
  pointer-events: none;
  z-index: -1;
  user-select: none;
  font-feature-settings: 'tnum';
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

const ErrorContent = styled.div`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  padding: 3.5rem;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowLg};
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2.25rem 1.75rem;
  }
`;

const ErrorHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const LottieWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
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
  margin-bottom: 0.75rem;
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 12px ${theme.copperGlow};
  animation: ${pulse} 2.4s ease-in-out infinite;
`;

const ErrorCode = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin-bottom: 0.75rem;
  font-feature-settings: 'tnum';
  font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0;
`;

const Accent = styled.span`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
  font-variation-settings: 'opsz' 144, 'SOFT' 4;
`;

const ErrorTitle = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
`;

const ErrorSubtitle = styled.p`
  font-family: ${theme.fontBody};
  font-size: 1.05rem;
  color: ${theme.gray600};
  line-height: 1.65;
  max-width: 420px;
  margin: 0 auto;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ButtonArrow = styled.span`
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
`;

const PrimaryButton = styled.button`
  background: ${theme.gradientGold};
  color: ${theme.black};
  font-family: ${theme.fontBody};
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  padding: 0.95rem 1.9rem;
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;
  box-shadow: ${theme.shadowCopper};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(199, 123, 59, 0.42);
  }
  &:hover ${ButtonArrow} { transform: translateX(5px); }
  &:active { transform: translateY(-1px); }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${theme.gray800};
  font-family: ${theme.fontBody};
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0.95rem 1.9rem;
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;

  &:hover {
    border-color: ${theme.primary};
    color: ${theme.white};
    background: rgba(199, 123, 59, 0.08);
  }
`;

const HelpSection = styled.div`
  border-top: 1px solid ${theme.line};
  padding-top: 2rem;
`;

const HelpTitle = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.white};
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
`;

const HelpText = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ContactOptions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ContactOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: ${theme.gray200};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.line};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${theme.copperLine};
    background: ${theme.gray300};
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(199, 123, 59, 0.12);
  color: ${theme.primary};
  border-radius: ${theme.borderRadius.full};
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  text-align: left;
`;

const ContactLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  color: ${theme.gray500};
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.95rem;
  color: ${theme.gray800};
  font-weight: 500;
`;
