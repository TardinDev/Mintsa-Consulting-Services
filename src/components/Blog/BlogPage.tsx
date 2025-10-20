import React, { useState } from 'react';
import styled from 'styled-components';
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
    author: 'Mintsa Services',
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
    author: 'Conseil Immobilier',
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
            <h3>Pourquoi choisir Mintsa Services ?</h3>
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
        <Title>Blog & Ressources</Title>
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
            <NoResultsIcon>🔍</NoResultsIcon>
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
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gray50};
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

const HeaderSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.gray600};
  line-height: 1.7;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const FiltersSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.gray400};
  font-size: 1.125rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3.5rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.full};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primary}20;
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const CategoriesFilter = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
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

const BlogGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled.article`
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadow};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadow2xl};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const CardBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: ${theme.primary};
  color: ${theme.white};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const CardExcerpt = styled.p`
  font-size: 0.9375rem;
  color: ${theme.gray600};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: ${theme.gray500};
`;

const ReadMoreButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.primary};
  font-weight: 700;
  font-size: 0.9375rem;
  transition: gap 0.3s ease;

  ${BlogCard}:hover & {
    gap: 0.75rem;
  }
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
`;

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const NoResultsText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.gray700};
  margin-bottom: 0.5rem;
`;

const NoResultsSubtext = styled.div`
  font-size: 1rem;
  color: ${theme.gray500};
`;

// Article View Styles
const ArticleContainer = styled.article`
  max-width: 900px;
  margin: 0 auto;
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  padding: 3rem;
  box-shadow: ${theme.shadow2xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1.5rem;
  }
`;

const ArticleHeader = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: ${theme.primary}15;
  color: ${theme.primary};
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
`;

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${theme.gray900};
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
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
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    height: 250px;
  }
`;

const ArticleContent = styled.div`
  font-size: 1.0625rem;
  line-height: 1.8;
  color: ${theme.gray700};
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.gray900};
    margin: 2rem 0 1rem;
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
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  padding-top: 2rem;
  border-top: 2px solid ${theme.gray100};
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${theme.gray100};
  color: ${theme.gray700};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.primary}15;
    color: ${theme.primary};
  }
`;

const CTASection = styled.div`
  padding: 2.5rem;
  background: linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary}10 100%);
  border-radius: ${theme.borderRadius.xl};
  border: 2px solid ${theme.primary}20;
  text-align: center;
`;

const CTATitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${theme.gray900};
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-size: 1.0625rem;
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
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.full};
  font-weight: 700;
  font-size: 1.0625rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${theme.shadowMd};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow2xl};
  }
`;
