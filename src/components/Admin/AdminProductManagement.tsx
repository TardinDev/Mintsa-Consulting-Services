import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";
import { useAdminMode } from "../../context/AdminModeContext";
import { ProductType } from "../../utils/type/type";
import theme from "../../utils/Theme/theme";
import ProductForm from './ProductForm';


type AdminProductManagementType = {
  selectedProductForEdit: ProductType | null;
  setSelectedProductForEdit: React.Dispatch<React.SetStateAction<ProductType | null>>;
}


const AdminProductManagement: React.FC<AdminProductManagementType> = ({selectedProductForEdit, setSelectedProductForEdit }) => {

  const { addProduct, updateProduct, resetToDefaultData, products, carProducts, homeProducts, electronicsProducts, terrainProducts } = useProducts();
  const { isAdminPanelVisible } = useAdminMode();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState({

    name: "",
    description: "",
    price: 0,
    images: [] as string[],
    category: "",
    status: "none",

  });

  useEffect(() => {
    if (selectedProductForEdit) {

      setFormData({
        name: selectedProductForEdit.name,
        description: selectedProductForEdit.description,
        price: selectedProductForEdit.price,
        images: selectedProductForEdit.images,
        category: selectedProductForEdit.isVoiture
          ? "voiture"
          : selectedProductForEdit.isHome
          ? "home"
          : selectedProductForEdit.isElectronic
          ? "electronic"
          : selectedProductForEdit.isTerrain
          ? "terrain"
          : "",
        status: selectedProductForEdit.status || "none",
      });
      setActiveTab("edit");
    }
  }, [selectedProductForEdit]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }));
  };

  const handleAddProduct = () => {
    if (
      formData.name &&
      formData.description &&
      formData.price > 0 &&
      formData.images.length > 0 &&
      formData.category &&
      formData.status
    ) {
      const newProduct: ProductType = {
        id: Date.now(), // ID unique basé sur le timestamp
        name: formData.name,
        description: formData.description,
        price: formData.price,
        images: formData.images,
        isVoiture: formData.category === "voiture",
        isHome: formData.category === "home",
        isElectronic: formData.category === "electronic",
        isTerrain: formData.category === "terrain",
        status: formData.status as "none" | "vendu" | "en_location" | "épuisé",
      };

      addProduct(newProduct);
      resetForm();
    } else {
      alert("Veuillez remplir tous les champs et ajouter au moins une image !");
    }
  };

  const handleAddOrUpdateProduct = () => {
    if (
      formData.name &&
      formData.description &&
      formData.price > 0 &&
      formData.images.length > 0 &&
      formData.category &&
      formData.status
    ) {
      if (selectedProductForEdit) {
        // Update the existing product
        const updatedProduct: ProductType = {
          ...selectedProductForEdit,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          images: formData.images,
          isVoiture: formData.category === "voiture",
          isHome: formData.category === "home",
          isElectronic: formData.category === "electronic",
          isTerrain: formData.category === "terrain",
          status: formData.status as "none" | "vendu" | "en_location" | "épuisé",
        };

        updateProduct(updatedProduct);
      } else {
        // Add a new Product
        const newProduct: ProductType = {
          id: Date.now(),
          name: formData.name,
          description: formData.description,
          price: formData.price,
          images: formData.images,
          isVoiture: formData.category === "voiture",
          isHome: formData.category === "home",
          isElectronic: formData.category === "electronic",
          isTerrain: formData.category === "terrain",
          status: formData.status as "none" | "vendu" | "en_location" | "épuisé",
        };

        addProduct(newProduct);
      }

      resetForm();
      setSelectedProductForEdit(null);
    } else {
      alert("Veuillez remplir tous les champs et ajouter au moins une image !");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      images: [],
      category: "",
      status: "none",
    });
    setActiveTab("add");
  };

  return (
    <AccordionContainer isOpen={isAccordionOpen}>
      <AccordionHeader onClick={toggleAccordion}>
        {isAccordionOpen ? <FaArrowRight size={20} color={theme.white} /> : <FaArrowLeft size={20} color={theme.white} />}
      </AccordionHeader>

      <AccordionContent isOpen={isAccordionOpen}>
        {activeTab === "add" ? (
         <ProductForm 
         formData={formData}
         handleInputChange={handleInputChange}
         handleImagesChange={handleImagesChange}
         onSubmit={handleAddProduct}
         buttonText="Ajouter le produit"    
         />
        ) : (
          <ProductForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleImagesChange={handleImagesChange}
          onSubmit={handleAddOrUpdateProduct}
          buttonText="Modifier le produit"
        />
        )}
        
        <ResetButton onClick={resetToDefaultData}>
          Réinitialiser les données
        </ResetButton>
        
        <TestButton onClick={() => {
          console.log('État actuel des produits:', products);
          console.log('Produits voiture:', carProducts);
          console.log('Produits maison:', homeProducts);
          console.log('Produits électroniques:', electronicsProducts);
          console.log('Produits terrain:', terrainProducts);
        }}>
          Tester la persistance
        </TestButton>
        
        <DebugButton onClick={() => {
          console.log('=== DÉBOGAGE ===');
          console.log('localStorage PRODUCTS:', localStorage.getItem('mintsa_products'));
          console.log('localStorage CAR:', localStorage.getItem('mintsa_car_products'));
          console.log('localStorage HOME:', localStorage.getItem('mintsa_home_products'));
          console.log('localStorage ELECTRONICS:', localStorage.getItem('mintsa_electronics_products'));
          console.log('localStorage TERRAIN:', localStorage.getItem('mintsa_terrain_products'));
        }}>
          Déboguer localStorage
        </DebugButton>
        
        <ClearButton onClick={() => {
          if (window.confirm('Voulez-vous nettoyer le localStorage et recharger les données par défaut ?')) {
            localStorage.removeItem('mintsa_products');
            localStorage.removeItem('mintsa_car_products');
            localStorage.removeItem('mintsa_home_products');
            localStorage.removeItem('mintsa_electronics_products');
            localStorage.removeItem('mintsa_terrain_products');
            window.location.reload();
          }
        }}>
          Nettoyer localStorage
        </ClearButton>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default AdminProductManagement;



const AccordionContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 100px;
  right: 20px;
  width: ${({ isOpen }) => (isOpen ? "350px" : "50px")};
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  border: 1px solid ${theme.gray200};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowLg};
  backdrop-filter: blur(10px);
  z-index: 9990;
  display: block !important;

  @media (max-width: ${theme.breakpoints.md}) {
    top: 120px;
    right: 10px;
    width: ${({ isOpen }) => (isOpen ? "300px" : "50px")};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    top: 140px;
    right: 10px;
    width: ${({ isOpen }) => (isOpen ? "280px" : "50px")};
  }
`;

const AccordionHeader = styled.div`
  background: ${theme.gradientPrimary};
  padding: 0.75rem;
  border-radius: ${theme.borderRadius.lg} 0 0 ${theme.borderRadius.lg};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ${theme.transition.fast};

  &:hover {
    background: ${theme.primaryDark};
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: 1.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  max-height: 70vh;
  overflow-y: auto;
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: ${theme.error};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const TestButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: ${theme.primary};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};

  &:hover {
    background: ${theme.primaryDark};
    transform: translateY(-1px);
  }
`;

const DebugButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: ${theme.warning};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};

  &:hover {
    background: #d97706;
    transform: translateY(-1px);
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: ${theme.error};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};

  &:hover {
    background: #991b1b;
    transform: translateY(-1px);
  }
`;


 
