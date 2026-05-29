import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';
import { services, agreements, recognitions } from '../../../utils/data/footerData';
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
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
  { icon: <FaTwitter size={17} />, href: "#", aria: "Twitter" },
  { icon: <FaFacebook size={17} />, href: "https://www.facebook.com/cedriclebonheur/?locale=fr_FR", aria: "Facebook" },
  { icon: <FaLinkedin size={17} />, href: "#", aria: "LinkedIn" },
  { icon: <FaInstagram size={17} />, href: "#", aria: "Instagram" },
  { icon: <FaPinterest size={17} />, href: "#", aria: "Pinterest" },
  { icon: <FaYoutube size={17} />, href: "#", aria: "YouTube" },
];

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterGlow aria-hidden="true" />
    <FooterWatermark aria-hidden="true">M</FooterWatermark>

    <FooterStats aria-label="Nos chiffres clés">
      <FooterStatItem>
        <FooterStatNumber>1000<FooterStatSuffix>+</FooterStatSuffix></FooterStatNumber>
        <FooterStatLabel>Projets accompagnés</FooterStatLabel>
      </FooterStatItem>
      <FooterStatDivider aria-hidden="true" />
      <FooterStatItem>
        <FooterStatNumber>200<FooterStatSuffix>+</FooterStatSuffix></FooterStatNumber>
        <FooterStatLabel>Entreprises partenaires</FooterStatLabel>
      </FooterStatItem>
      <FooterStatDivider aria-hidden="true" />
      <FooterStatItem>
        <FooterStatNumber>15<FooterStatSuffix> ans</FooterStatSuffix></FooterStatNumber>
        <FooterStatLabel>d'Excellence</FooterStatLabel>
      </FooterStatItem>
      <FooterStatDivider aria-hidden="true" />
      <FooterStatItem>
        <FooterStatNumber>98<FooterStatSuffix>%</FooterStatSuffix></FooterStatNumber>
        <FooterStatLabel>Satisfaction client</FooterStatLabel>
      </FooterStatItem>
    </FooterStats>

    <FooterContent>
      {/* Bloc éditorial de marque */}
      <BrandColumn>
        <BrandName>
          MINTSA<BrandMark>.</BrandMark>
        </BrandName>
        <BrandTagline>
          Agence de services &amp; conseils au Gabon. Notre priorité,{' '}
          <Emphasis>votre bonheur</Emphasis> — de l'administratif à l'automobile,
          en passant par l'immobilier.
        </BrandTagline>

        <ContactList>
          <ContactItem>
            <ContactIcon aria-hidden="true">
              <FaPhone size={14} />
            </ContactIcon>
            <ContactText>+241 74 85 34 84 / 62 43 75 11</ContactText>
          </ContactItem>

          <ContactItem>
            <ContactIcon aria-hidden="true">
              <FaEnvelope size={14} />
            </ContactIcon>
            <ContactLink href="mailto:mintsaservicesc@gmail.com">
              mintsaservicesc@gmail.com
            </ContactLink>
          </ContactItem>

          <ContactItem>
            <ContactIcon aria-hidden="true">
              <FaLocationDot size={14} />
            </ContactIcon>
            <ContactText>Akournam 1, Owendo — Libreville, Gabon</ContactText>
          </ContactItem>
        </ContactList>
      </BrandColumn>

      {/* Colonnes de liens */}
      <LinksGrid>
        <FooterSection title="Services">
          <LinkList>
            {services.map((service, index) => (
              <LinkItem key={index} as="li">
                <LinkAnchor href="#">{service}</LinkAnchor>
              </LinkItem>
            ))}
          </LinkList>
        </FooterSection>

        <FooterSection title="Agréments">
          <LinkList>
            {agreements.map((agreement, index) => (
              <LinkItem key={index} as="li">
                <LinkAnchor href="#">{agreement}</LinkAnchor>
              </LinkItem>
            ))}
          </LinkList>
        </FooterSection>

        <FooterSection title="Reconnu par">
          <LinkList>
            {recognitions.map((item, index) => (
              <LinkItem key={index} as="li">
                <RecognitionText>{item}</RecognitionText>
              </LinkItem>
            ))}
          </LinkList>

          <SocialBlock>
            <SectionLabel>Restez connecté</SectionLabel>
            <SocialIcons links={socialLinks} />
          </SocialBlock>
        </FooterSection>
      </LinksGrid>
    </FooterContent>

    <CopperRule aria-hidden="true" />

    <FooterBottom>
      <FooterBottomContent>
        <Copyright>&copy; 2026 MINTSA Services. Tous droits réservés.</Copyright>
        <FooterLinks>
          <FooterLink href="#">Politique de confidentialité</FooterLink>
          <FooterLink href="#">Conditions d'utilisation</FooterLink>
          <FooterLink href="#">Mentions légales</FooterLink>
        </FooterLinks>
      </FooterBottomContent>
      <DevelopedBy>
        Développé par{' '}
        <DeveloperLink href="https://evoubap.com" target="_blank" rel="noopener noreferrer">
          evoubap.com
        </DeveloperLink>
      </DevelopedBy>
    </FooterBottom>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  position: relative;
  background: ${theme.black};
  color: ${theme.gray600};
  overflow: hidden;
  isolation: isolate;
  border-top: 1px solid ${theme.copperLine};
