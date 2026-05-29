import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '../../utils/Theme/theme';
import {
  FaArrowLeft,
  FaCalendar,
  FaUser,
  FaClock,
  FaTag,
  FaSearch,
  FaArrowRight
} from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Comment créer son entreprise au Gabon en 2025 ?',
    excerpt: 'Guide complet des démarches administratives pour lancer votre activité professionnelle au Gabon.',
    content: 'La création d\'entreprise au Gabon nécessite plusieurs étapes clés...',
    author: 'MINTSA Services',
    date: '15 Janvier 2025',
    readTime: '8 min',
    category: 'Entrepreneuriat',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    tags: ['SARL', 'Création d\'entreprise', 'RCCM', 'NIF']
  },
  {
    id: 2,
    title: 'Fiscalité gabonaise : Ce qu\'il faut savoir en 2025',
    excerpt: 'Découvrez les principales obligations fiscales et les nouveautés fiscales pour les entreprises au Gabon.',
    content: 'La fiscalité au Gabon comprend plusieurs types d\'impôts...',
    author: 'Expert Fiscal',
    date: '12 Janvier 2025',
    readTime: '10 min',
    category: 'Fiscalité',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    tags: ['Impôts', 'DGI', 'Déclaration fiscale', 'TVA']
  },
  {
    id: 3,
    title: 'Titre foncier au Gabon : Procédure complète 2025',
    excerpt: 'Tout savoir sur l\'obtention d\'un titre foncier au Gabon : étapes, délais, coûts et documents nécessaires.',
    content: 'L\'obtention d\'un titre foncier est une étape cruciale...',
    author: 'Solutions Immobilières',
    date: '8 Janvier 2025',
    readTime: '12 min',
    category: 'Immobilier',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    tags: ['Titre foncier', 'Propriété', 'Bornage', 'Cadastre']
  },
  {
    id: 4,
    title: 'Obtenir sa CNI rapidement : Guide pratique',
    excerpt: 'Les démarches simplifiées pour obtenir votre Carte Nationale d\'Identité dans les meilleurs délais.',
    content: 'La Carte Nationale d\'Identité est un document essentiel...',
    author: 'Services Admin',
    date: '5 Janvier 2025',
    readTime: '5 min',
    category: 'Administratif',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    tags: ['CNI', 'DGDI', 'Documents administratifs']
  },
  {
    id: 5,
    title: 'Gestion de flotte automobile : Les meilleures pratiques',
    excerpt: 'Optimisez la gestion de votre parc automobile avec nos conseils d\'experts.',
    content: 'La gestion d\'une flotte automobile nécessite organisation et rigueur...',
    author: 'Expert Automobile',
    date: '2 Janvier 2025',
    readTime: '7 min',
    category: 'Automobile',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    tags: ['Flotte automobile', 'Carte grise', 'Visite technique']
  },
  {
    id: 6,
    title: 'Comptabilité pour PME : Les fondamentaux',
    excerpt: 'Maîtrisez les bases de la comptabilité d\'entreprise pour une gestion saine et conforme.',
    content: 'Une bonne comptabilité est la clé de la pérennité d\'une entreprise...',
    author: 'Expert Comptable',
    date: '28 Décembre 2024',
    readTime: '9 min',
    category: 'Comptabilité',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800',
    tags: ['Comptabilité', 'PME', 'Gestion financière', 'Bilan']
  }
];

