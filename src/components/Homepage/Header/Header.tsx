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

type HeaderType = {
  selectedProductForEdit: ProductType | null;
  setSelectedProductForEdit: React.Dispatch<React.SetStateAction<ProductType | null>>;
}

const Header: React.FC<HeaderType> = ({selectedProductForEdit, setSelectedProductForEdit}) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, isAdmin } = useClerkAuth();
  const { isAdminPanelVisible } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnectionClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <HeaderContainer isScrolled={isScrolled} isAdminConnected={isAuthenticated && isAdmin}>
        <HeaderContent>
          {/* Élément 1 : Logo à l'extrême gauche */}
          <LeftSection>
            <LogoContainer>
              <ServiceText />
            </LogoContainer>
          </LeftSection>

          {/* Élément 2 : Recherche au centre */}
          <CenterSection>
            <SearchContainer />
          </CenterSection>

          {/* Élément 3 : Mode admin à l'extrême droite */}
          <RightSection>
            <RightSideHeader 
              isAuthenticated={isAuthenticated} 
              handleConnectionClick={handleConnectionClick} 
            />
          </RightSection>
        </HeaderContent>
      </HeaderContainer>

      {/* Panneau admin en position fixed */}
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform ${theme.transition.normal};
  flex-shrink: 0;

  &:hover {
    transform: scale(1.02);
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
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const HeaderContainer = styled.header<{ isScrolled: boolean; isAdminConnected: boolean }>`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${theme.zFixed};
  background: ${({ isScrolled }) => 
    isScrolled 
      ? 'rgba(30, 64, 175, 0.95)' 
      : theme.gradientPrimary
  };
  backdrop-filter: ${({ isScrolled }) => 
    isScrolled ? 'blur(10px)' : 'none'
  };
  border-bottom: ${({ isScrolled }) => 
    isScrolled 
      ? `1px solid ${theme.gray200}` 
      : 'none'
  };
  box-shadow: ${({ isScrolled }) => 
    isScrolled 
      ? theme.shadowLg 
      : 'none'
  };
  transition: all ${theme.transition.normal};
  padding: ${({ isScrolled }) => 
    isScrolled ? '0.75rem 0' : '1rem 0'
  };

  /* Tablettes moyennes - Header reste fixed mais avec ajustements */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem 0;
  }

  /* Mobiles - Header n'est plus fixed */
  @media (max-width: ${theme.breakpoints.sm}) {
    position: relative;
    padding: 1rem 0;
    background: ${theme.gradientPrimary};
    backdrop-filter: none;
    border-bottom: none;
    box-shadow: none;
    animation: none;
  }

  /* Très petits écrans - Header n'est plus fixed */
  @media (max-width: 480px) {
    position: relative;
    padding: 0.75rem 0;
  }

  /* Animation d'entrée - seulement sur les écrans larges */
  @media (min-width: ${theme.breakpoints.sm}) {
    animation: slideDown 0.5s ease-out;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
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
  max-width: 500px;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-width: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
`;






