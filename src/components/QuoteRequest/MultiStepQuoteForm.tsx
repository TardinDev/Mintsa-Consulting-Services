import React, { useState } from 'react';
import styled from 'styled-components';
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
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft /> Retour à l'accueil
      </BackButton>

      <ContentWrapper>
        <HeaderSection>
          <Title>Demande de Devis en 3 Étapes</Title>
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
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.gray50} 0%, ${theme.white} 100%);
  padding: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${theme.white};
  color: ${theme.primary};
  border: 2px solid ${theme.primary};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-bottom: 2rem;

  &:hover {
    background: ${theme.primary};
    color: ${theme.white};
    transform: translateX(-5px);
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.gray600};
  max-width: 600px;
  margin: 0 auto;
`;

const ProgressContainer = styled.div`
  margin-bottom: 3rem;
  position: relative;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 6px;
  background: ${theme.gray200};
  border-radius: ${theme.borderRadius.full};
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
    background: ${theme.gradientPrimary};
    transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: ${theme.borderRadius.full};
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
  gap: 0.5rem;
  flex: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: all 0.3s ease;
`;

const StepIcon = styled.div<{ $active: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? theme.gradientPrimary : theme.gray300)};
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${({ $active }) => ($active ? theme.shadowLg : 'none')};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
`;

const StepLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.gray700};
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.75rem;
  }
`;

const FormCard = styled.form`
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  padding: 3rem;
  box-shadow: ${theme.shadow2xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1.5rem;
  }
`;

const StepContent = styled.div`
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StepTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.5rem;
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
  gap: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${theme.gray700};
  font-size: 0.95rem;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.875rem 1rem;
  border: 2px solid ${({ $hasError }) => ($hasError ? theme.error : theme.gray300)};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? `${theme.error}20` : `${theme.primary}20`)};
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const Select = styled.select<{ $hasError?: boolean }>`
  padding: 0.875rem 1rem;
  border: 2px solid ${({ $hasError }) => ($hasError ? theme.error : theme.gray300)};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  background: ${theme.white};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? `${theme.error}20` : `${theme.primary}20`)};
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.875rem 1rem;
  border: 2px solid ${({ $hasError }) => ($hasError ? theme.error : theme.gray300)};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? `${theme.error}20` : `${theme.primary}20`)};
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.error};
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: -0.25rem;
`;

const SummarySection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${theme.primary}08 0%, ${theme.secondary}08 100%);
  border-radius: ${theme.borderRadius.lg};
  border: 2px solid ${theme.primary}20;
`;

const SummaryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 1rem;
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
  gap: 0.5rem;
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.gray600};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryValue = styled.div`
  font-size: 0.95rem;
  color: ${theme.gray900};
  font-weight: 500;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2.5rem;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  font-size: 1.0625rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  box-shadow: ${theme.shadowMd};
  margin-left: auto;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow2xl};
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
  padding: 1rem 2.5rem;
  background: ${theme.white};
  color: ${theme.primary};
  border: 2px solid ${theme.primary};
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  font-size: 1.0625rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  &:hover {
    background: ${theme.primary};
    color: ${theme.white};
    transform: translateY(-3px);
    box-shadow: ${theme.shadowMd};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(34, 197, 94, 0.1);
  border: 2px solid ${theme.success};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.success};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
`;

const ErrorMessageBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid ${theme.error};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.error};
  font-weight: 600;
  font-size: 1rem;
`;
