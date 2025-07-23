import theme from "../../../utils/Theme/theme";
import SwitchBtn from "../../Reusable-ui/SwitchBtn";
import styled from 'styled-components';
import { BsPersonCircle } from "react-icons/bs";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useClerkAuth } from '../../../hooks/useClerkAuth';

type RightSideHeaderType = {
  isAuthenticated: boolean;   // Indique si l'utilisateur est connecté
  handleConnectionClick: () => void; // Fonction pour gérer la connexion/déconnexion
};

const RightSideHeader:React.FC<RightSideHeaderType> = ({ isAuthenticated, handleConnectionClick }) => {
  const navigate = useNavigate();
  const { isAdmin } = useClerkAuth();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <RightSideHeaderStyle>
      {/* Afficher "Service disponible" seulement si l'utilisateur n'est pas admin connecté */}
      {!isAuthenticated || !isAdmin ? (
        <ShippingButton>
          <span>Service disponible</span>
          <span> 🚚  24/24</span>
        </ShippingButton>
      ) : null}

      {isAuthenticated ? (
        <AdminSection>
          <AdminInfo>
            <AdminIcon>
              <BsPersonCircle size={40} color={theme.white} />
            </AdminIcon>
            <AdminDetails>
              <AdminName>Administrateur</AdminName>
              <AdminStatus>Mode Admin Actif</AdminStatus>
            </AdminDetails>
          </AdminInfo>

          <AdminControls>
            <ControlButton title="Mode Admin">
              <FaCog size={16} />
              <SwitchBtn />
            </ControlButton>
            
            <ControlButton 
              onClick={handleProfileClick}
              title="Mon profil"
            >
              <FaUser size={16} />
              <span>Profil</span>
            </ControlButton>
            
            <ControlButton 
              onClick={handleConnectionClick}
              title="Se déconnecter"
              className="logout-btn"
            >
              <FaSignOutAlt size={16} />
              <span>Déconnexion</span>
            </ControlButton>
          </AdminControls>
        </AdminSection>
      ) : (
        <LoginButton onClick={handleConnectionClick}>
          <BsPersonCircle size={20} />
          <span>Connexion</span>
        </LoginButton>
      )}
    </RightSideHeaderStyle>
  )
}

export default RightSideHeader;

const RightSideHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 180px;
  flex-shrink: 0;
  position: relative;
  z-index: 9999;

  .connection {
    color: ${theme.white};
    padding: 0.3rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: transparent;
    transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

    &:hover {
      border-color: orange;
      background-color: ${theme.primary};
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }
  }
`;

const ShippingButton = styled.div`
  background-color: ${theme.secondary};
  color: ${theme.white};
  padding: 0.25rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }

  span {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AdminSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.md};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AdminIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.full};
  backdrop-filter: blur(10px);
`;

const AdminDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const AdminName = styled.div`
  color: ${theme.white};
  font-weight: 600;
  font-size: 0.8rem;
`;

const AdminStatus = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.7rem;
  font-weight: 500;
`;

const AdminControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.3rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.white};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.65rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &.logout-btn:hover {
    background: ${theme.error}20;
    border-color: ${theme.error};
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.white};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;
