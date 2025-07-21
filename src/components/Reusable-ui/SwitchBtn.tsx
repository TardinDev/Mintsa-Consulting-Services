
import React from 'react';
import { FaCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useAdminMode } from '../../context/AdminModeContext';
import theme from '../../utils/Theme/theme';

           
const SwitchBtn: React.FC = () => {

  const { isAdminMode, toggleAdminMode } = useAdminMode();

  const handleClick = () => {
    toggleAdminMode(); // Basculer l'état admin mode
    console.log("Admin Mode:", isAdminMode); // Vérifiez ici

  };

  return (
    <SwitchBtnStyle isAdminMode={isAdminMode} onClick={handleClick}>
      <div className="circle">
        <FaCircle size={35} color={isAdminMode ? `${theme.orange}` : `${theme.lightGrey}`} />
      </div>
      <h1>{isAdminMode ? 'Désactive Product Manager' : 'Active Product Manager'}</h1>
    </SwitchBtnStyle>
  );
};

export default SwitchBtn;

const SwitchBtnStyle = styled.div<{isAdminMode : boolean}>`

  background-color:${theme.black};
  padding: 0.3rem 0rem;
  border: 2px solid ${(props) => (props.isAdminMode ? `${theme.lightGrey}` : `${theme.orange}`)};
  border-radius: 18px;
  width: 22rem;

  display: flex;
  justify-content: center;
  align-items: center;
    
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .circle {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.isAdminMode ? 'calc(100% - 45px)' : '10px')};
    transform: translateY(-50%);
    transition: left 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: ${(props) => (props.isAdminMode ? `${theme.orange}` : `${theme.lightGrey}`)};
    transition: color 0.3s ease;
    margin-left: 20px;
    text-align: ${(props) => (props.isAdminMode ? 'left' : 'right')};
    width: 100%;
    padding-right: 35px;
    font-size: 1.5rem;
  }
`;