const categories = ['Tous', ...Array.from(new Set(blogPosts.map(post => post.category)))];

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return (
      <PageContainer>
        <BackButton onClick={() => setSelectedPost(null)}>
          <FaArrowLeft /> Retour aux articles
        </BackButton>

        <ArticleContainer>
          <ArticleHeader>
            <CategoryBadge>{selectedPost.category}</CategoryBadge>
            <ArticleTitle>{selectedPost.title}</ArticleTitle>
            <ArticleMeta>
              <MetaItem>
                <FaUser /> {selectedPost.author}
              </MetaItem>
              <MetaItem>
                <FaCalendar /> {selectedPost.date}
              </MetaItem>
              <MetaItem>
                <FaClock /> {selectedPost.readTime} de lecture
              </MetaItem>
            </ArticleMeta>
          </ArticleHeader>

          <ArticleImage src={selectedPost.image} alt={selectedPost.title} />

          <ArticleContent>
            <p>{selectedPost.content}</p>
            <p>
              Cet article est un exemple de contenu. Dans une version complète,
              vous pourriez ajouter ici le contenu détaillé de chaque article de blog,
              avec des sections, des images, des listes, etc.
            </p>
            <h3>Pourquoi choisir MINTSA Services ?</h3>
            <ul>
              <li>Plus de 15 ans d'expérience dans le conseil aux entreprises</li>
              <li>Une équipe d'experts qualifiés et à votre écoute</li>
              <li>Des tarifs transparents et compétitifs</li>
              <li>Un accompagnement personnalisé de A à Z</li>
            </ul>
          </ArticleContent>

          <ArticleTags>
            {selectedPost.tags.map((tag, index) => (
              <Tag key={index}>
                <FaTag /> {tag}
              </Tag>
            ))}
          </ArticleTags>

          <CTASection>
            <CTATitle>Besoin d'aide pour votre projet ?</CTATitle>
            <CTAText>
              Notre équipe d'experts est à votre disposition pour vous accompagner
              dans toutes vos démarches administratives, fiscales et juridiques.
            </CTAText>
            <CTAButton onClick={() => navigate('/demande-devis')}>
              Demander un devis gratuit <FaArrowRight />
            </CTAButton>
          </CTASection>
        </ArticleContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft /> Retour à l'accueil
      </BackButton>

      <HeaderSection>
        <Eyebrow>
          <EyebrowDot aria-hidden="true" />
          Journal &amp; ressources — Gabon
        </Eyebrow>
        <Title>
          Conseils d'experts &amp; <Accent>actualités</Accent>
        </Title>
        <Subtitle>
          Conseils d'experts, guides pratiques et actualités pour vous accompagner
          dans vos démarches administratives et entrepreneuriales au Gabon
        </Subtitle>
      </HeaderSection>

      <FiltersSection>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <CategoriesFilter>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoriesFilter>
      </FiltersSection>

      <BlogGrid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} onClick={() => setSelectedPost(post)}>
              <CardImage src={post.image} alt={post.title} />
              <CardBadge>{post.category}</CardBadge>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardExcerpt>{post.excerpt}</CardExcerpt>
                <CardMeta>
                  <MetaItem>
                    <FaCalendar /> {post.date}
                  </MetaItem>
                  <MetaItem>
                    <FaClock /> {post.readTime}
                  </MetaItem>
                </CardMeta>
                <ReadMoreButton>
                  Lire l'article <FaArrowRight />
                </ReadMoreButton>
              </CardContent>
            </BlogCard>
          ))
        ) : (
          <NoResults>
            <NoResultsIcon aria-hidden="true"><FaSearch /></NoResultsIcon>
            <NoResultsText>Aucun article trouvé</NoResultsText>
            <NoResultsSubtext>
              Essayez de modifier votre recherche ou de sélectionner une autre catégorie
            </NoResultsSubtext>
          </NoResults>
        )}
      </BlogGrid>
    </PageContainer>
  );
};

export default BlogPage;

// Styled Components
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
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

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 5.5rem 1.25rem 3rem;
  }
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

const HeaderSection = styled.div`
  max-width: 820px;
  margin: 0 auto 3rem;
  text-align: center;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;

  ${Eyebrow} { justify-content: center; }
`;

const Title = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin-bottom: 1.1rem;
`;

const Accent = styled.span`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
`;

const Subtitle = styled.p`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: ${theme.gray600};
  line-height: 1.7;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const FiltersSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.gray500};
  font-size: 1rem;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem 1rem 3.5rem;
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.full};
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

