import { FaWhatsappSquare } from "react-icons/fa";
import styled from "styled-components";
import theme from "../../../utils/Theme/theme";

function ServiceText() {
  return (
    <ServiceTextStyle>
      <LogoBrand>
        <LogoMark src="/mintsaservicesfiles/mintsa-icon.png" alt="MINTSA Services & Consulting" width={44} height={44} />
        <LogoTextBlock>
          <LogoPrimary>MINTSA</LogoPrimary>
          <LogoSecondary>Services &amp; Consulting</LogoSecondary>
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

const LogoMark = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.45));
  transition: transform 0.5s ${'cubic-bezier(0.34, 1.4, 0.64, 1)'};

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 38px;
    height: 38px;
  }
`;

const LogoTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: fit-content;
`;

const LogoPrimary = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: 2.1rem;
  font-weight: 800;
  color: ${theme.white};
  line-height: 1;
  letter-spacing: 0.04em;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.7rem;
  }
`;

const LogoSecondary = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.6rem;
  font-weight: 700;
  color: ${theme.primary};
  text-transform: uppercase;
  line-height: 1.2;
  /* Étiré sur toute la largeur de MINTSA — de la lettre M à A */
  width: 100%;
  text-align: justify;
  text-align-last: justify;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.5rem;
  }
`;

const WhatsappLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding-left: calc(44px + 0.65rem);

  @media (max-width: ${theme.breakpoints.sm}) {
    padding-left: calc(38px + 0.65rem);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const PhoneText = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  color: ${theme.gray600};
  font-weight: 500;
  letter-spacing: 0.02em;
`;
