import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
    content: 'Service impeccable ! MINTSA Services m\'a accompagné pour la création de mon entreprise du début à la fin. En seulement 48h, j\'avais tous mes documents. Je recommande vivement leurs services.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    service: 'Création d\'Entreprise'
  },
  {
    id: 2,
    name: 'Jean-Pierre MBOUMBA',
    role: 'Chef d\'Entreprise',
    company: 'MBOUMBA Transport',
    content: 'Excellente expérience avec l\'équipe de MINTSA Services. Ils ont géré toute ma flotte automobile : cartes grises, visites techniques. Tout a été fait dans les délais promis. Très professionnel !',
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
    content: 'Pour mes déclarations fiscales et celles de mes clients, je fais confiance à MINTSA Services. Leur expertise comptable et fiscale est remarquable. Réactivité et professionnalisme au top !',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    service: 'Services Comptables et Fiscaux'
  },
  {
    id: 5,
    name: 'Sandrine OKOME',
    role: 'Entrepreneure',
    company: 'So Beauty',
    content: 'MINTSA Services a simplifié toutes mes démarches administratives. CNI, passeport, documents divers... tout est géré avec efficacité. Je gagne un temps précieux pour me concentrer sur mon business.',
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
    <TestimonialsContainer id="testimonials" aria-label="Témoignages clients">
      <Glow aria-hidden="true" />

      <TestimonialsInner>
        <TestimonialsHeader>
          <TestimonialEyebrow>
            <EyebrowDot aria-hidden="true" />
            Témoignages
          </TestimonialEyebrow>
          <Title>
            Ce que disent <Accent>nos clients</Accent>
          </Title>
          <Subtitle>
            Plus de 200 entreprises nous font confiance pour leurs démarches
            administratives, fiscales et juridiques.
          </Subtitle>
        </TestimonialsHeader>

        <TestimonialCard>
          <QuoteMark aria-hidden="true">&ldquo;</QuoteMark>
          <CardCounter aria-hidden="true">
            {String(currentIndex + 1).padStart(2, '0')}
            <CounterTotal>/ {String(testimonialsData.length).padStart(2, '0')}</CounterTotal>
          </CardCounter>

          <TestimonialContent>
            <Rating aria-label={`Note : ${currentTestimonial.rating} sur 5`}>
              {[...Array(currentTestimonial.rating)].map((_, index) => (
                <StarIcon key={index} aria-hidden="true">
                  <FaStar />
                </StarIcon>
              ))}
            </Rating>

            <Content>{currentTestimonial.content}</Content>

            <ServiceBadge>{currentTestimonial.service}</ServiceBadge>
          </TestimonialContent>

          <CardFooter>
            <AuthorSection>
              <AuthorImage src={currentTestimonial.image} alt={currentTestimonial.name} />
              <AuthorInfo>
                <AuthorName>{currentTestimonial.name}</AuthorName>
                <AuthorRole>
                  {currentTestimonial.role} — {currentTestimonial.company}
                </AuthorRole>
              </AuthorInfo>
            </AuthorSection>

            <NavigationButtons>
              <NavButton onClick={prevTestimonial} aria-label="Précédent">
                <FaArrowLeft />
              </NavButton>
              <NavButton onClick={nextTestimonial} aria-label="Suivant">
                <FaArrowRight />
              </NavButton>
            </NavigationButtons>
          </CardFooter>

          <Indicators>
            {testimonialsData.map((_, index) => (
              <Indicator
                key={index}
                $active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </Indicators>
        </TestimonialCard>

        <StatsGrid>
          <StatCard>
            <StatNumber>98<StatSuffix>%</StatSuffix></StatNumber>
            <StatLabel>Satisfaction client</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>1000<StatSuffix>+</StatSuffix></StatNumber>
            <StatLabel>Projets réalisés</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>200<StatSuffix>+</StatSuffix></StatNumber>
            <StatLabel>Entreprises partenaires</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>15<StatSuffix> ans</StatSuffix></StatNumber>
            <StatLabel>d'Excellence</StatLabel>
          </StatCard>
        </StatsGrid>
      </TestimonialsInner>
    </TestimonialsContainer>
  );
};

export default Testimonials;

const TestimonialsContainer = styled.section`
  position: relative;
  padding: clamp(5rem, 9vw, 8rem) 2rem;
  background: ${theme.cream};
  overflow: hidden;
  isolation: isolate;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 4rem 1.25rem;
  }
`;

const Glow = styled.div`
  position: absolute;
  top: -15%;
  left: -10%;
  width: 55vw;
  height: 55vw;
  max-width: 760px;
  max-height: 760px;
  background: radial-gradient(circle, rgba(199, 123, 59, 0.14) 0%, rgba(199, 123, 59, 0.04) 40%, transparent 66%);
  pointer-events: none;
  z-index: -1;
`;

const TestimonialsInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
`;

const TestimonialsHeader = styled.div`
  max-width: 640px;
  margin: 0 auto clamp(3rem, 6vw, 4.5rem);
  text-align: center;
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 12px ${theme.copperGlow};
`;

const TestimonialEyebrow = styled.div`
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

const Title = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2rem, 4.4vw, 3rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.06;
  letter-spacing: -0.025em;
  margin-bottom: 1.25rem;
`;

const Accent = styled.em`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
`;

const Subtitle = styled.p`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  color: ${theme.gray600};
  line-height: 1.7;
`;

const TestimonialCard = styled.div`
  position: relative;
  max-width: 880px;
  margin: 0 auto clamp(3rem, 6vw, 4.5rem);
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.xl};
  padding: clamp(2.25rem, 5vw, 3.5rem);
  box-shadow: ${theme.shadowLg};
  isolation: isolate;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.gradientGold};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1.5rem;
  }
