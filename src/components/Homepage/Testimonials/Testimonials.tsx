import React, { useState } from 'react';
import styled from 'styled-components';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import theme from '../../../utils/Theme/theme';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  service: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Marie-Claire OBAME',
    role: 'Directrice',
    company: 'MC Consulting SARL',
    content: 'Service impeccable ! Mintsa Services m\'a accompagné pour la création de mon entreprise du début à la fin. En seulement 15 jours, j\'avais tous mes documents. Je recommande vivement leurs services.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    service: 'Création d\'Entreprise'
  },
  {
    id: 2,
    name: 'Jean-Pierre MBOUMBA',
    role: 'Chef d\'Entreprise',
    company: 'MBOUMBA Transport',
    content: 'Excellente expérience avec l\'équipe de Mintsa Services. Ils ont géré toute ma flotte automobile : cartes grises, visites techniques. Tout a été fait dans les délais promis. Très professionnel !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    service: 'Services Automobiles'
  },
  {
    id: 3,
    name: 'Patricia NGUEMA',
    role: 'Promotrice Immobilière',
    company: 'Patrimoine Plus',
    content: 'J\'ai fait appel à eux pour obtenir un titre foncier. Le processus était clair, ils m\'ont tenu informée à chaque étape. Service client exceptionnel et résultat au rendez-vous. Je suis ravie !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    service: 'Services Immobiliers'
  },
  {
    id: 4,
    name: 'Rodrigue BILOGHE',
    role: 'Comptable Indépendant',
    company: 'RB Expertise',
    content: 'Pour mes déclarations fiscales et celles de mes clients, je fais confiance à Mintsa Services. Leur expertise comptable et fiscale est remarquable. Réactivité et professionnalisme au top !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    service: 'Services Fiscaux'
  },
  {
    id: 5,
    name: 'Sandrine OKOME',
    role: 'Entrepreneure',
    company: 'So Beauty',
    content: 'Mintsa Services a simplifié toutes mes démarches administratives. CNI, passeport, documents divers... tout est géré avec efficacité. Je gagne un temps précieux pour me concentrer sur mon business.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200',
    service: 'Services Administratifs'
  },
  {
    id: 6,
    name: 'Eric MOUSSAVOU',
    role: 'Directeur Général',
    company: 'TechGabon SA',
    content: 'Partenaire de confiance depuis 3 ans. Que ce soit pour la comptabilité, la fiscalité ou l\'administratif, leur équipe est toujours à l\'écoute. Relation client exemplaire et tarifs compétitifs.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    service: 'Tous Services'
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsHeader>
        <TestimonialEyebrow>Temoignages</TestimonialEyebrow>
        <Title>Ce Que Disent Nos Clients</Title>
        <TestimonialDivider />
        <Subtitle>
          Plus de 200 entreprises nous font confiance pour leurs demarches administratives, fiscales et juridiques
        </Subtitle>
      </TestimonialsHeader>

      <TestimonialCard>
        <QuoteIcon>
          <FaQuoteLeft />
        </QuoteIcon>

        <TestimonialContent>
          <Rating>
            {[...Array(currentTestimonial.rating)].map((_, index) => (
              <StarIcon key={index}>
                <FaStar />
              </StarIcon>
            ))}
          </Rating>

          <Content>{currentTestimonial.content}</Content>

          <ServiceBadge>{currentTestimonial.service}</ServiceBadge>
        </TestimonialContent>

        <AuthorSection>
          <AuthorImage src={currentTestimonial.image} alt={currentTestimonial.name} />
          <AuthorInfo>
            <AuthorName>{currentTestimonial.name}</AuthorName>
            <AuthorRole>
              {currentTestimonial.role} - {currentTestimonial.company}
            </AuthorRole>
          </AuthorInfo>
        </AuthorSection>

        <NavigationButtons>
          <NavButton onClick={prevTestimonial} aria-label="Précédent">
            <FaChevronLeft />
          </NavButton>
          <NavButton onClick={nextTestimonial} aria-label="Suivant">
            <FaChevronRight />
          </NavButton>
        </NavigationButtons>

        <Indicators>
          {testimonialsData.map((_, index) => (
            <Indicator
              key={index}
              $active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Indicators>
      </TestimonialCard>

      <StatsGrid>
        <StatCard>
          <StatNumber>98%</StatNumber>
          <StatLabel>Satisfaction Client</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>1000+</StatNumber>
          <StatLabel>Projets Réalisés</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>200+</StatNumber>
          <StatLabel>Entreprises Partenaires</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>15+</StatNumber>
          <StatLabel>Années d'Excellence</StatLabel>
        </StatCard>
      </StatsGrid>
    </TestimonialsContainer>
  );
};

export default Testimonials;

const TestimonialsContainer = styled.section`
  padding: 6rem 2rem;
  background: ${theme.white};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 4rem 1.5rem;
  }
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
`;

const TestimonialEyebrow = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${theme.secondary};
  margin-bottom: 1rem;
`;

const TestimonialDivider = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, ${theme.secondary}, ${theme.secondaryLight});
  border-radius: 2px;
  margin: 0 auto 1.5rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.gray600};
  line-height: 1.7;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const TestimonialCard = styled.div`
  max-width: 900px;
  margin: 0 auto 4rem;
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  padding: 3rem;
  box-shadow: ${theme.shadow2xl};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem;
  }
`;

const QuoteIcon = styled.div`
  font-size: 3rem;
  color: ${theme.primary}30;
  position: absolute;
  top: 2rem;
  left: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
    top: 1.5rem;
    left: 1.5rem;
  }
`;

const TestimonialContent = styled.div`
  margin: 2rem 0 2.5rem;
  text-align: center;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const StarIcon = styled.div`
  color: ${theme.warning};
  font-size: 1.25rem;
`;

const Content = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${theme.gray700};
  font-style: italic;
  margin-bottom: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const ServiceBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15);
  color: ${theme.primary};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid ${theme.primary}30;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 2px solid ${theme.gray100};
`;

const AuthorImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.primary};
  box-shadow: ${theme.shadowMd};
`;

const AuthorInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const AuthorName = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.25rem;
`;

const AuthorRole = styled.div`
  font-size: 0.95rem;
  color: ${theme.gray600};
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.white};
  border: 2px solid ${theme.primary};
  color: ${theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    background: ${theme.primary};
    color: ${theme.white};
    transform: scale(1.1);
    box-shadow: ${theme.shadowMd};
  }

  &:active {
    transform: scale(1.05);
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
`;

const Indicator = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '32px' : '12px')};
  height: 12px;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? theme.primary : theme.gray300)};
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    background: ${theme.primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: ${theme.white};
  padding: 2rem 1.5rem;
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadowLg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.5rem 1rem;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: ${theme.gray600};
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;
