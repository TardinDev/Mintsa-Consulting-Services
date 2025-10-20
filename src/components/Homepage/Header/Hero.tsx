import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '../../../utils/Theme/theme';
import navitems from '../../../utils/data/navitems';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <HeroBackground />
      <HeroContent>
        <NavBar>
          {navitems.map((item, index) => (
            <NavItem key={item.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <NavLink onClick={() => navigate(item.href)}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </NavBar>

        <TitleSection>
          <MainTitle>Votre Partenaire d'Excellence en Consulting</MainTitle>
          <SubTitle>
            Solutions sur-mesure pour propulser votre entreprise vers le succès.<br />
            De l'administration à la fiscalité, de l'automobile à l'immobilier, nous transformons vos ambitions en réalité.
          </SubTitle>
          <HeroButtons>
            <PrimaryButton onClick={() => window.scrollTo({ top: document.querySelector('#catalogue')?.getBoundingClientRect().top! + window.scrollY - 100, behavior: 'smooth' })}>
              Explorer nos solutions
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/demande-devis')}>
              Obtenir un devis gratuit
            </SecondaryButton>
          </HeroButtons>
        </TitleSection>

        <StatsSection>
          <StatItem>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Projets Accompagnés</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>200+</StatNumber>
            <StatLabel>Entreprises Partenaires</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15+</StatNumber>
            <StatLabel>Années d'Excellence</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>98%</StatNumber>
            <StatLabel>Satisfaction Client</StatLabel>
          </StatItem>
        </StatsSection>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

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
  
  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: 90vh;
    padding: 6rem 1.5rem 4rem;
  }
  
  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 80vh;
    padding: 5rem 1rem 3rem;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
  }
  
  /* Mobiles - Header n'est plus fixed, donc moins de padding-top */
  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: 70vh;
    padding: 2rem 0.75rem 2rem;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
  
  /* Très petits écrans - Header n'est plus fixed, donc moins de padding-top */
  @media (max-width: 480px) {
    min-height: 60vh;
    padding: 1.5rem 0.5rem 1.5rem;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://cdn.elearningindustry.com/wp-content/uploads/2023/02/shutterstock_665953069.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  animation: slowZoomIn 2s ease-out both;

  @keyframes slowZoomIn {
    0% {
      transform: scale(1.1);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
  
  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    opacity: 0.4;
  }
  
  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    opacity: 0.5;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    opacity: 0.6;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    gap: 0.75rem;
    margin-bottom: 3rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }
  
  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 0.25rem;
    margin-bottom: 2rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    gap: 0.25rem;
    margin-bottom: 1.5rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  animation: fadeInUpSlow 1s cubic-bezier(0.16, 1, 0.3, 1) both;

  @keyframes fadeInUpSlow {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    60% {
      transform: translateY(-5px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const NavLink = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  color: ${theme.white};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  
  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;


const TitleSection = styled.div`
  animation: fadeInUpTitle 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
  margin-bottom: 3rem;

  @keyframes fadeInUpTitle {
    0% {
      opacity: 0;
      transform: translateY(50px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  color: ${theme.white};
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.1;

  /* Grands écrans */
  @media (max-width: 1400px) {
    font-size: 4rem;
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 3.5rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.75rem;
    line-height: 1.2;
  }

  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    font-size: 1.875rem;
    line-height: 1.3;
  }
`;

const SubTitle = styled.p`
  font-size: 1.375rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  /* Grands écrans */
  @media (max-width: 1400px) {
    font-size: 1.25rem;
    max-width: 750px;
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 1.2rem;
    max-width: 700px;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
    max-width: 600px;
    margin-bottom: 2rem;
  }

  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
    max-width: 100%;
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.8;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    gap: 1.25rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 0.875rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const PrimaryButton = styled.button`
  background: ${theme.white};
  color: ${theme.primary};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1.25rem 2.5rem;
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${theme.shadowLg};

  &:hover {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    background: ${theme.gray50};
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 1.125rem 2.25rem;
    font-size: 1.05rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${theme.white};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1.25rem 2.5rem;
  border: 2px solid ${theme.white};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    background: ${theme.white};
    color: ${theme.primary};
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 12px 40px rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 1.125rem 2.25rem;
    font-size: 1.05rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  animation: fadeInUpStats 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;

  @keyframes fadeInUpStats {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Grands écrans */
  @media (max-width: 1400px) {
    gap: 2.5rem;
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    gap: 2rem;
    margin-top: 3.5rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }

  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  /* Très petits écrans */
  @media (max-width: 480px) {
    gap: 1.25rem;
    margin-top: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-8px) scale(1.05);
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${theme.secondary};
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  /* Grands écrans */
  @media (max-width: 1400px) {
    font-size: 3.25rem;
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 3rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2.25rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  /* Grands écrans */
  @media (max-width: 1400px) {
    font-size: 1.1rem;
  }

  /* Tablettes */
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 1.05rem;
  }

  /* Tablettes moyennes */
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }

  /* Mobiles */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.95rem;
  }
  
  /* Très petits écrans */
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;
