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
          <Title>Demander un Devis</Title>
          <Subtitle>
            Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais
          </Subtitle>
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
              <option value="voiture">Location/Vente de véhicules</option>
              <option value="home">Immobilier</option>
              <option value="electronic">Appareils électroniques</option>
              <option value="terrain">Terrains</option>
              <option value="consulting">Consulting</option>
              <option value="autre">Autre service</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">
              <FaCommentDots /> Message *
            </Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Décrivez votre projet en détail..."
              rows={6}
            />
          </FormGroup>

          {submitStatus === 'success' && (
            <SuccessMessage>
              ✓ Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.
            </SuccessMessage>
          )}

          {submitStatus === 'error' && (
            <ErrorMessage>
              ✗ Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Envoi en cours...</>
            ) : (
              <>
                <FaPaperPlane /> Envoyer la demande
              </>
            )}
          </SubmitButton>

          <ContactInfo>
            <ContactTitle>Vous préférez nous contacter directement ?</ContactTitle>
            <ContactDetails>
              <ContactItem>
                <FaPhone /> +241 74 85 34 84 / 62 43 75 11
              </ContactItem>
              <ContactItem>
                <FaEnvelope /> mintsaservicesc@gmail.com
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
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
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

const ContactInfo = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid ${theme.gray200};
  text-align: center;
`;

const ContactTitle = styled.h3`
  font-size: 1.1rem;
  color: ${theme.gray700};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${theme.gray600};
  font-size: 1rem;

  svg {
    color: ${theme.primary};
  }
`;
