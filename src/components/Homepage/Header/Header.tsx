import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useClerkAuth } from '../../../hooks/useClerkAuth';
import theme from '../../../utils/Theme/theme';
import AdminProductManagement from '../../Admin/AdminProductManagement';
import ServiceText from './ServiceText';
import SearchContainer from './SearchContainer';
import RightSideHeader from './RightSideHeader';
import { ProductType } from '../../../utils/type/type';
import { useState, useEffect } from 'react';
import { useUIStore } from '../../../stores';
import { FaBars, FaTimes } from 'react-icons/fa';
import navitems from '../../../utils/data/navitems';

type HeaderType = {
  selectedProductForEdit: ProductType | null;
  setSelectedProductForEdit: React.Dispatch<React.SetStateAction<ProductType | null>>;
}

const Header: React.FC<HeaderType> = ({selectedProductForEdit, setSelectedProductForEdit}) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, isAdmin } = useClerkAuth();
  const { isAdminPanelVisible } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConnectionClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer
        $isScrolled={isScrolled}
        $isAdminConnected={isAuthenticated && isAdmin}
        role="banner"
      >
        <GoldAccent $isScrolled={isScrolled} aria-hidden="true" />
        <HeaderContent>
          <LeftSection>
            <LogoContainer onClick={() => navigate('/')}>
              <ServiceText />
            </LogoContainer>
          </LeftSection>

          <CenterSection className={isMobileMenuOpen ? 'mobile-visible' : ''}>
            <SearchContainer />
          </CenterSection>

          <RightSection className={isMobileMenuOpen ? 'mobile-visible' : ''}>
            <RightSideHeader
              isAuthenticated={isAuthenticated}
              handleConnectionClick={handleConnectionClick}
            />
          </RightSection>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </MobileMenuButton>
        </HeaderContent>

        <SubHeader
          $isScrolled={isScrolled}
          className={isMobileMenuOpen ? 'mobile-visible' : ''}
          aria-label="Domaines d'expertise"
        >
          <SubNavInner>
            <SubNavList>
              {navitems.map((item, index) => (
                <SubNavLink
                  key={item.title}
                  onClick={() => { navigate(item.href); setIsMobileMenuOpen(false); }}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && (navigate(item.href), setIsMobileMenuOpen(false))}
                >
                  <SubNavNum aria-hidden="true">{String(index + 1).padStart(2, '0')}</SubNavNum>
                  {item.title}
                </SubNavLink>
              ))}
            </SubNavList>

            {(!isAuthenticated || !isAdmin) && (
              <AvailabilityBadge>
                <BadgeDot aria-hidden="true" />
                <span>Disponible 24/24</span>
              </AvailabilityBadge>
            )}
          </SubNavInner>
        </SubHeader>
      </HeaderContainer>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <MobileOverlay onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {isAuthenticated && isAdmin && isAdminPanelVisible && (
        <AdminProductManagement
          selectedProductForEdit={selectedProductForEdit}
          setSelectedProductForEdit={setSelectedProductForEdit}
        />
      )}
    </>
  );
};

export default Header;

const GoldAccent = styled.div<{ $isScrolled: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: ${({ $isScrolled }) =>
    $isScrolled ? theme.gradientGold : theme.line};
  opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0.6)};
  transition: opacity 0.5s ${'cubic-bezier(0.16, 1, 0.3, 1)'},
    background 0.5s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
`;

const SubHeader = styled.nav<{ $isScrolled: boolean }>`
  border-top: 1px solid ${theme.line};
  max-height: ${({ $isScrolled }) => ($isScrolled ? '0' : '60px')};
  opacity: ${({ $isScrolled }) => ($isScrolled ? 0 : 1)};
  overflow: hidden;
  transition: max-height 0.5s ${'cubic-bezier(0.16, 1, 0.3, 1)'},
    opacity 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'},
    margin 0.5s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  margin-top: ${({ $isScrolled }) => ($isScrolled ? '0' : '0.7rem')};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
    max-height: none;
    opacity: 1;
    border-top: none;

    &.mobile-visible {
      display: block;
      width: 100%;
    }
  }
`;

const SubNavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.65rem 2rem 0.15rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem 1rem 0.75rem;
  }
`;

const SubNavList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(0.55rem, 1vw, 0.95rem);

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    width: 100%;
  }
`;

const AvailabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  color: ${theme.gray600};
  padding: 0.36rem 0.85rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &:hover {
    border-color: ${theme.copperLine};
    color: ${theme.gray800};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
    margin-top: 0.75rem;
    padding: 0.55rem 0.85rem;
  }
`;

const BadgeDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.success};
  box-shadow: 0 0 8px rgba(63, 185, 138, 0.6);
  animation: badgePulse 2.4s ease-in-out infinite;
  flex-shrink: 0;

  @keyframes badgePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(0.82); }
  }
`;


const SubNavNum = styled.span`
  font-family: ${theme.fontDisplay};
  font-size: 0.68rem;
  font-weight: 600;
  color: ${theme.primary};
  margin-right: 0.32rem;
  font-feature-settings: 'tnum';
`;

const SubNavLink = styled.div`
  position: relative;
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  font-weight: 500;
  color: ${theme.gray700};
  cursor: pointer;
  white-space: nowrap;
  padding: 0.3rem 0;
  transition: color 0.3s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 1px;
    background: ${theme.gradientGold};
    transition: width 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  }

  &:hover { color: ${theme.white}; }
  &:hover::after { width: 100%; }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    white-space: normal;
    padding: 0.7rem 0;
    border-bottom: 1px solid ${theme.line};
    &::after { display: none; }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: ${theme.gray100};
  color: ${theme.gray800};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.md};
  width: 44px;
  height: 44px;
  cursor: pointer;
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &:hover {
    background: rgba(199, 123, 59, 0.08);
    border-color: ${theme.primary};
    color: ${theme.white};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 11, 9, 0.72);
  z-index: ${theme.zFixed - 1};
  backdrop-filter: blur(6px);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: opacity 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.82;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    padding: 0 1rem;
    gap: 1rem;
  }
`;

const HeaderContainer = styled.header<{ $isScrolled: boolean; $isAdminConnected: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${theme.zFixed};
  background: ${({ $isScrolled }) =>
    $isScrolled
      ? 'rgba(20, 17, 14, 0.92)'
      : 'rgba(20, 17, 14, 0.55)'
  };
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(20px) saturate(1.1)' : 'blur(10px)'
  };
  border-bottom: none;
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? theme.shadowMd : 'none'
  };
  transition: all 0.5s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  padding: ${({ $isScrolled }) =>
    $isScrolled ? '0.6rem 0' : '0.95rem 0'
  };

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.75rem 0;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    position: relative;
    padding: 0.75rem 0;
    background: ${theme.cream};
    backdrop-filter: none;
    box-shadow: none;
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    position: fixed;
    animation: headerReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes headerReveal {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 480px;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
    width: 100%;
    max-width: none;
    order: 3;
    padding: 0.5rem 0;

    &.mobile-visible {
      display: flex;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
    width: 100%;
    order: 4;

    &.mobile-visible {
      display: flex;
      justify-content: center;
      padding: 0.5rem 0;
    }
  }
`;
