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
      <HeroPhoto
        src="/imagesMintsaservices/hero.jpg"
        alt="L'équipe Mintsa Services & Consulting"
        loading="eager"
        aria-hidden="true"
      />
      <PhotoVeil aria-hidden="true" />
      <GlowOrange aria-hidden="true" />
      <GlowBlue aria-hidden="true" />
      <GoldLine aria-hidden="true" />

      <HeroInner>
        <TextColumn>
          <Eyebrow>
            <EyebrowDot aria-hidden="true" />
            Agence de conseil &amp; services — Gabon
          </Eyebrow>
          <MainTitle>
            L'expertise qui fait<br />
            <Accent>avancer</Accent> vos projets.
          </MainTitle>
          <SubTitle>
            De l'administratif au fiscal, de l'automobile à l'immobilier —
            Mintsa accompagne entreprises et particuliers avec rigueur,
            discrétion et résultats.
          </SubTitle>
          <HeroButtons>
            <PrimaryButton
              onClick={() => window.scrollTo({ top: (document.querySelector('#catalogue')?.getBoundingClientRect().top ?? 0) + window.scrollY - 100, behavior: 'smooth' })}
              aria-label="Découvrir nos services"
            >
              Découvrir nos services
              <ButtonArrow aria-hidden="true">→</ButtonArrow>
            </PrimaryButton>
            <SecondaryButton
              onClick={() => navigate('/demande-devis')}
              aria-label="Demander un devis gratuit"
            >
              Demande de devis
            </SecondaryButton>
          </HeroButtons>
        </TextColumn>

        <StatsSection aria-label="Nos chiffres clés">
          <StatWithCounter end={1000} suffix="+" label="Projets accompagnés" />
          <StatDivider aria-hidden="true" />
          <StatWithCounter end={200} suffix="+" label="Entreprises partenaires" />
          <StatDivider aria-hidden="true" />
          <StatWithCounter end={15} suffix=" ans" label="d'Excellence" />
          <StatDivider aria-hidden="true" />
          <StatWithCounter end={98} suffix="%" label="Satisfaction client" />
        </StatsSection>

        <IndexSection aria-label="Nos domaines d'expertise">
          <IndexLabel>Domaines d'expertise</IndexLabel>
          <IndexGrid>
            {navitems.map((item, index) => (
              <IndexItem
                key={item.title}
                onClick={() => navigate(item.href)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(item.href)}
                style={{ animationDelay: `${0.6 + index * 0.08}s` }}
              >
                <IndexNum>{String(index + 1).padStart(2, '0')}</IndexNum>
                <IndexTitle>{item.title}</IndexTitle>
                <IndexArrow aria-hidden="true">↗</IndexArrow>
              </IndexItem>
            ))}
          </IndexGrid>
        </IndexSection>
      </HeroInner>
    </HeroContainer>
  );
};

export default Hero;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slowZoom = keyframes`
  from { transform: scale(1.08); }
  to { transform: scale(1); }
`;

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 9rem 2rem 4rem;
  overflow: hidden;
  background: ${theme.cream};
  isolation: isolate;

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: auto;
    padding: 6.5rem 1.25rem 3.5rem;
  }
`;

/* Photo plein cadre */
const HeroPhoto = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
  z-index: -3;
  filter: saturate(0.9) contrast(1.02);
  animation: ${slowZoom} 9s ${'cubic-bezier(0.16, 1, 0.3, 1)'} both;
`;

/* Voile bleu nuit pour la lisibilité du texte */
const PhotoVeil = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(100deg, rgba(5, 13, 22, 0.82) 0%, rgba(8, 20, 32, 0.62) 32%, rgba(8, 20, 32, 0.25) 64%, rgba(8, 20, 32, 0.08) 100%),
    linear-gradient(180deg, rgba(8, 20, 32, 0.32) 0%, transparent 26%, transparent 58%, rgba(5, 13, 22, 0.62) 100%);

  @media (max-width: ${theme.breakpoints.md}) {
    background:
      linear-gradient(180deg, rgba(8, 20, 32, 0.58) 0%, rgba(8, 20, 32, 0.42) 38%, rgba(5, 13, 22, 0.78) 100%);
  }
`;

const GlowOrange = styled.div`
  position: absolute;
  top: -22%;
  right: -10%;
  width: 55vw;
  height: 55vw;
  max-width: 760px;
  max-height: 760px;
  background: radial-gradient(circle, rgba(240, 144, 30, 0.16) 0%, rgba(240, 144, 30, 0.04) 40%, transparent 64%);
  pointer-events: none;
  z-index: -1;
  animation: ${fadeIn} 2.2s ease-out both;
`;

const GlowBlue = styled.div`
  position: absolute;
  bottom: -28%;
  left: -12%;
  width: 50vw;
  height: 50vw;
  max-width: 700px;
  max-height: 700px;
  background: radial-gradient(circle, rgba(14, 143, 214, 0.16) 0%, rgba(14, 143, 214, 0.04) 42%, transparent 66%);
  pointer-events: none;
  z-index: -1;
  animation: ${fadeIn} 2.4s ease-out both;
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

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const TextColumn = styled.div`
  max-width: 680px;
  animation: ${fadeInUp} 1s ${'cubic-bezier(0.16, 1, 0.3, 1)'} 0.1s both;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${theme.fontBody};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.secondaryLight};
  margin-bottom: 1.75rem;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 12px ${theme.orangeGlow};
  animation: ${pulse} 2.4s ease-in-out infinite;
`;