`;

const QuoteMark = styled.div`
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  left: clamp(1.5rem, 4vw, 2.75rem);
  font-family: ${theme.fontDisplay};
  font-size: clamp(6rem, 14vw, 10rem);
  font-weight: 600;
  line-height: 0.7;
  color: ${theme.primary};
  opacity: 0.16;
  pointer-events: none;
  user-select: none;
  z-index: -1;
`;

const CardCounter = styled.div`
  position: absolute;
  top: clamp(1.75rem, 4vw, 2.75rem);
  right: clamp(1.75rem, 4vw, 2.75rem);
  font-family: ${theme.fontDisplay};
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.primary};
  font-feature-settings: 'tnum';
  letter-spacing: 0.02em;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const CounterTotal = styled.span`
  color: ${theme.gray500};
  margin-left: 0.25rem;
  font-weight: 500;
`;

const TestimonialContent = styled.div`
  margin: clamp(1.5rem, 4vw, 2.5rem) 0 0;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1.75rem;
`;

const StarIcon = styled.div`
  color: ${theme.primary};
  font-size: 1.05rem;
`;

const Content = styled.p`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.3rem, 2.6vw, 1.85rem);
  line-height: 1.45;
  color: ${theme.gray900};
  font-weight: 400;
  letter-spacing: -0.015em;
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const ServiceBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  background: rgba(199, 123, 59, 0.08);
  color: ${theme.primaryLight};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid ${theme.copperLine};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: clamp(2rem, 4vw, 2.75rem);
  padding-top: clamp(1.75rem, 3vw, 2.25rem);
  border-top: 1px solid ${theme.line};
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
`;

const AuthorImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${theme.copperLine};
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  text-align: left;
`;

const AuthorName = styled.div`
  font-family: ${theme.fontBody};
  font-size: 1.02rem;
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 0.2rem;
`;

const AuthorRole = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.8rem;
  color: ${theme.gray500};
  letter-spacing: 0.02em;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const NavButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid ${theme.lineStrong};
  color: ${theme.gray600};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${theme.primary};
    color: ${theme.primary};
    background: rgba(199, 123, 59, 0.08);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 2rem;
`;

const Indicator = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '30px' : '10px')};
  height: 3px;
  border-radius: ${theme.borderRadius.full};
  background: ${({ $active }) => ($active ? theme.primary : theme.gray400)};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${({ $active }) => ($active ? theme.primary : theme.primaryLight)};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 4px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  max-width: 880px;
  margin: 0 auto;
  background: ${theme.line};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: ${theme.gray50};
  padding: clamp(1.5rem, 3vw, 2.25rem) 1.25rem;
  text-align: center;
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${theme.gray100};
  }
`;

const StatNumber = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  font-feature-settings: 'tnum';
`;

const StatSuffix = styled.span`
  color: ${theme.primary};
  font-style: italic;
`;

const StatLabel = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  color: ${theme.gray500};
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.4;
`;
