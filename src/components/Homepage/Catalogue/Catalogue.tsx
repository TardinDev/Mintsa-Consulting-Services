import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./productDetailsModal";
import { useProductStore, useUIStore } from "../../../stores";
import { ProductType } from "../../../utils/type/type";
import EmptyState from "./EmptyState";
import Tabs from "./Tabs";
import theme from "../../../utils/Theme/theme";

type CatalogueType = {
  setSelectedProductForEdit: React.Dispatch<React.SetStateAction<ProductType | null>>;
}

const Catalogue: React.FC<CatalogueType> = ({setSelectedProductForEdit}) => {
  const { products, deleteProduct } = useProductStore();
  const { activeTab, setActiveTab, selectedProductForDetails, setSelectedProductForDetails, searchQuery } = useUIStore();

  // Filtering products according to the active tab and search query
  const filteredProducts = products.filter((product) => {
    // Filtre par onglet
    let tabMatch = true;
    if (activeTab === "voiture") tabMatch = product.isVoiture ?? false;
    else if (activeTab === "home") tabMatch = product.isHome ?? false;
    else if (activeTab === "electronic") tabMatch = product.isElectronic ?? false;
    else if (activeTab === "terrain") tabMatch = product.isTerrain ?? false;

    // Filtre par recherche
    let searchMatch = true;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      searchMatch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.price.toString().includes(query) ||
        product.status.toLowerCase().includes(query);
    }

    return tabMatch && searchMatch;
  });

  // Delete a product
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(id);
    }
  };

  // Pass the selected product to modify
  const handleEditSelect = (product: ProductType) => {
    setSelectedProductForEdit(product);
  };

  // Shows details of the selected product
  const handleDetailsClick = (product: ProductType) => {
    setSelectedProductForDetails(product);
  };

  // Close the modal window
  const closeModal = () => {
    setSelectedProductForDetails(null);
  };

  return (
    <CatalogueContainer id="catalogue">
      <CatalogueHeader>
        <HeaderText>
          <CatalogueEyebrow>
            <EyebrowDot aria-hidden="true" />
            Notre catalogue
          </CatalogueEyebrow>
          <CatalogueTitle>
            Services <Amp>&amp;</Amp> Solutions
          </CatalogueTitle>
        </HeaderText>
        <CatalogueSubtitle>
          Decouvrez notre gamme complete de services professionnels et solutions innovantes
        </CatalogueSubtitle>
        <HeaderLine aria-hidden="true" />
      </CatalogueHeader>

      {searchQuery ? (
        <SearchInfo>
          <SearchText>
            Résultats pour : <SearchQuery>"{searchQuery}"</SearchQuery>
          </SearchText>
          <ResultCount>{filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</ResultCount>
        </SearchInfo>
      ) : (
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {filteredProducts.length === 0 ? (
        <EmptyState
          message={
            searchQuery
              ? `Aucun résultat trouvé pour "${searchQuery}". Essayez avec d'autres mots-clés.`
              : "Aucun service disponible pour le moment. Revenez plus tard !"
          }
          contactEmail="mintsaservicesc@gmail.com"
          adress="Akournam 1, Owendo"
        />
      ) : (
        <CardContainer>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              name={product.name}
              description={product.description}
              price={product.price}
              status={product.status}
              onDetailsClick={() => handleDetailsClick(product)}
              onDelete={() => handleDelete(product.id)}
              onEditClick={() => handleEditSelect(product)}
            />
          ))}
        </CardContainer>
      )}

      {selectedProductForDetails && (
        <ProductDetailsModal product={selectedProductForDetails} onClose={closeModal} />
      )}
    </CatalogueContainer>
  );
};

export default Catalogue;

const CatalogueContainer = styled.div`
  position: relative;
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: ${theme.cream};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 3.5rem 1.25rem;
  }
`;

const CatalogueHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1.5rem 3rem;
  margin-bottom: 3.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const HeaderText = styled.div``;

const CatalogueEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${theme.fontBody};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.secondaryLight};
  margin-bottom: 1.1rem;
`;

const EyebrowDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.primary};
  box-shadow: 0 0 10px ${theme.copperGlow};
`;

const CatalogueTitle = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: clamp(2.1rem, 4.4vw, 3.2rem);
  font-weight: 600;
  color: ${theme.white};
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0;
`;

const Amp = styled.span`
  font-style: italic;
  font-weight: 500;
  color: ${theme.primaryLight};
  font-variation-settings: 'opsz' 144, 'SOFT' 6;
`;

const CatalogueSubtitle = styled.p`
  font-family: ${theme.fontBody};
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: ${theme.gray600};
  max-width: 440px;
  margin: 0;
  line-height: 1.65;
  font-weight: 400;

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: none;
  }
`;

const HeaderLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  margin-top: 1rem;
  background: linear-gradient(90deg, ${theme.copperLine} 0%, ${theme.line} 32%, transparent 100%);
`;

const SearchInfo = styled.div`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  border-left: 2px solid ${theme.primary};
  border-radius: ${theme.borderRadius.md};
  padding: 1.25rem 1.75rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1);

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

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

const SearchText = styled.div`
  font-family: ${theme.fontBody};
  font-size: 1rem;
  color: ${theme.gray700};
  font-weight: 500;
`;

const SearchQuery = styled.span`
  font-family: ${theme.fontDisplay};
  font-style: italic;
  color: ${theme.primaryLight};
  font-weight: 500;
`;

const ResultCount = styled.div`
  font-family: ${theme.fontBody};
  background: rgba(199, 123, 59, 0.1);
  border: 1px solid ${theme.copperLine};
  color: ${theme.secondaryLight};
  padding: 0.4rem 1.1rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
`;

const CardContainer = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.5rem 0;
  justify-items: center;

  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

