import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import theme from '../../utils/Theme/theme';
import { FaArrowLeft, FaClock, FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaEnvelope, FaPhone, FaUser, FaFileAlt, FaIdCard, FaCar, FaHome, FaBriefcase, FaCalculator } from 'react-icons/fa';

interface ServiceData {
  id: number;
  name: string;
  description: string;
  price: number;
  executionTime: string;
  includes: string[];
  requirements: string[];
  image: string;
  category: string;
}

// Images pour les catégories
const categoryImages: Record<string, string> = {
  administratifs: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
  fiscaux: 'https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=1200',
  automobiles: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200',
  immobiliers: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
  entreprises: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200'
};

const categoryIcons: Record<string, React.ReactElement> = {
  administratifs: <FaIdCard />,
  fiscaux: <FaCalculator />,
  automobiles: <FaCar />,
  immobiliers: <FaHome />,
  entreprises: <FaBriefcase />
};

// Données des services avec images
const serviceCategories: Record<string, { title: string; description: string; data: ServiceData[] }> = {
  'administratifs': {
    title: 'Services Administratifs',
    description: 'Simplifiez vos démarches administratives avec notre accompagnement personnalisé',
    data: [
      {
        id: 1001,
        name: 'Immatriculation CNI',
        description: 'Assistance complète pour l\'obtention ou le renouvellement de votre Carte Nationale d\'Identité',
        price: 25000,
        executionTime: '3-5 jours',
        image: 'https://static.wixstatic.com/media/33bbf3_dcb48a1b7bd4472084f7145d994eb847~mv2.jpg/v1/fill/w_745,h_575,al_c,lg_1,q_85/33bbf3_dcb48a1b7bd4472084f7145d994eb847~mv2.jpg',
        category: 'administratifs',
        includes: ['Constitution du dossier', 'Suivi personnalisé', 'Accompagnement DGDI', 'Récupération'],
        requirements: ['Pièce d\'identité', 'Photos récentes', 'Acte de naissance']
      },
      {
        id: 1002,
        name: 'Démarches Passeport',
        description: 'Service complet pour l\'obtention de votre passeport biométrique',
        price: 50000,
        executionTime: '7-10 jours',
        image: 'data:image/jpeg;base64,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',
        category: 'administratifs',
        includes: ['Prise de rendez-vous', 'Constitution dossier', 'Suivi complet', 'Délivrance'],
        requirements: ['CNI valide', 'Photos biométriques', 'Justificatifs']
      },
      {
        id: 1003,
        name: 'Casier Judiciaire',
        description: 'Demande et obtention de bulletin n°3 du casier judiciaire',
        price: 20000,
        executionTime: '2-4 jours',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
        category: 'administratifs',
        includes: ['Demande officielle', 'Traitement rapide', 'Service confidentiel', 'Livraison'],
        requirements: ['Pièce d\'identité', 'Formulaire', 'Justificatif de domicile']
      }
    ]
  },
  'fiscaux': {
    title: 'Services Fiscaux & Comptables',
    description: 'Optimisez votre fiscalité et restez en conformité avec nos experts',
    data: [
      {
        id: 2001,
        name: 'Déclaration Fiscale IRPP',
        description: 'Assistance pour la déclaration d\'impôts sur le revenu des particuliers',
        price: 35000,
        executionTime: '2-4 jours',
        image: 'https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800',
        category: 'fiscaux',
        includes: ['Analyse fiscale', 'Calcul optimisé', 'Télédéclaration', 'Suivi DGI'],
        requirements: ['NIF', 'Bulletins de salaire', 'Relevés bancaires']
      },
      {
        id: 2002,
        name: 'Déclaration TVA',
        description: 'Déclaration mensuelle ou trimestrielle de TVA pour entreprises',
        price: 50000,
        executionTime: '3-5 jours',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
        category: 'fiscaux',
        includes: ['Calcul TVA', 'Vérification', 'Télédéclaration', 'Archivage'],
        requirements: ['Factures', 'Comptabilité', 'NIF entreprise']
      },
      {
        id: 2003,
        name: 'Obtention NIF',
        description: 'Accompagnement pour l\'obtention du Numéro d\'Identification Fiscale',
        price: 25000,
        executionTime: '5-7 jours',
        image: 'https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800',
        category: 'fiscaux',
        includes: ['Dossier complet', 'Dépôt DGI', 'Suivi', 'Récupération NIF'],
        requirements: ['CNI', 'Justificatif activité', 'Formulaires']
      }
    ]
  },
  'automobiles': {
    title: 'Services Automobiles',
    description: 'Tous vos besoins automobiles pris en charge de A à Z',
    data: [
      {
        id: 3001,
        name: 'Carte Grise',
        description: 'Obtention ou renouvellement de certificat d\'immatriculation',
        price: 85000,
        executionTime: '5-10 jours',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        category: 'automobiles',
        includes: ['Constitution dossier', 'Démarches DGTTM', 'Suivi', 'Récupération'],
        requirements: ['Facture véhicule', 'Pièce identité', 'Assurance', 'Visite technique']
      },
      {
        id: 3002,
        name: 'Visite Technique',
        description: 'Prise en charge complète pour la visite technique automobile',
        price: 45000,
        executionTime: '3-5 jours',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
        category: 'automobiles',
        includes: ['Rendez-vous', 'Accompagnement', 'Contrôle complet', 'Certificat'],
        requirements: ['Carte grise', 'Pièce identité', 'Véhicule en état']
      },
      {
        id: 3003,
        name: 'Permis de Conduire',
        description: 'Accompagnement obtention permis catégorie B',
        price: 150000,
        executionTime: '15-30 jours',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        category: 'automobiles',
        includes: ['Inscription', 'Dossier complet', 'Suivi DGTTM', 'Délivrance'],
        requirements: ['CNI', 'Photos', 'Certificat médical', 'Dossier scolaire']
      }
    ]
  },
  'immobiliers': {
    title: 'Services Immobiliers & Fonciers',
    description: 'Sécurisez vos projets immobiliers avec notre expertise',
    data: [
      {
        id: 4001,
        name: 'Titre Foncier',
        description: 'Accompagnement complet pour l\'obtention d\'un titre foncier',
        price: 500000,
        executionTime: '30-60 jours',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        category: 'immobiliers',
        includes: ['Bornage', 'Enquête commodo', 'Dossier complet', 'Délivrance titre'],
        requirements: ['Plan terrain', 'Pièce identité', 'Attestation propriété']
      },
      {
        id: 4002,
        name: 'Permis de Construire',
        description: 'Obtention du permis de construire auprès des services d\'urbanisme',
        price: 200000,
        executionTime: '20-40 jours',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
        category: 'immobiliers',
        includes: ['Plans architecte', 'Dossier technique', 'Démarches urbanisme', 'Permis'],
        requirements: ['Titre foncier', 'Plans', 'Étude sol']
      },
      {
        id: 4003,
        name: 'Certificat de Propriété',
        description: 'Obtention du certificat de propriété immobilière',
        price: 75000,
        executionTime: '5-10 jours',
        image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800',
        category: 'immobiliers',
        includes: ['Vérification droits', 'Extraction', 'Certification', 'Légalisation'],
        requirements: ['Titre foncier', 'Pièce identité', 'Justificatifs']
      }
    ]
  },
  'entreprises': {
    title: 'Services aux Entreprises',
    description: 'Créez et développez votre entreprise en toute sérénité',
    data: [
      {
        id: 5001,
        name: 'Création Entreprise',
        description: 'Accompagnement complet création SARL/SA au Gabon',
        price: 350000,
        executionTime: '10-20 jours',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        category: 'entreprises',
        includes: ['Rédaction statuts', 'Immatriculation RCCM', 'NIF', 'Formalités légales'],
        requirements: ['Pièces associés', 'Capital', 'Siège social']
      },
      {
        id: 5002,
        name: 'Registre de Commerce',
        description: 'Inscription ou modification au RCCM',
        price: 75000,
        executionTime: '5-10 jours',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
        category: 'entreprises',
        includes: ['Dossier complet', 'Enregistrement greffe', 'Suivi', 'Extrait RCCM'],
        requirements: ['Statuts', 'Pièces dirigeants', 'Bail commercial']
      },
      {
        id: 5003,
        name: 'Immatriculation CNSS',
        description: 'Immatriculation entreprise et employés à la CNSS',
        price: 50000,
        executionTime: '3-7 jours',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
        category: 'entreprises',
        includes: ['Affiliation', 'Déclarations', 'Numéros CNSS', 'Formation'],
        requirements: ['RCCM', 'Contrats travail', 'Liste employés']
      }
    ]
  }
};

const ServiceDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryData = category ? serviceCategories[category] : null;

  if (!categoryData) {
    return (
      <ErrorContainer>
        <ErrorMessage>Catégorie de service introuvable</ErrorMessage>
        <BackButton onClick={() => navigate('/')}>
          <FaArrowLeft /> Retour à l'accueil
        </BackButton>
      </ErrorContainer>
    );
  }

  const handleAppointmentClick = (service: ServiceData) => {
    setSelectedService(service);
    setShowAppointmentForm(true);
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground
          style={{
            backgroundImage: `url(${categoryImages[category!]})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        />
        <HeroOverlay />
        <HeroContent>
          <BackButton onClick={() => navigate('/')}>
            <FaArrowLeft /> Retour à l'accueil
          </BackButton>
          <HeroIcon>{categoryIcons[category!]}</HeroIcon>
          <HeroTitle>{categoryData.title}</HeroTitle>
          <HeroSubtitle>{categoryData.description}</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ServicesGrid>
          {categoryData.data.map((service, index) => (
            <ServiceCard
              key={service.id}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <ServiceImageContainer>
                <ServiceImage src={service.image} alt={service.name} />
                <ServiceImageOverlay>
                  <QuickViewButton onClick={() => handleAppointmentClick(service)}>
                    <FaCalendarAlt /> Réserver maintenant
                  </QuickViewButton>
                </ServiceImageOverlay>
              </ServiceImageContainer>

              <ServiceContent>
                <ServiceHeader>
                  <ServiceTitle>{service.name}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </ServiceHeader>

                <InfoGrid>
                  <InfoCard>
                    <InfoIcon><FaMoneyBillWave /></InfoIcon>
                    <InfoDetails>
                      <InfoLabel>Tarif</InfoLabel>
                      <InfoValue>{service.price.toLocaleString()} FCFA</InfoValue>
                    </InfoDetails>
                  </InfoCard>

                  <InfoCard>
                    <InfoIcon><FaClock /></InfoIcon>
                    <InfoDetails>
                      <InfoLabel>Délai</InfoLabel>
                      <InfoValue>{service.executionTime}</InfoValue>
                    </InfoDetails>
                  </InfoCard>
                </InfoGrid>

                <DetailsAccordion>
                  <DetailSection>
                    <DetailHeader>
                      <FaCheckCircle /> Prestations incluses
                    </DetailHeader>
                    <DetailList>
                      {service.includes.map((item, idx) => (
                        <DetailItem key={idx}>{item}</DetailItem>
                      ))}
                    </DetailList>
                  </DetailSection>

                  <DetailSection>
                    <DetailHeader>
                      <FaFileAlt /> Documents requis
                    </DetailHeader>
                    <DetailList>
                      {service.requirements.map((item, idx) => (
                        <DetailItem key={idx}>{item}</DetailItem>
                      ))}
                    </DetailList>
                  </DetailSection>
                </DetailsAccordion>

                <ServiceFooter>
                  <AppointmentButton onClick={() => handleAppointmentClick(service)}>
                    <FaCalendarAlt /> Prendre rendez-vous
                  </AppointmentButton>
                </ServiceFooter>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ContentSection>

      {showAppointmentForm && selectedService && (
        <ModalOverlay onClick={() => setShowAppointmentForm(false)}>
          <AppointmentModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Prendre rendez-vous</ModalTitle>
              <CloseButton onClick={() => setShowAppointmentForm(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <SelectedServiceInfo>
                <ServiceInfoImage src={selectedService.image} alt={selectedService.name} />
                <ServiceInfoText>
                  <strong>{selectedService.name}</strong>
                  <p>{selectedService.price.toLocaleString()} FCFA • {selectedService.executionTime}</p>
                </ServiceInfoText>
              </SelectedServiceInfo>
              <AppointmentForm>
                <FormRow>
                  <FormGroup>
                    <Label><FaUser /> Nom complet *</Label>
                    <Input type="text" required placeholder="Votre nom complet" />
                  </FormGroup>
                  <FormGroup>
                    <Label><FaPhone /> Téléphone *</Label>
                    <Input type="tel" required placeholder="+241 XX XX XX XX" />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <Label><FaEnvelope /> Email</Label>
                  <Input type="email" placeholder="votre.email@example.com" />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label><FaCalendarAlt /> Date souhaitée *</Label>
                    <Input type="date" required />
                  </FormGroup>
                  <FormGroup>
                    <Label><FaClock /> Heure souhaitée *</Label>
                    <Input type="time" required />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <Label>Message</Label>
                  <TextArea rows={4} placeholder="Détails ou questions supplémentaires..." />
                </FormGroup>
                <SubmitButton type="submit">
                  <FaCalendarAlt /> Confirmer le rendez-vous
                </SubmitButton>
              </AppointmentForm>
            </ModalBody>
          </AppointmentModal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default ServiceDetailsPage;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gray50};
`;

const HeroSection = styled.div`
  position: relative;
  height: 50vh;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: -10%;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120%;
  background-size: cover;
  background-position: center;
  will-change: transform;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(15, 23, 42, 0.85) 100%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const HeroIcon = styled.div`
  font-size: 4rem;
  color: ${theme.secondary};
  margin-bottom: 1rem;
  animation: ${slideIn} 0.6s ease-out;

  svg {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${theme.white};
  margin-bottom: 1rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  color: ${theme.primary};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transition.normal};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &:hover {
    background: ${theme.white};
    transform: translateX(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

const ContentSection = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServiceCard = styled.div`
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadowLg};
  transition: all ${theme.transition.normal};
  animation: ${fadeInUp} 0.6s ease-out both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadow2xl};
  }
`;

const ServiceImageContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${ServiceCard}:hover & {
    transform: scale(1.1);
  }
`;

const ServiceImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(245, 158, 11, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${theme.transition.normal};

  ${ServiceCard}:hover & {
    opacity: 1;
  }
`;

const QuickViewButton = styled.button`
  background: ${theme.white};
  color: ${theme.primary};
  border: none;
  padding: 1rem 2rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all ${theme.transition.fast};
  transform: translateY(20px);
  box-shadow: ${theme.shadowXl};

  ${ServiceCard}:hover & {
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.05) translateY(0);
  }
`;

const ServiceContent = styled.div`
  padding: 2rem;
`;

const ServiceHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.75rem;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${theme.gray600};
  line-height: 1.6;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, ${theme.gray50} 0%, ${theme.white} 100%);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.primary};
  transition: all ${theme.transition.normal};

  &:hover {
    transform: translateX(5px);
    box-shadow: ${theme.shadowMd};
  }
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  color: ${theme.primary};
`;

const InfoDetails = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: ${theme.gray600};
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.gray900};
`;

const DetailsAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailSection = styled.div`
  background: ${theme.gray50};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.gray200};
`;

const DetailHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.gray800};
  margin-bottom: 1rem;

  svg {
    color: ${theme.success};
  }
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
`;

const DetailItem = styled.li`
  font-size: 0.95rem;
  color: ${theme.gray700};
  padding: 0.5rem 0.75rem;
  background: ${theme.white};
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${theme.secondary};

  &::before {
    content: '✓';
    color: ${theme.success};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

const ServiceFooter = styled.div`
  padding-top: 1.5rem;
  border-top: 2px solid ${theme.gray100};
`;

const AppointmentButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  padding: 1.25rem 2rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all ${theme.transition.normal};
  box-shadow: ${theme.shadowMd};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow2xl};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zModal};
  padding: 2rem;
  backdrop-filter: blur(5px);
  animation: ${fadeInUp} 0.3s ease-out;
`;

const AppointmentModal = styled.div`
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadow2xl};
  animation: ${slideIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 2px solid ${theme.gray100};
  background: ${theme.gradientPrimary};
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.white};
  margin: 0;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 2rem;
  color: ${theme.white};
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transition.fast};

  &:hover {
    background: ${theme.white};
    color: ${theme.error};
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const SelectedServiceInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  background: linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary}10 100%);
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: 2rem;
  border: 2px solid ${theme.primary}30;
`;

const ServiceInfoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowMd};
`;

const ServiceInfoText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    font-size: 1.2rem;
    color: ${theme.gray900};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${theme.gray600};
    font-size: 0.95rem;
    margin: 0;
  }
`;

const AppointmentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${theme.gray700};
  margin-bottom: 0.75rem;
  font-size: 0.95rem;

  svg {
    color: ${theme.primary};
  }
`;

const Input = styled.input`
  padding: 1rem 1.25rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all ${theme.transition.normal};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 4px ${theme.primary}20;
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem 1.25rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all ${theme.transition.normal};

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 4px ${theme.primary}20;
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  padding: 1.25rem 2rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all ${theme.transition.normal};
  margin-top: 1rem;
  box-shadow: ${theme.shadowLg};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow2xl};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${theme.gray50};
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  color: ${theme.error};
  margin-bottom: 2rem;
  font-weight: 600;
`;
