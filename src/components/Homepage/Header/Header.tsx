import React from 'react';
import styled from 'styled-components';
import { FaWhatsappSquare } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs'; // Icone Person Circle
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import theme from '../../../utils/theme';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleConnexionClick = () => {
    if (isAuthenticated) {
      logout(); // Déconnexion de l'utilisateur
    } else {
      navigate('/login'); // Redirection vers la page de connexion
    }
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <ServiceText>
          Mintsa Consulting <br />
          <span className="whatsappNumber">
            <FaWhatsappSquare size={25} color="#88C273" />
            <span className="number">+241 04 85 34 84</span>
          </span>
        </ServiceText>
      </LogoContainer>
      <SearchContainer>
        <SearchInput type="text" placeholder="Rechercher" />
        <SearchButton>🔍</SearchButton>
      </SearchContainer>
      <RightSideHeader>
        <ShippingButton>
          <span>Service disponible</span>
          <span>24/24 🚚</span>
        </ShippingButton>
        {isAuthenticated ? (
          <AdminSection>
           
            <span className="connexion" onClick={handleConnexionClick}>
              Déconnexion
            </span>
            <div className='nameAndIcon'>
               <BsPersonCircle size={50} color="#fff" />
               <span className="admin-text">Admin</span>
            </div>
           

          </AdminSection>
        ) : (
          <span className="connexion" onClick={handleConnexionClick}>
            Connexion
          </span>
        )}
      </RightSideHeader>
    </HeaderContainer>
  );
};

export default Header;

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${theme.blue};
  border-bottom: 1px solid ${theme.lightGrey};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ServiceText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.white};
  cursor: pointer;

  .number {
    color: ${theme.primary};
    font-size: 1rem;
  }

  .whatsappNumber {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.lightGrey};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 0.5rem;
  flex: 1;
  font-size: 1rem;
  color: ${theme.secondary};

  &::placeholder {
    color: ${theme.secondary};
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: ${theme.primary};
  color: ${theme.white};
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e65c00;
  }
`;

const RightSideHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .connexion {
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.1rem 1rem;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: transparent;
    transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

    &:hover {
      border-color: orange;
      background-color: #e65c00;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }
  }
`;

const ShippingButton = styled.div`
  background-color: ${theme.primary};
  color: ${theme.white};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AdminSection = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  gap: 5px;

  .nameAndIcon {
     display:flex;
     flex-direction:column;
     gap:5px;
    justify-content: center;
    align-items:center;

    margin-Left:5px;
    margin-top:5px;
  }

  .admin-text {
    color: #fff;
    font-size: 1rem;
  }

  .connexion {
    margin-top: 5px;
  }
`;