const MainTitle = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2.6rem, 6.4vw, 5rem);
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 1.75rem;
  line-height: 1.02;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0;
  text-shadow: 0 2px 30px rgba(5, 13, 22, 0.5);
`;

const Accent = styled.span`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
  font-variation-settings: 'opsz' 144, 'SOFT' 4;
`;

const SubTitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: ${theme.gray700};
  margin-bottom: 2.5rem;
  max-width: 540px;
  line-height: 1.7;
  font-weight: 400;
  text-shadow: 0 1px 16px rgba(5, 13, 22, 0.5);
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ${'cubic-bezier(0.16, 1, 0.3, 1)'} 0.35s both;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ButtonArrow = styled.span`
  display: inline-block;
  transition: transform 0.4s ${'cubic-bezier(0.34, 1.4, 0.64, 1)'};
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: ${theme.gradientGold};
  color: ${theme.black};
  font-family: ${theme.fontBody};
  font-size: 0.98rem;
  font-weight: 700;
  padding: 1rem 1.9rem;
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.5s ${'cubic-bezier(0.34, 1.4, 0.64, 1)'};
  box-shadow: ${theme.shadowOrange};
  letter-spacing: 0.01em;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(240, 144, 30, 0.45);
  }
  &:hover ${ButtonArrow} { transform: translateX(5px); }
  &:active { transform: translateY(-1px); }
`;

const SecondaryButton = styled.button`
  background: rgba(8, 20, 32, 0.4);
  backdrop-filter: blur(6px);
  color: ${theme.white};
  font-family: ${theme.fontBody};
  font-size: 0.98rem;
  font-weight: 600;
  padding: 1rem 1.9rem;
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  letter-spacing: 0.01em;

  &:hover {
    border-color: ${theme.primary};
    color: ${theme.white};
    background: rgba(240, 144, 30, 0.14);
  }
`;

const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 4vw, 3.5rem);
  margin-top: clamp(3rem, 6vw, 5rem);
  padding-top: clamp(2rem, 3vw, 2.75rem);
  border-top: 1px solid ${theme.lineStrong};
  animation: ${fadeInUp} 1s ${'cubic-bezier(0.16, 1, 0.3, 1)'} 0.5s both;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    gap: 1.75rem 2rem;
  }
`;

const StatDivider = styled.div`
  width: 1px;
  height: 42px;
  background: ${theme.lineStrong};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const StatItem = styled.div`
  min-width: 110px;
`;

const StatNumber = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.9rem, 3.4vw, 2.9rem);
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 0.3rem;
  line-height: 1;
  letter-spacing: -0.02em;
  font-feature-settings: 'tnum';
`;

const StatSuffix = styled.span`
  color: ${theme.primary};
  font-style: italic;
`;

const StatLabel = styled.div`
  font-size: 0.78rem;
  color: ${theme.gray600};
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.4;
`;

/* — Index des domaines, pleine largeur — */
const IndexSection = styled.nav`
  margin-top: clamp(2.5rem, 4vw, 3.5rem);
  animation: ${fadeInUp} 1s ${'cubic-bezier(0.16, 1, 0.3, 1)'} 0.65s both;
`;

const IndexLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${theme.gray600};
  margin-bottom: 1rem;
`;

const IndexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid ${theme.lineStrong};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const IndexItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 0.6rem;
  padding: 1.1rem 1.1rem 1.1rem 0;
  border-bottom: 1px solid ${theme.lineStrong};
  cursor: pointer;
  position: relative;
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  animation: ${fadeInUp} 0.8s ${'cubic-bezier(0.16, 1, 0.3, 1)'} both;

  & + & { border-left: 1px solid ${theme.lineStrong}; padding-left: 1.1rem; }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(240, 144, 30, 0.08);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  &:hover::before { opacity: 1; }
  &:hover { border-bottom-color: ${theme.orangeLine}; }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: -2px;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    &:nth-child(odd) { border-left: none; padding-left: 0; }
    &:nth-child(even) { border-left: 1px solid ${theme.lineStrong}; padding-left: 1.1rem; }
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    border-left: none !important;
    padding-left: 0 !important;
  }
`;

const IndexNum = styled.span`
  font-family: ${theme.fontDisplay};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.primary};
  font-feature-settings: 'tnum';
  padding-top: 2px;
`;

const IndexTitle = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.92rem;
  font-weight: 500;
  color: ${theme.gray800};
  line-height: 1.3;
  transition: color 0.3s ease;

  ${IndexItem}:hover & { color: ${theme.white}; }
`;

const IndexArrow = styled.span`
  font-size: 0.95rem;
  color: ${theme.gray600};
  opacity: 0;
  transform: translate(-6px, 4px);
  transition: all 0.4s ${'cubic-bezier(0.34, 1.4, 0.64, 1)'};

  ${IndexItem}:hover & {
    opacity: 1;
    transform: translate(0, 0);
    color: ${theme.primary};
  }
`;
