import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import theme from '../../utils/Theme/theme';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCommentDots, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const QuoteRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configuration EmailJS
      // IMPORTANT: Remplacez ces valeurs par vos propres identifiants EmailJS
      // Créez un compte sur https://www.emailjs.com/
      // Ensuite, créez un service email et un template
      const SERVICE_ID = 'YOUR_SERVICE_ID'; // À remplacer
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // À remplacer
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // À remplacer

      // Paramètres du template EmailJS
      const templateParams = {
        to_email: 'mintsaservicesc@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Non renseignée',
        service: formData.service,
        message: formData.message,
        reply_to: formData.email
      };

      // Vérifier si EmailJS est configuré
      if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        // Fallback vers mailto si EmailJS n'est pas configuré
        const emailBody = `
Nouvelle demande de devis

Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Entreprise: ${formData.company || 'Non renseignée'}
Service demandé: ${formData.service}

Message:
${formData.message}
        `.trim();

        const mailtoLink = `mailto:mintsaservicesc@gmail.com?subject=Demande de devis - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;

        setSubmitStatus('success');
      } else {
        // Envoi via EmailJS si configuré
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        setSubmitStatus('success');
      }

      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');

      // Réinitialiser le statut d'erreur après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Glow aria-hidden="true" />
      <ContentWrapper>
        <BackButton onClick={() => navigate('/')}>
          <FaArrowLeft /> Retour à l'accueil
        </BackButton>

        <HeaderSection>
          <Eyebrow>
            <EyebrowDot aria-hidden="true" />
            Devis personnalisé — Gabon
          </Eyebrow>
          <Title>
            Demandez votre <Accent>devis</Accent> sur-mesure
          </Title>
          <Subtitle>
            Décrivez-nous votre projet et recevez une réponse sur-mesure sous 24h. Notre équipe d'experts est prête à transformer vos ambitions en succès concrets.
          </Subtitle>
          <FeaturesList>
            <FeatureItem>
              <CheckIcon aria-hidden="true">✓</CheckIcon>
              <span>Réponse sous 24h garantie</span>
            </FeatureItem>
            <FeatureItem>
              <CheckIcon aria-hidden="true">✓</CheckIcon>
              <span>Devis gratuit et sans engagement</span>
            </FeatureItem>
            <FeatureItem>
              <CheckIcon aria-hidden="true">✓</CheckIcon>
              <span>Conseil d'expert personnalisé</span>
            </FeatureItem>
          </FeaturesList>
        </HeaderSection>

        <FormCard onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">
                <FaUser /> Nom complet *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom complet"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <FaEnvelope /> Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre.email@example.com"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="phone">
                <FaPhone /> Téléphone *
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+241 XX XX XX XX"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="company">
                <FaBuilding /> Entreprise
              </Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="service">
              Service demandé *
            </Label>
            <Select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un service</option>
              <optgroup label="Services de Conseil">
                <option value="gestion-administrative">Gestion Administrative Complète</option>
                <option value="comptable-fiscale">Assistance Comptable et Fiscale</option>
                <option value="creation-entreprise">Accompagnement Création d'Entreprise</option>
                <option value="audit-conseil">Audit & Conseil Stratégique</option>
              </optgroup>
              <optgroup label="Solutions Automobiles">
                <option value="location-vehicule">Location de Véhicules Premium</option>
                <option value="vente-vehicule">Vente de Véhicules Neufs & Occasions</option>
                <option value="gestion-flotte">Gestion de Flotte Automobile</option>
              </optgroup>
              <optgroup label="Services Immobiliers">
                <option value="vente-immobilier">Vente & Acquisition Immobilière</option>
                <option value="location-immobilier">Location & Gestion Locative</option>
                <option value="conseil-immobilier">Conseil en Investissement Immobilier</option>
                <option value="terrain">Terrains & Parcelles</option>
              </optgroup>
              <optgroup label="Autres Services">
                <option value="electronique">Équipements Électroniques & High-Tech</option>
                <option value="fournitures">Fournitures & Équipements Professionnels</option>
                <option value="autre">Autre Service Personnalisé</option>
              </optgroup>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">
              <FaCommentDots /> Décrivez votre projet *
            </Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Parlez-nous de votre projet : objectifs, délais souhaités, budget estimé, exigences spécifiques... Plus vous serez précis, plus notre devis sera adapté à vos besoins."
              rows={8}
            />
          </FormGroup>

          {submitStatus === 'success' && (
            <SuccessMessage>
              ✓ Excellente nouvelle ! Votre demande a été reçue avec succès. Notre équipe l'examine et vous contactera sous 24h maximum.
            </SuccessMessage>
          )}

          {submitStatus === 'error' && (
            <ErrorMessage>
              ✗ Oups ! Un problème technique est survenu. Veuillez réessayer ou nous contacter directement par téléphone ou email.
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Envoi de votre demande en cours…</>
            ) : (
              <>
                <FaPaperPlane /> Envoyer ma demande de devis
                <ButtonArrow aria-hidden="true">→</ButtonArrow>
              </>
            )}
          </SubmitButton>

          <InfoBox>
            <InfoTitle>Besoin d'une réponse immédiate ?</InfoTitle>
            <InfoText>
              Notre équipe est disponible du lundi au samedi de 8h à 18h pour répondre à toutes vos questions.
            </InfoText>
          </InfoBox>

          <ContactInfo>
            <ContactTitle>Contactez-nous directement</ContactTitle>
            <ContactDetails>
              <ContactItem>
                <FaPhone /> <strong>+241 74 85 34 84</strong> / 62 43 75 11
              </ContactItem>
              <ContactItem>
                <FaEnvelope /> <a href="mailto:mintsaservicesc@gmail.com">mintsaservicesc@gmail.com</a>
              </ContactItem>
              <ContactItem>
                <FaBuilding /> <strong>Akournam 1, Owendo</strong> — Libreville, Gabon
              </ContactItem>
            </ContactDetails>
          </ContactInfo>
        </FormCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default QuoteRequestPage;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradientConsulting};
  padding: 7rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 5.5rem 1.25rem 3rem;
  }
`;