const CategoriesFilter = styled.div`
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 0.55rem 1.3rem;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : theme.lineStrong)};
  background: ${({ $active }) => ($active ? theme.gradientGold : 'transparent')};
  color: ${({ $active }) => ($active ? theme.black : theme.gray700)};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $active }) => ($active ? theme.shadowCopper : 'none')};

  &:hover {
    border-color: ${({ $active }) => ($active ? 'transparent' : theme.primary)};
    color: ${({ $active }) => ($active ? theme.black : theme.white)};
    background: ${({ $active }) => ($active ? theme.gradientGold : 'rgba(199, 123, 59, 0.08)')};
  }
`;

const BlogGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.75rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled.article`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;

  &:hover {
    transform: translateY(-6px);
    border-color: ${theme.copperLine};
    box-shadow: ${theme.shadowLg};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  filter: grayscale(0.2) brightness(0.85);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;

  ${BlogCard}:hover & {
    transform: scale(1.05);
    filter: grayscale(0) brightness(0.95);
  }
`;

const CardBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.85rem;
  background: rgba(20, 17, 14, 0.7);
  color: ${theme.primaryLight};
  border: 1px solid ${theme.copperLine};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  backdrop-filter: blur(8px);
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-family: ${theme.fontDisplay};
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.white};
  margin-bottom: 0.7rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
`;

const CardExcerpt = styled.p`
  font-family: ${theme.fontBody};
  font-size: 0.92rem;
  color: ${theme.gray600};
  line-height: 1.6;
  margin-bottom: 1.25rem;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${theme.fontBody};
  font-size: 0.8rem;
  color: ${theme.gray500};

  svg { color: ${theme.primary}; }
`;

const ReadMoreButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.primaryLight};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.9rem;
  transition: gap 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);

  ${BlogCard}:hover & {
    gap: 0.8rem;
  }
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
`;

const NoResultsIcon = styled.div`
  font-size: 2.6rem;
  color: ${theme.gray500};
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: center;
`;

const NoResultsText = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.gray800};
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const NoResultsSubtext = styled.div`
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray500};
`;

// Article View Styles
const ArticleContainer = styled.article`
  max-width: 860px;
  margin: 0 auto;
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.lg};
  padding: 3.25rem;
  box-shadow: ${theme.shadowLg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1.5rem;
  }
`;

const ArticleHeader = styled.header`
  margin-bottom: 2.25rem;
  text-align: center;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 0.4rem 1.1rem;
  background: rgba(199, 123, 59, 0.1);
  color: ${theme.primaryLight};
  border: 1px solid ${theme.copperLine};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 1.5rem;
`;

const ArticleTitle = styled.h1`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 600;
  color: ${theme.white};
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
`;

const ArticleMeta = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  margin-bottom: 2.25rem;
  filter: grayscale(0.15);

  @media (max-width: ${theme.breakpoints.md}) {
    height: 250px;
  }
`;

const ArticleContent = styled.div`
  font-family: ${theme.fontBody};
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${theme.gray700};
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }

  h3 {
    font-family: ${theme.fontDisplay};
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.white};
    letter-spacing: -0.02em;
    margin: 2.25rem 0 1rem;
  }

  ul {
    margin: 1rem 0 1.5rem 1.5rem;

    li {
      margin-bottom: 0.75rem;
      padding-left: 0.5rem;
    }
  }
`;

const ArticleTags = styled.div`
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${theme.line};
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.95rem;
  background: ${theme.gray200};
  color: ${theme.gray600};
  border: 1px solid ${theme.line};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 0.82rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  svg { color: ${theme.primary}; }

  &:hover {
    border-color: ${theme.copperLine};
    color: ${theme.primaryLight};
  }
`;

const CTASection = styled.div`
  padding: 2.75rem;
  background: ${theme.gray200};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.line};
  border-left: 2px solid ${theme.primary};
  text-align: center;
`;

const CTATitle = styled.h3`
  font-family: ${theme.fontDisplay};
  font-size: 1.7rem;
  font-weight: 600;
  color: ${theme.white};
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-family: ${theme.fontBody};
  font-size: 1.02rem;
  color: ${theme.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
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
  box-shadow: ${theme.shadowCopper};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 44px rgba(199, 123, 59, 0.42);
  }
`;
