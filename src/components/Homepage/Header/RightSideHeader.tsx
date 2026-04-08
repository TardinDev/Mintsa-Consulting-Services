import theme from "../../../utils/Theme/theme";
import SwitchBtn from "../../Reusable-ui/SwitchBtn";
import styled from 'styled-components';
import { BsPersonCircle } from "react-icons/bs";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useClerkAuth } from '../../../hooks/useClerkAuth';

type RightSideHeaderType = {
  isAuthenticated: boolean;
  handleConnectionClick: () => void;
};

const RightSideHeader:React.FC<RightSideHeaderType> = ({ isAuthenticated, handleConnectionClick }) => {
  const navigate = useNavigate();
  const { isAdmin } = useClerkAuth();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <RightSideHeaderStyle>
      {!isAuthenticated || !isAdmin ? (
        <AvailabilityBadge>
          <BadgeDot />
          <span>Disponible 24/24</span>
        </AvailabilityBadge>
      ) : null}

      {isAuthenticated ? (
        <AdminSection>
          <AdminInfo>
            <AdminIcon>
              <BsPersonCircle size={28} color={theme.secondary} />
            </AdminIcon>
            <AdminDetails>
              <AdminName>Administrateur</AdminName>
              <AdminStatus>Mode Admin</AdminStatus>
            </AdminDetails>
          </AdminInfo>

          <AdminControls>
            <ControlButton title="Mode Admin" aria-label="Toggle mode admin">
              <FaCog size={14} />
              <SwitchBtn />
            </ControlButton>

            <ControlButton
              onClick={handleProfileClick}
              title="Mon profil"
              aria-label="Voir le profil"
            >
              <FaUser size={14} />
              <span>Profil</span>
            </ControlButton>

            <ControlButton
              onClick={handleConnectionClick}
              title="Se deconnecter"
              className="logout-btn"
              aria-label="Se deconnecter"
            >
              <FaSignOutAlt size={14} />
              <span>Deconnexion</span>
            </ControlButton>
          </AdminControls>
        </AdminSection>
      ) : (
        <LoginButton onClick={handleConnectionClick} aria-label="Se connecter">
          <BsPersonCircle size={18} />
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
  min-width: 160px;
  flex-shrink: 0;
  position: relative;
  z-index: 9999;
`;

const AvailabilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(200, 150, 62, 0.12);
  border: 1px solid rgba(200, 150, 62, 0.25);
  color: ${theme.secondary};
  padding: 0.4rem 1rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(200, 150, 62, 0.18);
    border-color: rgba(200, 150, 62, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const BadgeDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const AdminSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: ${theme.borderRadius.lg};
  backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 150, 62, 0.15);
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
  width: 36px;
  height: 36px;
  background: rgba(200, 150, 62, 0.1);
  border-radius: ${theme.borderRadius.full};
  border: 1px solid rgba(200, 150, 62, 0.2);
`;

const AdminDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const AdminName = styled.div`
  color: ${theme.white};
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.01em;
`;

const AdminStatus = styled.div`
  color: ${theme.secondary};
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  gap: 0.3rem;
  padding: 0.35rem 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.68rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(200, 150, 62, 0.12);
    border-color: rgba(200, 150, 62, 0.3);
    color: ${theme.white};
  }

  &.logout-btn:hover {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.4);
    color: #fca5a5;
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondary};
    outline-offset: 1px;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.35rem;
  background: rgba(200, 150, 62, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(200, 150, 62, 0.3);
  border-radius: ${theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;

  &:hover {
    background: rgba(200, 150, 62, 0.2);
    border-color: ${theme.secondary};
    color: ${theme.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(200, 150, 62, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondary};
    outline-offset: 2px;
  }
`;
