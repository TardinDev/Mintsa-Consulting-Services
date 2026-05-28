import theme from "../../../utils/Theme/theme";
import SwitchBtn from "../../Reusable-ui/SwitchBtn";
import styled from 'styled-components';
import { BsPersonCircle } from "react-icons/bs";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

type RightSideHeaderType = {
  isAuthenticated: boolean;
  handleConnectionClick: () => void;
};

const RightSideHeader:React.FC<RightSideHeaderType> = ({ isAuthenticated, handleConnectionClick }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <RightSideHeaderStyle>
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
  flex-shrink: 0;
  position: relative;
  z-index: 9999;
`;

const AdminSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
  background: ${theme.gray200};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.line};
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
  background: rgba(199, 123, 59, 0.1);
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.copperLine};
`;

const AdminDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const AdminName = styled.div`
  font-family: ${theme.fontBody};
  color: ${theme.white};
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.01em;
`;

const AdminStatus = styled.div`
  font-family: ${theme.fontBody};
  color: ${theme.secondaryLight};
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
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
  padding: 0.4rem 0.55rem;
  background: ${theme.gray100};
  color: ${theme.gray700};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontBody};
  font-size: 0.68rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ${'cubic-bezier(0.16, 1, 0.3, 1)'};

  &:hover {
    background: rgba(199, 123, 59, 0.1);
    border-color: ${theme.copperLine};
    color: ${theme.white};
  }

  &.logout-btn:hover {
    background: rgba(208, 106, 91, 0.12);
    border-color: rgba(208, 106, 91, 0.4);
    color: ${theme.error};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 1px;
  }
`;

const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.62rem 1.4rem;
  background: transparent;
  color: ${theme.gray800};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ${'cubic-bezier(0.16, 1, 0.3, 1)'};
  letter-spacing: 0.01em;

  &:hover {
    background: rgba(199, 123, 59, 0.08);
    border-color: ${theme.primary};
    color: ${theme.white};
    transform: translateY(-3px);
    box-shadow: ${theme.shadowCopper};
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 2px;
  }
`;
