import { FaWhatsappSquare } from "react-icons/fa";
import styled from "styled-components";
import theme from "../../../utils/Theme/theme";

function ServiceText() {
  return (
    <ServiceTextStyle>
      <LogoContainer>
        <LogoLine>Mintsa Services</LogoLine>
        <LogoLine>&</LogoLine>
        <LogoLine>Consulting</LogoLine>
      </LogoContainer>
      <WhatsappContainer>
        <FaWhatsappSquare size={25} color="#88C273" />
        <span className="number">+241 74 85 34 84</span>
      </WhatsappContainer>
    </ServiceTextStyle>
  )
}

export default ServiceText;

const ServiceTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  .number {
    color: ${theme.secondary};
    font-size: 1.5rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
`;

const LogoLine = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.white};
  line-height: 1;
`;

const WhatsappContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
