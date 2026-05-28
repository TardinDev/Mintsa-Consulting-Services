import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import theme from '../../utils/Theme/theme';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCommentDots,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaCalendar,
  FaDollarSign,
  FaClock
} from 'react-icons/fa';

interface FormData {
  // Step 1: Personal Info
  name: string;
  email: string;
  phone: string;
  company: string;

  // Step 2: Service Selection
  service: string;
  urgency: string;
  budget: string;

  // Step 3: Project Details
  message: string;
  preferredContact: string;
  preferredTime: string;
}

const STEPS = [
  { id: 1, title: 'Vos Informations', icon: <FaUser /> },
  { id: 2, title: 'Votre Projet', icon: <FaBuilding /> },
  { id: 3, title: 'Détails & Validation', icon: <FaCheck /> }
];

const MultiStepQuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    urgency: '',
    budget: '',
    message: '',
    preferredContact: 'phone',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    }

    if (step === 2) {
      if (!formData.service) newErrors.service = 'Veuillez sélectionner un service';
      if (!formData.urgency) newErrors.urgency = 'Veuillez indiquer l\'urgence';
    }

    if (step === 3) {
      if (!formData.message.trim()) newErrors.message = 'Veuillez décrire votre projet';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        to_email: 'mintsaservicesc@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Non renseignée',
        service: formData.service,
        urgency: formData.urgency,
        budget: formData.budget || 'Non spécifié',
        message: formData.message,
        preferred_contact: formData.preferredContact,
        preferred_time: formData.preferredTime || 'Non spécifié',
        reply_to: formData.email
      };

      if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        const emailBody = `
Nouvelle demande de devis

=== INFORMATIONS PERSONNELLES ===
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Entreprise: ${formData.company || 'Non renseignée'}

=== PROJET ===
Service demandé: ${formData.service}
Urgence: ${formData.urgency}
Budget estimé: ${formData.budget || 'Non spécifié'}

=== DÉTAILS ===
Description du projet:
${formData.message}

Contact préféré: ${formData.preferredContact === 'phone' ? 'Téléphone' : 'Email'}
Horaire préféré: ${formData.preferredTime || 'Non spécifié'}
        `.trim();

        const mailtoLink = `mailto:mintsaservicesc@gmail.com?subject=Demande de devis - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;

        setSubmitStatus('success');
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        setSubmitStatus('success');
      }

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

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
            Devis en 3 étapes
          </Eyebrow>
          <Title>
            Votre devis, <Accent>étape par étape</Accent>
          </Title>
          <Subtitle>
            Un processus simple et rapide pour obtenir votre devis personnalisé
          </Subtitle>
        </HeaderSection>

        {/* Progress Bar */}
        <ProgressContainer>
          <ProgressBar $progress={progress} />
          <StepsIndicator>
            {STEPS.map((step) => (
              <Step key={step.id} $active={currentStep >= step.id} $current={currentStep === step.id}>
                <StepIcon $active={currentStep >= step.id}>
                  {currentStep > step.id ? <FaCheck /> : step.icon}
                </StepIcon>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))}
          </StepsIndicator>
        </ProgressContainer>

        <FormCard onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <StepContent>
              <StepTitle>Parlez-nous de vous</StepTitle>
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
                    placeholder="Votre nom complet"
                    $hasError={!!errors.name}
                  />
                  {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">
                    <FaEnvelope /> Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre.email@example.com"
                    $hasError={!!errors.email}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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
                    placeholder="+241 XX XX XX XX"
                    $hasError={!!errors.phone}
                  />
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="company">
                    <FaBuilding /> Entreprise (optionnel)
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
            </StepContent>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && (
            <StepContent>
              <StepTitle>Décrivez votre besoin</StepTitle>

              <FormGroup>
                <Label htmlFor="service">
                  <FaBuilding /> Service demandé *
                </Label>
                <Select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  $hasError={!!errors.service}
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
                {errors.service && <ErrorMessage>{errors.service}</ErrorMessage>}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="urgency">
                    <FaClock /> Urgence du projet *
                  </Label>
                  <Select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    $hasError={!!errors.urgency}
                  >
                    <option value="">Sélectionnez l'urgence</option>
                    <option value="immediate">Immédiat (moins d'une semaine)</option>
                    <option value="urgent">Urgent (1-2 semaines)</option>
                    <option value="normal">Normal (2-4 semaines)</option>
                    <option value="flexible">Flexible (plus d'un mois)</option>
                  </Select>
                  {errors.urgency && <ErrorMessage>{errors.urgency}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="budget">
                    <FaDollarSign /> Budget estimé (optionnel)
                  </Label>
                  <Select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="0-100k">Moins de 100 000 FCFA</option>
                    <option value="100k-500k">100 000 - 500 000 FCFA</option>
                    <option value="500k-1m">500 000 - 1 000 000 FCFA</option>
                    <option value="1m-5m">1 000 000 - 5 000 000 FCFA</option>
                    <option value="5m+">Plus de 5 000 000 FCFA</option>
                  </Select>
                </FormGroup>
              </FormRow>
            </StepContent>
          )}

          {/* Step 3: Project Details */}
          {currentStep === 3 && (
            <StepContent>
              <StepTitle>Finalisez votre demande</StepTitle>

              <FormGroup>
                <Label htmlFor="message">
                  <FaCommentDots /> Décrivez votre projet en détail *
                </Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez vos besoins, vos objectifs, vos contraintes... Plus votre description est détaillée, plus notre réponse sera précise et adaptée à vos attentes."
                  rows={6}
                  $hasError={!!errors.message}
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="preferredContact">
                    Moyen de contact préféré
                  </Label>
                  <Select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                  >
                    <option value="phone">Téléphone</option>
                    <option value="email">Email</option>
                    <option value="both">Les deux</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="preferredTime">
                    <FaCalendar /> Horaire préféré (optionnel)
                  </Label>
                  <Select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    <option value="">Aucune préférence</option>
                    <option value="morning">Matin (8h-12h)</option>
                    <option value="afternoon">Après-midi (12h-17h)</option>
                    <option value="evening">Fin de journée (17h-19h)</option>
                  </Select>
                </FormGroup>
              </FormRow>

              {/* Summary */}
              <SummarySection>
                <SummaryTitle>Récapitulatif de votre demande</SummaryTitle>
                <SummaryGrid>
                  <SummaryItem>
                    <SummaryLabel>Contact</SummaryLabel>
                    <SummaryValue>{formData.name}</SummaryValue>
                    <SummaryValue>{formData.email}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Service</SummaryLabel>
                    <SummaryValue>{formData.service || 'Non sélectionné'}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Urgence</SummaryLabel>
                    <SummaryValue>{formData.urgency || 'Non spécifiée'}</SummaryValue>
                  </SummaryItem>
                </SummaryGrid>
              </SummarySection>
            </StepContent>
          )}

          {/* Navigation Buttons */}
          <NavigationButtons>
            {currentStep > 1 && (
              <SecondaryButton type="button" onClick={handlePrevious}>
                <FaArrowLeft /> Précédent
              </SecondaryButton>
            )}

            {currentStep < STEPS.length ? (
              <PrimaryButton type="button" onClick={handleNext}>
                Suivant <FaArrowRight />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : (
                  <>
                    <FaCheck /> Envoyer ma demande
                  </>
                )}
              </PrimaryButton>
            )}
          </NavigationButtons>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <SuccessMessage>
              <FaCheck /> Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.
            </SuccessMessage>
          )}

          {submitStatus === 'error' && (
            <ErrorMessageBox>
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
            </ErrorMessageBox>
          )}
        </FormCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MultiStepQuoteForm;

// Styled Components
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const stepIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
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

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.4rem;
  background: transparent;
  color: ${theme.gray700};
  border: 1px solid ${theme.lineStrong};
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

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
  font-size: clamp(2.2rem, 4.6vw, 3.3rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin-bottom: 1.1rem;
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
  max-width: 600px;
  line-height: 1.65;
`;

