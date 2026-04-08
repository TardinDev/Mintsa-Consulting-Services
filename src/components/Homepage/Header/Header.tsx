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
  height: 2px;
  background: ${theme.gradientGold};
  opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0.4)};
  transition: opacity 0.6s ease;
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(200, 150, 62, 0.3);
  border-radius: ${theme.borderRadius.md};
  width: 44px;
  height: 44px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(200, 150, 62, 0.15);
    border-color: ${theme.secondary};
    color: ${theme.white};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 43, 91, 0.6);
  z-index: ${theme.zFixed - 1};
  backdrop-filter: blur(6px);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
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
      ? 'rgba(15, 43, 91, 0.97)'
      : theme.gradientPrimary
  };
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(20px) saturate(1.2)' : 'blur(8px)'
  };
  border-bottom: none;
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled
      ? '0 4px 30px rgba(15, 43, 91, 0.25)'
      : '0 2px 8px rgba(0, 0, 0, 0.08)'
  };
  transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
  padding: ${({ $isScrolled }) =>
    $isScrolled ? '0.6rem 0' : '0.9rem 0'
  };

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0.75rem 0;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    position: relative;
    padding: 0.75rem 0;
    background: ${theme.gradientPrimary};
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
