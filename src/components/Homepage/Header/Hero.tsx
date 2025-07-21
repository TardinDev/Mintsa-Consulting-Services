import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';
import navitems from '../../../utils/data/navitems';

const Hero: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <HeroContainer>
      <HeroBackground />
      <HeroContent>
        <NavBar>
          {navitems.map((item, index) => (
            <NavItem key={item.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <NavLink onClick={() => toggleMenu(item.title)}>
                {item.title}
              </NavLink>

              {activeMenu === item.title && (
                <SubMenu>
                  {item.subLinks.map((subLink, index) => (
                    <li key={index}>
                      <SubLink href={subLink.href}>{subLink.label}</SubLink>
                    </li>
                  ))}
                </SubMenu>
              )}
            </NavItem>
          ))}
        </NavBar>

        <TitleSection>
          <MainTitle>Excellence en Consulting</MainTitle>
          <SubTitle>
            Votre partenaire de confiance pour transformer vos défis en opportunités. 
            Nous accompagnons votre croissance avec expertise et innovation.
          </SubTitle>
          <HeroButtons>
            <PrimaryButton>Découvrir nos services</PrimaryButton>
            <SecondaryButton>Demander un devis</SecondaryButton>
          </HeroButtons>
        </TitleSection>

        <StatsSection>
          <StatItem>
            <StatNumber>500+</StatNumber>
            <StatLabel>Projets Réalisés</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Clients Satisfaits</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>10+</StatNumber>
            <StatLabel>Années d'Expérience</StatLabel>
          </StatItem>
        </StatsSection>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
  background: ${theme.gradientConsulting};
  
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 70vh;
    padding: 4rem 1rem 2rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
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

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  animation: fadeInUp 0.6s ease-out both;
  
  @keyframes fadeInUp {
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
  transition: all ${theme.transition.normal};
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLg};
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SubMenu = styled.ul`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0 0;
  box-shadow: ${theme.shadowXl};
  border-radius: ${theme.borderRadius.lg};
  z-index: ${theme.zDropdown};
  min-width: 200px;
  animation: slideDown 0.3s ease-out;

  & > li {
    padding: 0;
  }

  & > li:hover {
    background: ${theme.gray100};
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SubLink = styled.a`
  display: block;
  text-decoration: none;
  color: ${theme.gray800};
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  transition: all ${theme.transition.fast};

  &:hover {
    color: ${theme.primary};
    background: ${theme.gray50};
  }
`;

const TitleSection = styled.div`
  animation: fadeInUp 0.8s ease-out 0.2s both;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: ${theme.white};
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
  transition: all ${theme.transition.normal};
  box-shadow: ${theme.shadowLg};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadowXl};
    background: ${theme.gray50};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem 2rem;
    font-size: 1rem;
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
  transition: all ${theme.transition.normal};

  &:hover {
    background: ${theme.white};
    color: ${theme.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  animation: fadeInUp 1s ease-out 0.4s both;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 2rem;
    flex-wrap: wrap;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${theme.secondary};
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
`;