const ProgressContainer = styled.div`
  margin-bottom: 3rem;
  position: relative;
  animation: ${fadeInUp} 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 2px;
  background: ${theme.lineStrong};
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: ${theme.gradientGold};
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const StepsIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Step = styled.div<{ $active: boolean; $current: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const StepIcon = styled.div<{ $active: boolean }>`
  width: 52px;
  height: 52px;
  border-radius: ${theme.borderRadius.full};
  background: ${({ $active }) => ($active ? theme.gradientGold : theme.gray200)};
  color: ${({ $active }) => ($active ? theme.black : theme.gray500)};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : theme.lineStrong)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: all 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
  box-shadow: ${({ $active }) => ($active ? theme.shadowCopper : 'none')};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
`;

const StepLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${theme.gray600};
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.72rem;
  }
`;

const FormCard = styled.form`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.lg};
  padding: 3rem;
  box-shadow: ${theme.shadowLg};
  animation: ${fadeInUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1.5rem;
  }
`;

const StepContent = styled.div`
  animation: ${stepIn} 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

const StepTitle = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
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
  gap: 0.6rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.fontBody};
  font-weight: 600;
  color: ${theme.gray600};
  font-size: 0.85rem;
  letter-spacing: 0.01em;

  svg { color: ${theme.primary}; font-size: 0.85rem; }
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.95rem 1.1rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.error : theme.lineStrong)};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray900};
  background: ${theme.gray200};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(208, 106, 91, 0.28)' : theme.copperGlow)};
  }

  &::placeholder {
    color: ${theme.gray500};
  }
`;

