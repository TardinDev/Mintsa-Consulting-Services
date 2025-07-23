import React, { useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./productDetailsModal";
import { useProducts } from "../../../context/ProductContext";
import { ProductType } from "../../../utils/type/type";
import EmptyState from "./EmptyState";
import Tabs from "./Tabs";
import theme from "../../../utils/Theme/theme";

type CatalogueType = {
  setSelectedProductForEdit: React.Dispatch<React.SetStateAction<ProductType | null>>;
}

const Catalogue: React.FC<CatalogueType> = ({setSelectedProductForEdit}) => {
  const [activeTab, setActiveTab] = useState<"all" | "voiture" | "home" | "electronic" | "terrain">("all");
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<ProductType | null>(null);
  const { products, deleteProduct } = useProducts();

  // Filtering products according to the active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "voiture") return product.isVoiture;
    if (activeTab === "home") return product.isHome;
    if (activeTab === "electronic") return product.isElectronic;
    if (activeTab === "terrain") return product.isTerrain;
    return true; // if "all", show all products
  });

  // Delete a product
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(id);
    }
  };

  // Pass the selected product to modify
  const handleEditSelect = (product: ProductType) => {
    console.log("Produit sélectionné pour modification :", product);
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
    <CatalogueContainer>
      <CatalogueHeader>
        <CatalogueTitle>Nos Services & Solutions</CatalogueTitle>
        <CatalogueSubtitle>
          Découvrez notre gamme complète de services professionnels et solutions innovantes
        </CatalogueSubtitle>
      </CatalogueHeader>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredProducts.length === 0 ? (
        <EmptyState 
          message="Aucun service disponible pour le moment. Revenez plus tard !"
          contactEmail="mintsaservicesc@gmail.com"
          adress="Akournam 1, Owendo"
        />
      ) : (
        <CardContainer>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
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
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: ${theme.gray50};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem 1rem;
  }
`;

const CatalogueHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CatalogueTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: ${theme.gray900};
  margin-bottom: 1rem;
  background: ${theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const CatalogueSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.gray600};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const CardContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding: 2rem 0;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

