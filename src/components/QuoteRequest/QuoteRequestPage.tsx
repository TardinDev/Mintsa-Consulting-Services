import React, { useState } from 'react';
import styled from 'styled-components';
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
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft /> Retour à l'accueil
      </BackButton>

      <ContentWrapper>
        <HeaderSection>
          <Title>Demandez Votre Devis Personnalisé</Title>
          <Subtitle>
            Décrivez-nous votre projet et recevez une réponse sur-mesure sous 24h. Notre équipe d'experts est prête à transformer vos ambitions en succès concrets.
          </Subtitle>
          <FeaturesList>
            <FeatureItem>
              <CheckIcon>✓</CheckIcon>
              <span>Réponse sous 24h garantie</span>
            </FeatureItem>
            <FeatureItem>
              <CheckIcon>✓</CheckIcon>
              <span>Devis gratuit et sans engagement</span>
            </FeatureItem>
            <FeatureItem>
              <CheckIcon>✓</CheckIcon>
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
                <option value="comptable-fiscale">Expertise Comptable & Fiscale</option>
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
              <>⏳ Envoi de votre demande en cours...</>
            ) : (
              <>
                <FaPaperPlane /> Envoyer ma demande de devis
              </>
            )}
          </SubmitButton>

          <InfoBox>
            <InfoTitle>📞 Besoin d'une réponse immédiate ?</InfoTitle>
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
                📍 <strong>Akournam 1, Owendo</strong> - Libreville, Gabon
              </ContactItem>
            </ContactDetails>
          </ContactInfo>
        </FormCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default QuoteRequestPage;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.gray50} 0%, ${theme.white} 100%);
  padding: 2rem;
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.white};
  color: ${theme.primary};
  border: 2px solid ${theme.primary};
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transition.normal};
  margin-bottom: 2rem;
  box-shadow: ${theme.shadowSm};

  &:hover {
    background: ${theme.primary};
    color: ${theme.white};
    transform: translateX(-5px);
    box-shadow: ${theme.shadowMd};
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${theme.gray700};
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.95rem;
  }
`;

const CheckIcon = styled.span`
  background: ${theme.success};
  color: ${theme.white};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.875rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px ${theme.success}40;
`;

const FormCard = styled.form`
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  padding: 3rem;
  box-shadow: ${theme.shadowXl};
  animation: fadeInUp 0.8s ease-out 0.2s both;

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
  font-weight: 600;
  color: ${theme.gray700};
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all ${theme.transition.normal};
  background: ${theme.white};

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primary}20;
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all ${theme.transition.normal};
  background: ${theme.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all ${theme.transition.normal};
  background: ${theme.white};
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primary}20;
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem 2rem;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all ${theme.transition.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: ${theme.shadowLg};
  margin-top: 2rem;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow2xl};
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: ${theme.success}20;
  color: ${theme.success};
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorMessage = styled.div`
  background: ${theme.error}20;
  color: ${theme.error};
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
  animation: slideIn 0.3s ease-out;
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary}10 100%);
  border-left: 4px solid ${theme.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const InfoTitle = styled.h4`
  font-size: 1.125rem;
  color: ${theme.gray900};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const InfoText = styled.p`
  color: ${theme.gray600};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 2px solid ${theme.gray200};
  text-align: center;
`;

const ContactTitle = styled.h3`
  font-size: 1.25rem;
  color: ${theme.gray900};
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  color: ${theme.gray700};
  font-size: 1.05rem;
  line-height: 1.5;

  svg {
    color: ${theme.primary};
    flex-shrink: 0;
  }

  a {
    color: ${theme.primary};
    text-decoration: none;
    font-weight: 600;
    transition: all ${theme.transition.fast};

    &:hover {
      color: ${theme.primaryDark};
      text-decoration: underline;
    }
  }

  strong {
    color: ${theme.gray900};
    font-weight: 700;
  }
`;
