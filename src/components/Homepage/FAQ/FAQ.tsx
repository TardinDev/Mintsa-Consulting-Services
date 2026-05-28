import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../../utils/Theme/theme';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Services Administratifs',
    question: 'Combien de temps faut-il pour obtenir une CNI ?',
    answer: 'Le délai moyen est de 3 à 5 jours ouvrables une fois le dossier complet déposé. Nous nous occupons de toutes les démarches et du suivi auprès de la DGDI.'
  },
  {
    category: 'Services Administratifs',
    question: 'Quels documents fournir pour une demande de passeport ?',
    answer: 'Vous aurez besoin d\'une CNI valide, de photos biométriques récentes, et de justificatifs selon votre situation. Notre équipe vous guidera pour constituer le dossier complet.'
  },
  {
    category: 'Services Fiscaux',
    question: 'Comment obtenir mon NIF rapidement ?',
    answer: 'Nous pouvons obtenir votre Numéro d\'Identification Fiscale en 5 à 7 jours. Le service inclut la constitution du dossier, le dépôt à la DGI, et la récupération du NIF.'
  },
  {
    category: 'Services Fiscaux',
    question: 'Proposez-vous un accompagnement pour la déclaration fiscale ?',
    answer: 'Oui, nous offrons un service complet : analyse de votre situation fiscale, calcul optimisé, télédéclaration et suivi auprès de la DGI. Nous garantissons la conformité de votre déclaration.'
  },
  {
    category: 'Services Automobiles',
    question: 'Comment se passe la démarche pour la carte grise ?',
    answer: 'Nous gérons l\'intégralité du processus : constitution du dossier, démarches à la DGTTM, suivi jusqu\'à la récupération. Délai : 5 à 10 jours selon la complexité.'
  },
  {
    category: 'Services Automobiles',
    question: 'La visite technique est-elle incluse dans vos services ?',
    answer: 'Oui, nous proposons un service complet incluant la prise de rendez-vous, l\'accompagnement au centre de contrôle, et la délivrance du certificat. Délai : 3 à 5 jours.'
  },
  {
    category: 'Services Immobiliers',
    question: 'Combien coûte l\'obtention d\'un titre foncier ?',
    answer: 'Le tarif de notre service d\'accompagnement est de 500 000 FCFA. Ce montant inclut le bornage, l\'enquête commodo, la constitution du dossier complet et le suivi jusqu\'à délivrance.'
  },
  {
    category: 'Services Immobiliers',
    question: 'Aidez-vous pour les permis de construire ?',
    answer: 'Absolument ! Nous gérons l\'ensemble : préparation des plans avec architecte, dossier technique, démarches urbanisme. Délai : 20 à 40 jours selon la complexité du projet.'
  },
  {
    category: 'Création d\'Entreprise',
    question: 'Combien de temps pour créer une SARL ?',
    answer: 'La création complète d\'une SARL prend entre 10 et 20 jours. Nous nous occupons de la rédaction des statuts, l\'immatriculation RCCM, l\'obtention du NIF et toutes les formalités légales.'
  },
  {
    category: 'Création d\'Entreprise',
    question: 'Quel capital minimum pour créer une entreprise ?',
    answer: 'Le capital minimum dépend de la forme juridique choisie. Pour une SARL, il n\'y a pas de minimum légal au Gabon. Nous vous conseillons selon votre projet et vos besoins.'
  },
  {
    category: 'Général',
    question: 'Vos devis sont-ils gratuits ?',
    answer: 'Oui, tous nos devis sont gratuits et sans engagement. Vous recevrez une réponse détaillée sous 24h maximum après soumission de votre demande.'
  },
  {
    category: 'Général',
    question: 'Comment puis-je vous payer ?',
    answer: 'Nous acceptons les virements bancaires, les paiements par mobile money (Airtel Money, Moov Money), et les espèces. Le paiement se fait généralement en deux temps : acompte à la commande et solde à la livraison.'
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const categories = ['Tous', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = activeCategory === 'Tous'
    ? faqData
    : faqData.filter(item => item.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQContainer id="faq" aria-label="Questions fréquentes">
      <Glow aria-hidden="true" />

      <FAQInner>
        <FAQHeader>
          <FAQEyebrow>
            <EyebrowDot aria-hidden="true" />
            FAQ
          </FAQEyebrow>
          <FAQTitle>
            Questions <Accent>fréquentes</Accent>
          </FAQTitle>
          <FAQSubtitle>
            Trouvez rapidement les réponses à vos questions. Si vous ne trouvez pas
            ce que vous cherchez, n'hésitez pas à nous contacter.
          </FAQSubtitle>
        </FAQHeader>

        <CategoryFilter role="tablist" aria-label="Filtrer par catégorie">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              $active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <FAQList>
          {filteredFAQ.map((item, index) => (
            <FAQItemContainer key={index} $isActive={activeIndex === index}>
              <FAQQuestion
                onClick={() => toggleAccordion(index)}
                $isActive={activeIndex === index}
                aria-expanded={activeIndex === index}
              >
                <ItemNum $isActive={activeIndex === index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </ItemNum>
                <QuestionText>{item.question}</QuestionText>
                <ToggleIcon $isActive={activeIndex === index} aria-hidden="true">
                  <ToggleBar />
                  <ToggleBar $vertical $isActive={activeIndex === index} />
                </ToggleIcon>
              </FAQQuestion>
              <FAQAnswer $isActive={activeIndex === index}>
                <AnswerContent>{item.answer}</AnswerContent>
              </FAQAnswer>
            </FAQItemContainer>
          ))}
        </FAQList>

        <FAQFooter>
          <FooterText>Vous avez d'autres questions ?</FooterText>
          <ContactButton href="/demande-devis">
            Contactez-nous
            <ButtonArrow aria-hidden="true">→</ButtonArrow>
          </ContactButton>
        </FAQFooter>
      </FAQInner>
    </FAQContainer>
  );
};

export default FAQ;

const FAQContainer = styled.section`
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
  bottom: -20%;
  right: -12%;
  width: 55vw;
  height: 55vw;
  max-width: 720px;
  max-height: 720px;
  background: radial-gradient(circle, rgba(199, 123, 59, 0.13) 0%, rgba(199, 123, 59, 0.04) 42%, transparent 66%);
  pointer-events: none;
  z-index: -1;
`;

const FAQInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 920px;
  margin: 0 auto;
`;

const FAQHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto clamp(2.5rem, 5vw, 3.5rem);
`;

const EyebrowDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 12px ${theme.copperGlow};
`;

const FAQEyebrow = styled.div`
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

const FAQTitle = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2rem, 4.4vw, 3rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.06;
  letter-spacing: -0.025em;
  margin-bottom: 1.25rem;
  font-variation-settings: 'opsz' 144;
`;

const Accent = styled.em`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
  font-variation-settings: 'opsz' 144, 'SOFT' 4;
`;

const FAQSubtitle = styled.p`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  color: ${theme.gray600};
  line-height: 1.7;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.15rem;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${({ $active }) => ($active ? theme.copperLine : theme.line)};
  background: ${({ $active }) => ($active ? 'rgba(199, 123, 59, 0.1)' : 'transparent')};
  color: ${({ $active }) => ($active ? theme.primaryLight : theme.gray500)};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${theme.copperLine};
    color: ${theme.gray800};
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.line};
`;

const FAQItemContainer = styled.div<{ $isActive: boolean }>`
  border-bottom: 1px solid ${({ $isActive }) => ($isActive ? theme.copperLine : theme.line)};
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const FAQQuestion = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 0.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    padding-left: 0.75rem;
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
    border-radius: ${theme.borderRadius.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 0.85rem;
  }
`;

const ItemNum = styled.span<{ $isActive: boolean }>`
  font-family: ${theme.fontDisplay};
  font-size: 0.92rem;
  font-weight: 600;
  font-feature-settings: 'tnum';
  color: ${({ $isActive }) => ($isActive ? theme.primary : theme.gray500)};
  transition: color 0.3s ease;
`;

const QuestionText = styled.span`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 500;
  color: ${theme.white};
  line-height: 1.45;
`;

const ToggleBar = styled.span<{ $vertical?: boolean; $isActive?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 1.5px;
  background: ${theme.primary};
  border-radius: 2px;
  transform: ${({ $vertical, $isActive }) =>
    $vertical
      ? `translate(-50%, -50%) rotate(${$isActive ? '0deg' : '90deg'})`
      : 'translate(-50%, -50%)'};
  opacity: ${({ $vertical, $isActive }) => ($vertical && $isActive ? 0 : 1)};
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
`;

const ToggleIcon = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: 1px solid ${({ $isActive }) => ($isActive ? theme.copperLine : theme.lineStrong)};
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? 'rgba(199, 123, 59, 0.08)' : 'transparent')};
  transition: border-color 0.4s ease, background 0.4s ease;

  ${FAQQuestion}:hover & {
    border-color: ${theme.copperLine};
  }
`;

const FAQAnswer = styled.div<{ $isActive: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isActive }) => ($isActive ? '1fr' : '0fr')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
`;

const AnswerContent = styled.div`
  overflow: hidden;
  padding: 0 3.25rem 1.75rem 2.4rem;
  font-family: ${theme.fontBody};
  font-size: clamp(0.95rem, 1.3vw, 1.02rem);
  color: ${theme.gray600};
  line-height: 1.7;
  max-width: 64ch;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 0.5rem 1.5rem 1.85rem;
  }
`;

const FAQFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  margin-top: clamp(3rem, 6vw, 4.5rem);
  padding: clamp(2.25rem, 5vw, 3rem);
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.xl};
`;

const FooterText = styled.p`
  font-family: ${theme.fontDisplay};
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  font-weight: 500;
  color: ${theme.white};
  letter-spacing: -0.015em;
  font-variation-settings: 'opsz' 80;
`;

const ButtonArrow = styled.span`
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: ${theme.gradientGold};
  color: ${theme.black};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  box-shadow: ${theme.shadowCopper};
  transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(199, 123, 59, 0.42);
  }

  &:hover ${ButtonArrow} {
    transform: translateX(5px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