`;

/* Lueur cuivrée diffuse — cohérente avec le Hero */
const FooterGlow = styled.div`
  position: absolute;
  top: -30%;
  left: -10%;
  width: 55vw;
  height: 55vw;
  max-width: 760px;
  max-height: 760px;
  background: radial-gradient(circle, rgba(199, 123, 59, 0.14) 0%, rgba(199, 123, 59, 0.04) 40%, transparent 66%);
  pointer-events: none;
  z-index: -1;
`;

/* Initiale géante en filigrane */
const FooterWatermark = styled.div`
  position: absolute;
  bottom: -14%;
  right: -2%;
  font-family: ${theme.fontDisplay};
  font-size: 34vw;
  font-weight: 600;
  line-height: 0.7;
  color: rgba(237, 230, 216, 0.018);
  pointer-events: none;
  z-index: -1;
  user-select: none;
`;

const FooterStats = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2.5rem, 5vw, 3.5rem) 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 5vw, 4rem);
  flex-wrap: wrap;
  border-bottom: 1px solid ${theme.line};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2.5rem 1.25rem;
    gap: 1.75rem 2rem;
  }
`;

const FooterStatItem = styled.div`
  text-align: center;
  min-width: 110px;
`;

const FooterStatNumber = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.9rem, 3.4vw, 2.9rem);
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 0.3rem;
  line-height: 1;
  letter-spacing: -0.02em;
  font-feature-settings: 'tnum';
`;

const FooterStatSuffix = styled.span`
  color: ${theme.primary};
  font-style: italic;
`;

const FooterStatLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  color: ${theme.gray600};
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.4;
`;

const FooterStatDivider = styled.div`
  width: 1px;
  height: 42px;
  background: ${theme.lineStrong};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: clamp(2.5rem, 6vw, 6rem);
  padding: clamp(3.5rem, 6vw, 6rem) 2rem clamp(2.5rem, 4vw, 3.5rem);
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 3rem 1.25rem 2rem;
  }
`;

const BrandColumn = styled.div`
  max-width: 420px;
`;

const BrandName = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1;
  letter-spacing: -0.03em;
`;

const BrandMark = styled.span`
  color: ${theme.primary};
`;

const Emphasis = styled.em`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
`;

const BrandTagline = styled.p`
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray600};
  line-height: 1.7;
  margin: 1.5rem 0 2.25rem;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  color: ${theme.primary};
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.md};
  transition: border-color ${theme.transition.fast}, color ${theme.transition.fast};

  ${ContactItem}:hover & {
    border-color: ${theme.copperLine};
    color: ${theme.primaryLight};
  }
`;

const ContactText = styled.span`
  font-family: ${theme.fontBody};
  color: ${theme.gray700};
  font-size: 0.94rem;
  line-height: 1.5;
`;

const ContactLink = styled.a`
  font-family: ${theme.fontBody};
  color: ${theme.gray700};
  font-size: 0.94rem;
  text-decoration: none;
  transition: color ${theme.transition.fast};

  &:hover {
    color: ${theme.primaryLight};
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1.5rem;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const LinkItem = styled.li`
  list-style: none;
`;

const LinkAnchor = styled.a`
  font-family: ${theme.fontBody};
  font-size: 0.92rem;
  color: ${theme.gray600};
  text-decoration: none;
  line-height: 1.4;
  transition: color ${theme.transition.fast};
  cursor: pointer;

  &:hover {
    color: ${theme.primaryLight};
  }
`;

const RecognitionText = styled.span`
  font-family: ${theme.fontBody};
  font-size: 0.82rem;
  color: ${theme.gray500};
  line-height: 1.45;
  display: block;
`;

const SocialBlock = styled.div`
  margin-top: 2rem;
`;

const SectionLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${theme.gray500};
  margin-bottom: 1rem;
`;

const CopperRule = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${theme.copperLine} 30%, ${theme.copperLine} 70%, transparent);
`;

const FooterBottom = styled.div`
  padding: 1.75rem 2rem 2.25rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.5rem 1.25rem 2rem;
  }
`;

const FooterBottomContent = styled.div`
  max-width: 1240px;
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
  font-family: ${theme.fontBody};
  color: ${theme.gray500};
  font-size: 0.84rem;
  letter-spacing: 0.01em;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.75rem;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
    gap: 1.25rem;
  }
`;

const FooterLink = styled.a`
  font-family: ${theme.fontBody};
  color: ${theme.gray500};
  text-decoration: none;
  font-size: 0.84rem;
  transition: color ${theme.transition.fast};

  &:hover {
    color: ${theme.primaryLight};
  }
`;

const DevelopedBy = styled.div`
  max-width: 1240px;
  margin: 1.5rem auto 0;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid ${theme.line};
  font-family: ${theme.fontBody};
  color: ${theme.gray500};
  font-size: 0.8rem;
`;

const DeveloperLink = styled.a`
  color: ${theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color ${theme.transition.fast};

  &:hover {
    color: ${theme.primaryLight};
  }
`;

export default Footer;
