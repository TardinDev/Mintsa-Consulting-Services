import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
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
    <FAQContainer id="faq">
      <FAQHeader>
        <HeaderIcon>
          <FaQuestionCircle />
        </HeaderIcon>
        <FAQTitle>Questions Fréquentes</FAQTitle>
        <FAQSubtitle>
          Trouvez rapidement les réponses à vos questions. Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.
        </FAQSubtitle>
      </FAQHeader>

      <CategoryFilter>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            $active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>

      <FAQList>
        {filteredFAQ.map((item, index) => (
          <FAQItemContainer key={index}>
            <FAQQuestion
              onClick={() => toggleAccordion(index)}
              $isActive={activeIndex === index}
            >
              <QuestionText>{item.question}</QuestionText>
              <ChevronIcon $isActive={activeIndex === index}>
                <FaChevronDown />
              </ChevronIcon>
            </FAQQuestion>
            <FAQAnswer $isActive={activeIndex === index}>
              <AnswerContent>{item.answer}</AnswerContent>
            </FAQAnswer>
          </FAQItemContainer>
        ))}
      </FAQList>

      <FAQFooter>
        <FooterText>Vous avez d'autres questions ?</FooterText>
        <ContactButton href="/demande-devis">Contactez-nous</ContactButton>
      </FAQFooter>
    </FAQContainer>
  );
};

export default FAQ;

const FAQContainer = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  background: ${theme.cream};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 4rem 1.5rem;
  }
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeaderIcon = styled.div`
  font-size: 3.5rem;
  color: ${theme.primary};
  margin-bottom: 1rem;
  display: inline-block;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const FAQTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 1rem;
`;

const FAQSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.gray600};
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 0.625rem 1.5rem;
  border-radius: ${theme.borderRadius.full};
  border: 2px solid ${({ $active }) => ($active ? theme.primary : theme.gray300)};
  background: ${({ $active }) => ($active ? theme.primary : theme.white)};
  color: ${({ $active }) => ($active ? theme.white : theme.gray700)};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadowMd};
    border-color: ${theme.primary};
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItemContainer = styled.div`
  background: ${theme.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadowMd};
  }
`;

const FAQQuestion = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: ${({ $isActive }) => ($isActive ? theme.primary + '10' : theme.white)};
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.primary}08;
  }
`;

const QuestionText = styled.span`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${theme.gray900};
  line-height: 1.5;
  flex: 1;
  padding-right: 1rem;
`;

const ChevronIcon = styled.div<{ $isActive: boolean }>`
  font-size: 1.125rem;
  color: ${theme.primary};
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: ${({ $isActive }) => ($isActive ? 'rotate(180deg)' : 'rotate(0)')};
  flex-shrink: 0;
`;

const FAQAnswer = styled.div<{ $isActive: boolean }>`
  max-height: ${({ $isActive }) => ($isActive ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const AnswerContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  font-size: 1rem;
  color: ${theme.gray700};
  line-height: 1.7;
`;

const FAQFooter = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary}10 100%);
  border-radius: ${theme.borderRadius.xl};
  border: 2px solid ${theme.primary}20;
`;

const FooterText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.gray900};
  margin-bottom: 1.5rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  font-size: 1.0625rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${theme.shadowMd};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow2xl};
  }
`;
