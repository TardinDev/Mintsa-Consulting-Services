import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';
import { services, agreements, recognitions } from '../../../utils/data/footerData';
import { FaAddressCard, FaFacebook, FaInstagram, FaLinkedin, FaMap, FaPhone, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import FooterSection from './FooterSection';
import SocialIcons from './SocialIcons';


// Définir le type SocialLinkType
type SocialLinkType = {
  icon: React.ReactElement; // Utilisez React.ReactElement pour le type de l'icône
  href: string;
  aria: string;
};

// Définir le tableau socialLinks
const socialLinks: SocialLinkType[] = [
  { icon: <FaTwitter size={25} color="blue" />, href: "#", aria: "Twitter" },
  { icon: <FaFacebook size={25} color="white" />, href: "https://www.facebook.com/cedriclebonheur/?locale=fr_FR", aria: "Facebook" },
  { icon: <FaLinkedin size={25} color="lightblue" />, href: "#", aria: "LinkedIn" },
  { icon: <FaInstagram size={25} color="darkred" />, href: "#", aria: "Instagram" },
  { icon: <FaPinterest size={25} color="white" />, href: "#", aria: "Pinterest" },
  { icon: <FaYoutube size={25} color="red" />, href: "#", aria: "YouTube" },
];


const Footer: React.FC = () => (
  <FooterContainer>
    <FooterSection title="SERVICES">
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </FooterSection>

    <FooterSection title="AGREMENTS">
      <ul>
        {agreements.map((agreement, index) => (
          <li key={index}>{agreement}</li>
        ))}
      </ul>
    </FooterSection>

    <FooterSection title="CONTACT US">
      <p><FaPhone size={20} color="lightgrey" /> +241 74 85 34 84</p>
      <p>
        <FaMessage size={20} color="lightgrey" />
        <a href="mailto:Mintsaconsulting@gmail.com"> Mintsaconsulting@gmail.com</a>
      </p>
      <p><FaAddressCard size={20} color="lightgrey" /> 25 Rue de la SNI, Akurname 2, Owendo</p>
      <p><FaMap size={20} color="lightgrey" /> <a href="#">Voir sur la carte</a></p>
    </FooterSection>

    <FooterSection title="RESTER CONNECTÉ">
      <SocialIcons links={socialLinks} />
      <h3>RECONNU PAR</h3>
      <ul>
        {recognitions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </FooterSection>

    <FooterBottom>&copy; 2024 Mintsaconsulting. All rights reserved.</FooterBottom>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  background-color: ${theme.blue};
  color: ${theme.white};
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: left;
  font-size: 0.9em;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  border-top: 1px solid #333;
  padding-top: 15px;
  font-size: 0.8em;
  color: #777;
`;

export default Footer;