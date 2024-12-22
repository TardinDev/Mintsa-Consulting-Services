import React from 'react';
import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';
import { FaMessage } from 'react-icons/fa6';
import { 
       FaAddressCard, FaFacebook, FaInstagram, FaLinkedin, FaMap, 
       FaPhone, FaPinterest, FaTwitter, FaYoutube 
} from 'react-icons/fa';


const services = [
  "Consulting", "Design", "Development", "E-business", 
  "E-commerce", "E-marketing", "Hosting", "SEO", "Social Media"
];

const agreements = [
  "Business & Retail", "E-commerce & Shopping", 
  "Education & Organisations", "News & Entertainment", 
  "Industrial & Manufacturing", "Social Media", 
  "Sports & Leisure", "Travel & Tourism"
];

const recognitions = [
  "International CONSULTING ASSOCIATION", 
  "GABON WEB BUSINESS", 
  "CHAMBRE DE COMMERCE Companies LIBREVILLE", 
  "AGENCE NATIONALE DE LA CONSOMMATION ET DE LA CONCURRENCE"
];

const socialLinks = [
  { icon: <FaTwitter size={25} color="blue" />, href: "#", aria: "Twitter" },
  { icon: <FaFacebook size={25} color="white" />, href: "https://www.facebook.com/cedriclebonheur/?locale=fr_FR", aria: "Facebook" },
  { icon: <FaLinkedin size={25} color="lightblue" />, href: "#", aria: "LinkedIn" },
  { icon: <FaInstagram size={25} color="darkred" />, href: "#", aria: "Instagram" },
  { icon: <FaPinterest size={25} color="white" />, href: "#", aria: "Pinterest" },
  { icon: <FaYoutube size={25} color="red" />, href: "#", aria: "YouTube" }
];

const Footer: React.FC = () => (
  
  <FooterContainer>
    <FooterSection>
      <h3>SERVICES</h3>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </FooterSection>

    <FooterSection>
      <h3>AGREMENTS</h3>
      <ul>
        {agreements.map((agreement, index) => (
          <li key={index}>{agreement}</li>
        ))}
      </ul>
    </FooterSection>

    <FooterSection>
      <h3>CONTACT US</h3>
      <p><FaPhone size={20} color="lightgrey" /> +241 74 85 34 84</p>
      <p>
        <FaMessage size={20} color="lightgrey" />
        <a href="mailto:Mintsaconsulting@gmail.com"> Mintsaconsulting@gmail.com</a>
      </p>
      <p><FaAddressCard size={20} color="lightgrey" /> 25 Rue de la SNI, Akurname 2, Owendo</p>
      <p><FaMap size={20} color="lightgrey" /> <a href="#">Voir sur la carte</a></p>
    </FooterSection>

    <FooterSection>
      <h3>RESTER CONNECTÉ</h3>
      <SocialIcons>
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} aria-label={link.aria}>
            {link.icon}
          </a>
        ))}
      </SocialIcons>
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

const FooterSection = styled.div`
  margin: 20px;
  flex: 1;
  min-width: 200px;

  h3 {
    color: ${theme.blue};
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin: 8px 0;
  }

  p, a {
    color: ${theme.white};
  }

  a:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  a {
    font-size: 1.2em;
    transition: color 0.3s;
  }

  a:hover {
    color: #0056b3;
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
