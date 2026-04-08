import { FaWhatsappSquare } from "react-icons/fa";
import styled from "styled-components";
import theme from "../../../utils/Theme/theme";

function ServiceText() {
  return (
    <ServiceTextStyle>
      <LogoBrand>
        <LogoMark>M</LogoMark>
        <LogoTextBlock>
          <LogoPrimary>Mintsa</LogoPrimary>
          <LogoSecondary>Services & Consulting</LogoSecondary>
        </LogoTextBlock>
      </LogoBrand>
      <WhatsappLine>
        <FaWhatsappSquare size={16} color="#25D366" />
        <PhoneText>+241 74 85 34 84</PhoneText>
      </WhatsappLine>
    </ServiceTextStyle>
  )
}

export default ServiceText;

const ServiceTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const LogoBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

const LogoMark = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: ${theme.primaryDark};
  background: ${theme.gradientGold};
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  line-height: 1;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
    font-size: 1.4rem;
  }
`;

const LogoTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const LogoPrimary = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: ${theme.white};
  line-height: 1.1;
  letter-spacing: -0.01em;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.15rem;
  }
`;

const LogoSecondary = styled.div`
  font-family: 'Plus Jakarta Sans Variable', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: ${theme.secondary};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.2;
`;

const WhatsappLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding-left: calc(38px + 0.65rem);

  @media (max-width: ${theme.breakpoints.sm}) {
    padding-left: calc(32px + 0.65rem);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const PhoneText = styled.span`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
  letter-spacing: 0.02em;
`;
