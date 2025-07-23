
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

  return (
    <SwitchBtnStyle 
      isAdminMode={isAdmin && isAdminPanelVisible} 
      isAdmin={isAdmin}
      onClick={handleClick}
    >
      <div className="circle">
        <FaCircle size={12} color={isAdmin && isAdminPanelVisible ? `${theme.orange}` : `${theme.lightGrey}`} />
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

const SwitchBtnStyle = styled.div<{isAdminMode: boolean; isAdmin: boolean}>`
  background-color: ${theme.black};
  padding: 0.15rem 0.3rem;
  border: 1px solid ${(props) => (props.isAdminMode ? `${theme.lightGrey}` : `${theme.orange}`)};
  border-radius: 10px;
  width: 4.5rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isAdmin ? 'pointer' : 'not-allowed')};
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.isAdmin ? 1 : 0.6)};
  transition: all 0.3s ease;

  &:hover {
    opacity: ${(props) => (props.isAdmin ? 1 : 0.6)};
    transform: ${(props) => (props.isAdmin ? 'scale(1.02)' : 'none')};
  }

  .circle {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.isAdminMode ? 'calc(100% - 16px)' : '2px')};
    transform: translateY(-50%);
    transition: left 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    color: ${(props) => (props.isAdminMode ? `${theme.orange}` : `${theme.lightGrey}`)};
    transition: color 0.3s ease;
    text-align: center;
    width: 100%;
    font-size: 0.6rem;
    font-weight: 500;
    white-space: nowrap;
    line-height: 1;
  }
`;