const Glow = styled.div`
  position: absolute;
  top: -20%;
  right: -8%;
  width: 60vw;
  height: 60vw;
  max-width: 820px;
  max-height: 820px;
  background: radial-gradient(circle, rgba(199, 123, 59, 0.18) 0%, rgba(199, 123, 59, 0.05) 40%, transparent 66%);
  pointer-events: none;
  z-index: -1;
  animation: ${fadeIn} 2s ease-out both;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: transparent;
  color: ${theme.gray700};
  border: 1px solid ${theme.lineStrong};
  padding: 0.7rem 1.4rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 2.75rem;

  svg { color: ${theme.primary}; }

  &:hover {
    border-color: ${theme.primary};
    color: ${theme.white};
    background: rgba(199, 123, 59, 0.08);
    transform: translateX(-4px);
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.secondaryLight};
  margin-bottom: 1.5rem;
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 12px ${theme.copperGlow};
  animation: ${pulse} 2.4s ease-in-out infinite;
`;

const Title = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.04;
  letter-spacing: -0.025em;
  margin-bottom: 1.25rem;
  font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0;
`;

const Accent = styled.span`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
  font-variation-settings: 'opsz' 144, 'SOFT' 4;
`;

const Subtitle = styled.p`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: ${theme.gray600};
  line-height: 1.7;
  max-width: 620px;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid ${theme.line};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.85rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: ${theme.fontBody};
  font-size: 0.95rem;
  color: ${theme.gray700};
  font-weight: 500;
`;

const CheckIcon = styled.span`
  color: ${theme.primary};
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
`;

const FormCard = styled.form`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.lg};
  padding: 3rem;
  box-shadow: ${theme.shadowLg};
  animation: ${fadeInUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.fontBody};
  font-weight: 600;
  color: ${theme.gray600};
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  letter-spacing: 0.01em;

  svg { color: ${theme.primary}; font-size: 0.85rem; }
`;

const fieldStyles = `
  padding: 0.95rem 1.1rem;
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray900};
  background: ${theme.gray200};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.copperGlow};
  }

  &::placeholder {
    color: ${theme.gray500};
  }
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Select = styled.select`
  ${fieldStyles}
  cursor: pointer;

  option, optgroup {
    background: ${theme.gray100};
    color: ${theme.gray900};
  }
`;

const TextArea = styled.textarea`
  ${fieldStyles}
  resize: vertical;
`;

const ButtonArrow = styled.span`
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.15rem 2rem;
  background: ${theme.gradientGold};
  color: ${theme.black};
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  box-shadow: ${theme.shadowCopper};
  margin-top: 1.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(199, 123, 59, 0.42);
  }
  &:hover:not(:disabled) ${ButtonArrow} { transform: translateX(5px); }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(106, 168, 134, 0.12);
  color: ${theme.success};
  padding: 1rem 1.25rem;
  border: 1px solid rgba(106, 168, 134, 0.4);
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-weight: 600;
  margin-top: 1rem;
  animation: ${fadeInUp} 0.4s ease-out;
`;

const ErrorMessage = styled.div`
  background: rgba(208, 106, 91, 0.12);
  color: ${theme.error};
  padding: 1rem 1.25rem;
  border: 1px solid rgba(208, 106, 91, 0.4);
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-weight: 600;
  margin-top: 1rem;
  animation: ${fadeInUp} 0.4s ease-out;
`;

const InfoBox = styled.div`
  background: ${theme.gray200};
  border-left: 2px solid ${theme.primary};
  border-radius: ${theme.borderRadius.md};
  padding: 1.5rem;
  margin-top: 2rem;
`;

const InfoTitle = styled.h4`
  font-family: ${theme.fontDisplay};
  font-size: 1.15rem;
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const InfoText = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid ${theme.line};
`;

const ContactTitle = styled.h3`
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.gray500};
  margin-bottom: 1.5rem;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  font-size: 1rem;
  line-height: 1.5;

  svg {
    color: ${theme.primary};
    flex-shrink: 0;
  }

  a {
    color: ${theme.primaryLight};
    text-decoration: none;
    font-weight: 600;
    transition: all ${theme.transition.fast};

    &:hover {
      color: ${theme.secondaryLight};
      text-decoration: underline;
    }
  }

  strong {
    color: ${theme.gray800};
    font-weight: 600;
  }
`;
