import React from 'react';
import styled from 'styled-components';
import theme from '../../../utils/theme';
import { FaAddressCard, FaFacebook, FaInstagram, FaLinkedin, FaMap, FaPhone, FaPinterest, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';


const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <h3>SERVICES</h3>
        <ul>
          <li>Consulting</li>
          <li>Design</li>
          <li>Development</li>
          <li>E-business</li>
          <li>E-commerce</li>
          <li>E-marketing</li>
          <li>Hosting</li>
          <li>SEO</li>
          <li>Social Media</li>
        </ul>
      </FooterSection>

      <FooterSection>
        <h3>AGREMENT</h3>
        <ul>
          <li>Business & Retail</li>
          <li>E-commerce & Shopping</li>
          <li>Education & Organisations</li>
          <li>News & Entertainment</li>
          <li>Industrial & Manufacturing</li>
          <li>Social Media</li>
          <li>Sports & Leisure</li>
          <li>Travel & Tourism</li>
        </ul>
      </FooterSection>

      <FooterSection>
        <h3>CONTACT US</h3>
        <p><FaPhone size={20} color='lightgrey'/> +241 04 85 34 84</p>
        <p><FaMessage size={20} color='lightgrey'/> <a href="mailto:info@onlineinnovations.com">Mintsaconsulting@gmail.com</a></p>
        <p><FaAddressCard size={20} color='lightgrey'/>25 Rue de la SNI, Akurname 2, owendo, Gabon</p>
        <p><FaMap size={20} color='lightgrey'/>Cliquer ici pour avoir un apperçu sur la carte</p>
        <h3>DOMAINE D'ENREGISTREMENT</h3>
        <p><FaWhatsapp size={20} color='green'/>: +241 04 85 34 84 </p>
        <p>Email: <a href="Mintsaconsulting@gmail.com">Mintsaconsulting@gmail.com</a></p>
      </FooterSection>

      <FooterSection>
        <h3>RESTER CONNECTER</h3>
        <SocialIcons>
          <a href="#"><i className="fab fa-twitter" aria-hidden="true"><FaTwitter size={25} color='blue'/></i></a>
          <a href="#"><i className="fab fa-facebook-f" aria-hidden="true"><FaFacebook size={25} color='lightblue'/></i></a>
          <a href="#"><i className="fab fa-linkedin-in" aria-hidden="true"><FaLinkedin size={25} color='blue'/></i></a>
          <a href="#"><i className="fab fa-instagram" aria-hidden="true"><FaInstagram size={25} color='darkred'/></i></a>
          <a href="#"><i className="fab fa-pinterest" aria-hidden="true"><FaPinterest size={25} color='white'/></i></a>
          <a href="#"><i className="fab fa-youtube" aria-hidden="true"><FaYoutube size={25} color='red'/></i></a>
        </SocialIcons>
        <h3>RECONNU PAR</h3>
        <ul>
          <li>International CONSULTING ASSOCIATION</li>
          <li>GABON WEB BUSSNESS</li>
          <li>CHAMBRE DE COMMERCE Companies LIBREVILLE</li>
          <li>AGENCE NATIONALE DE LA CONSOMMATION ET DE LA CONCURENCE</li>
        </ul>
      </FooterSection>
      <FooterBottom>&copy; 2022 Mintsaconsulting. All rights reserved.</FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 20px 20px;
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
    color:${theme.blue};
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
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
    color: #007bff;
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
