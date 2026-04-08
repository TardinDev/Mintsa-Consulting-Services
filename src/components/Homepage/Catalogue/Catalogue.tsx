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
        <CatalogueEyebrow>Notre Catalogue</CatalogueEyebrow>
        <CatalogueTitle>Services & Solutions</CatalogueTitle>
        <GoldDivider />
        <CatalogueSubtitle>
          Decouvrez notre gamme complete de services professionnels et solutions innovantes
        </CatalogueSubtitle>
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
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: ${theme.cream};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 3rem 1rem;
  }
`;

const CatalogueHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const CatalogueEyebrow = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${theme.secondary};
  margin-bottom: 1rem;
`;

const GoldDivider = styled.div`
  width: 60px;
  height: 3px;
  background: ${theme.gradientGold};
  border-radius: 2px;
  margin: 0 auto 1.5rem;
`;

const CatalogueTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${theme.gray900};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const CatalogueSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.gray600};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 400;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const SearchInfo = styled.div`
  background: linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary}10 100%);
  border-left: 4px solid ${theme.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.3s ease-out;

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
  font-size: 1.1rem;
  color: ${theme.gray700};
  font-weight: 500;
`;

const SearchQuery = styled.span`
  color: ${theme.primary};
  font-weight: 700;
`;

const ResultCount = styled.div`
  background: ${theme.primary};
  color: ${theme.white};
  padding: 0.5rem 1.25rem;
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: ${theme.shadowMd};
`;

const CardContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 2rem 0;
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

