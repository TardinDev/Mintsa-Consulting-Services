import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '../../../utils/Theme/theme';
import navitems from '../../../utils/data/navitems';
import { useCountUp } from '../../../hooks/useCountUp';

const StatWithCounter: React.FC<{ end: number; suffix: string; label: string }> = ({ end, suffix, label }) => {
  const { count, ref } = useCountUp(end, 2200);
  return (
    <StatItem>
      <StatNumber ref={ref as React.RefObject<HTMLDivElement>}>
        {count}<StatSuffix>{suffix}</StatSuffix>
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatItem>
  );
};

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer role="banner" aria-label="Section principale">
      <HeroBackground aria-hidden="true" />
      <NoiseOverlay aria-hidden="true" />
      <GoldLine aria-hidden="true" />
      <HeroContent>
        <NavBar role="navigation" aria-label="Navigation des services">
          {navitems.map((item, index) => (
            <NavItem key={item.title} style={{ animationDelay: `${0.3 + index * 0.08}s` }}>
              <NavLink
                onClick={() => navigate(item.href)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(item.href)}
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </NavBar>

        <TitleSection>
          <Eyebrow>Cabinet de Conseil & Services</Eyebrow>
          <MainTitle>
            Votre Partenaire<br />
            <GoldText>d'Excellence</GoldText> en Consulting
          </MainTitle>
          <SubTitle>
            Solutions sur-mesure pour propulser votre entreprise vers le succes.
            De l'administration a la fiscalite, de l'automobile a l'immobilier,
            nous transformons vos ambitions en realite.
          </SubTitle>
          <HeroButtons>
            <PrimaryButton
              onClick={() => window.scrollTo({ top: document.querySelector('#catalogue')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' })}
              aria-label="Explorer nos solutions de consulting"
            >
              Explorer nos solutions
            </PrimaryButton>
            <SecondaryButton
              onClick={() => navigate('/demande-devis')}
              aria-label="Demander un devis gratuit"
            >
              Obtenir un devis gratuit
            </SecondaryButton>
          </HeroButtons>
        </TitleSection>

        <StatsSection aria-label="Nos chiffres cles">
          <StatWithCounter end={1000} suffix="+" label="Projets Accompagnes" />
          <StatDivider />
          <StatWithCounter end={200} suffix="+" label="Entreprises Partenaires" />
          <StatDivider />
          <StatWithCounter end={15} suffix="+" label="Annees d'Excellence" />
          <StatDivider />
          <StatWithCounter end={98} suffix="%" label="Satisfaction Client" />
        </StatsSection>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 2rem 6rem;
  overflow: hidden;
  background: ${theme.gradientConsulting};

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 85vh;
    padding: 5rem 1rem 3rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: auto;
    padding: 2rem 0.75rem 2rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background: url('https://cdn.elearningindustry.com/wp-content/uploads/2023/02/shutterstock_665953069.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.15;
  filter: saturate(0.3);
  animation: slowZoomIn 2.5s ease-out both;

  @keyframes slowZoomIn {
    0% {
      transform: scale(1.1);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0.15;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    opacity: 0.25;
    filter: saturate(0.2);
  }
`;

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
`;

const GoldLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${theme.gradientGold};
  z-index: 5;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 0.35rem;
    margin-bottom: 1.5rem;
  }
`;

const NavItem = styled.div`
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

const NavLink = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  padding: clamp(0.5rem, 1.5vw, 0.875rem) clamp(0.875rem, 2.5vw, 1.75rem);
  color: rgba(255, 255, 255, 0.85);
  font-size: clamp(0.78rem, 1.1vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: ${theme.borderRadius['2xl']};
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;

  &:hover {
    background: rgba(200, 150, 62, 0.15);
    color: ${theme.white};
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(200, 150, 62, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondary};
    outline-offset: 2px;
  }
`;

const TitleSection = styled.div`
  animation: ${fadeInUp} 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  margin-bottom: 3.5rem;
`;

const Eyebrow = styled.div`
  font-family: 'Plus Jakarta Sans Variable', sans-serif;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${theme.secondary};
  margin-bottom: 1.5rem;
`;

const MainTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.25rem, 7vw, 5rem);
  font-weight: 900;
  color: ${theme.white};
  margin-bottom: 1.75rem;
  line-height: 1.08;
  letter-spacing: -0.02em;
`;

const GoldText = styled.span`
  background: linear-gradient(90deg, #c8963e, #dbb06a, #e8c882, #dbb06a, #c8963e);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
  font-style: italic;
`;

const SubTitle = styled.p`
  font-size: clamp(0.95rem, 1.6vw, 1.25rem);
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 2.5rem;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-weight: 400;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const PrimaryButton = styled.button`
  background: ${theme.gradientGold};
  color: ${theme.primaryDark};
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  font-weight: 700;
  padding: clamp(0.875rem, 1.5vw, 1.125rem) clamp(1.75rem, 3vw, 2.5rem);
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 20px rgba(200, 150, 62, 0.3);
  letter-spacing: 0.02em;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 32px rgba(200, 150, 62, 0.45);
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  font-weight: 600;
  padding: clamp(0.875rem, 1.5vw, 1.125rem) clamp(1.75rem, 3vw, 2.5rem);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  letter-spacing: 0.02em;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.5);
    color: ${theme.white};
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const StatsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  animation: ${fadeInUp} 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
  padding: clamp(1.25rem, 2vw, 2rem) clamp(1rem, 3vw, 3rem);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  border-radius: ${theme.borderRadius['3xl']};
  border: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

const StatDivider = styled.div`
  width: 1px;
  height: 48px;
  background: rgba(255, 255, 255, 0.12);
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const StatItem = styled.div`
  text-align: center;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-width: 120px;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    min-width: 100px;
  }
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: ${theme.white};
  margin-bottom: 0.25rem;
  line-height: 1;
`;

const StatSuffix = styled.span`
  color: ${theme.secondary};
`;

const StatLabel = styled.div`
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;
