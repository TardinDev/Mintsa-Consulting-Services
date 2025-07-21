import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';
import { services, agreements, recognitions } from '../../../utils/data/footerData';
import { FaAddressCard, FaFacebook, FaInstagram, FaLinkedin, FaMap, FaPhone, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import FooterSection from './FooterSection';
import SocialIcons from './SocialIcons';

// Définir le type SocialLinkType
type SocialLinkType = {
  icon: React.ReactElement;
  href: string;
  aria: string;
};

// Définir le tableau socialLinks
const socialLinks: SocialLinkType[] = [
  { icon: <FaTwitter size={25} color="#1DA1F2" />, href: "#", aria: "Twitter" },
  { icon: <FaFacebook size={25} color="#1877F2" />, href: "https://www.facebook.com/cedriclebonheur/?locale=fr_FR", aria: "Facebook" },
  { icon: <FaLinkedin size={25} color="#0A66C2" />, href: "#", aria: "LinkedIn" },
  { icon: <FaInstagram size={25} color="#E4405F" />, href: "#", aria: "Instagram" },
  { icon: <FaPinterest size={25} color="#BD081C" />, href: "#", aria: "Pinterest" },
  { icon: <FaYoutube size={25} color="#FF0000" />, href: "#", aria: "YouTube" },
];

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterContent>
      <FooterSection title="SERVICES">
        <ServiceList>
          {services.map((service, index) => (
            <ServiceItem key={index}>{service}</ServiceItem>
          ))}
        </ServiceList>
      </FooterSection>

      <FooterSection title="AGRÉMENTS">
        <ServiceList>
          {agreements.map((agreement, index) => (
            <ServiceItem key={index}>{agreement}</ServiceItem>
          ))}
        </ServiceList>
      </FooterSection>

      <FooterSection title="CONTACTEZ-NOUS">
        <ContactList>
          <ContactItem>
            <ContactIcon>
              <FaPhone size={20} color={theme.white} />
            </ContactIcon>
            <ContactText>+241 74 85 34 84</ContactText>
          </ContactItem>
          
          <ContactItem>
            <ContactIcon>
              <FaMessage size={20} color={theme.white} />
            </ContactIcon>
            <ContactLink href="mailto:Mintsaconsulting@gmail.com">
              Mintsaconsulting@gmail.com
            </ContactLink>
          </ContactItem>
          
          <ContactItem>
            <ContactIcon>
              <FaAddressCard size={20} color={theme.white} />
            </ContactIcon>
            <ContactText>25 Rue de la SNI, Akurname 2, Owendo</ContactText>
          </ContactItem>
          
          <ContactItem>
            <ContactIcon>
              <FaMap size={20} color={theme.white} />
            </ContactIcon>
            <ContactLink href="#">Voir sur la carte</ContactLink>
          </ContactItem>
        </ContactList>
      </FooterSection>

      <FooterSection title="RESTEZ CONNECTÉ">
        <SocialIcons links={socialLinks} />
        <RecognitionTitle>RECONNU PAR</RecognitionTitle>
        <ServiceList>
          {recognitions.map((item, index) => (
            <ServiceItem key={index}>{item}</ServiceItem>
          ))}
        </ServiceList>
      </FooterSection>
    </FooterContent>

    <FooterBottom>
      <FooterBottomContent>
        <Copyright>&copy; 2025 Mintsaconsulting. Tous droits réservés.</Copyright>
        <FooterLinks>
          <FooterLink href="#">Politique de confidentialité</FooterLink>
          <FooterLink href="#">Conditions d'utilisation</FooterLink>
          <FooterLink href="#">Mentions légales</FooterLink>
        </FooterLinks>
      </FooterBottomContent>
    </FooterBottom>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
    opacity: 0.3;
    animation: float 20s ease-in-out infinite;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled.li`
  padding: 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
  transition: all ${theme.transition.fast};
  cursor: pointer;

  &:hover {
    color: ${theme.white};
    transform: translateX(5px);
  }

  &::before {
    content: '•';
    color: ${theme.secondary};
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all ${theme.transition.fast};

  &:hover {
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.full};
  backdrop-filter: blur(10px);
`;

const ContactText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const ContactLink = styled.a`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: all ${theme.transition.fast};

  &:hover {
    color: ${theme.white};
    text-decoration: underline;
  }
`;

const RecognitionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
  color: ${theme.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const FooterBottomContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all ${theme.transition.fast};

  &:hover {
    color: ${theme.white};
    text-decoration: underline;
  }
`;

export default Footer;