const Select = styled.select<{ $hasError?: boolean }>`
  padding: 0.95rem 1.1rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.error : theme.lineStrong)};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray900};
  background: ${theme.gray200};
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  option, optgroup {
    background: ${theme.gray100};
    color: ${theme.gray900};
  }

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(208, 106, 91, 0.28)' : theme.copperGlow)};
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.95rem 1.1rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.error : theme.lineStrong)};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray900};
  background: ${theme.gray200};
  resize: vertical;
  min-height: 120px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(208, 106, 91, 0.28)' : theme.copperGlow)};
  }

  &::placeholder {
    color: ${theme.gray500};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.error};
  font-family: ${theme.fontBody};
  font-size: 0.85rem;
  font-weight: 500;
`;

const SummarySection = styled.div`
  margin-top: 2rem;
  padding: 1.75rem;
  background: ${theme.gray200};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.line};
  border-left: 2px solid ${theme.primary};
`;

const SummaryTitle = styled.h3`
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.gray500};
  margin-bottom: 1.25rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SummaryLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  font-weight: 600;
  color: ${theme.gray500};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SummaryValue = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.95rem;
  color: ${theme.gray800};
  font-weight: 500;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2.4rem;
  background: ${theme.gradientGold};
  color: ${theme.black};
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;
  box-shadow: ${theme.shadowCopper};
  margin-left: auto;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(199, 123, 59, 0.42);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    margin-left: 0;
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 2.4rem;
  background: transparent;
  color: ${theme.gray800};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;

  &:hover {
    border-color: ${theme.primary};
    color: ${theme.white};
    background: rgba(199, 123, 59, 0.08);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem 1.4rem;
  background: rgba(106, 168, 134, 0.12);
  border: 1px solid rgba(106, 168, 134, 0.4);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.success};
  font-family: ${theme.fontBody};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
`;

const ErrorMessageBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem 1.4rem;
  background: rgba(208, 106, 91, 0.12);
  border: 1px solid rgba(208, 106, 91, 0.4);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.error};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 1rem;
`;
