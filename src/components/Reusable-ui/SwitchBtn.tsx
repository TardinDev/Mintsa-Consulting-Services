
import React from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useClerkAuth } from '../../hooks/useClerkAuth';
import { useUIStore } from '../../stores';
import theme from '../../utils/Theme/theme';

const SwitchBtn: React.FC = () => {
  const { isAdmin } = useClerkAuth();
  const { isAdminPanelVisible, toggleAdminPanel } = useUIStore();

  const handleClick = () => {
    if (isAdmin) {
      toggleAdminPanel();
    } else {
      console.log("Vous devez être admin pour accéder au panneau de gestion");
    }
  };

  const isOn = isAdmin && isAdminPanelVisible;

  return (
    <SwitchBtnStyle
      $isOn={isOn}
      $isAdmin={isAdmin}
      onClick={handleClick}
    >
      <div className="circle">
        <FaCircle size={10} color={isOn ? theme.black : theme.gray500} />
      </div>
      <span>
        {!isAdmin
          ? 'Connectez-vous en tant qu\'admin'
          : isAdminPanelVisible
            ? 'Masquer'
            : 'Afficher'
        }
      </span>
    </SwitchBtnStyle>
  );
};

export default SwitchBtn;

const SwitchBtnStyle = styled.div<{ $isOn: boolean; $isAdmin: boolean }>`
  background: ${(props) => (props.$isOn ? 'rgba(199, 123, 59, 0.12)' : theme.gray100)};
  padding: 0.15rem 0.3rem;
  border: 1px solid ${(props) => (props.$isOn ? theme.copperLine : theme.lineStrong)};
  border-radius: ${theme.borderRadius.full};
  width: 4.5rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$isAdmin ? 'pointer' : 'not-allowed')};
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$isAdmin ? 1 : 0.6)};
  transition: all ${theme.transition.fast};

  &:hover {
    border-color: ${(props) => (props.$isAdmin ? theme.primary : theme.lineStrong)};
    transform: ${(props) => (props.$isAdmin ? 'scale(1.02)' : 'none')};
  }

  .circle {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.$isOn ? 'calc(100% - 15px)' : '3px')};
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => (props.$isOn ? theme.primary : theme.gray400)};
    transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    color: ${(props) => (props.$isOn ? theme.primaryLight : theme.gray500)};
    font-family: ${theme.fontBody};
    transition: color 0.3s ease;
    text-align: center;
    width: 100%;
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    line-height: 1;
  }
`;
