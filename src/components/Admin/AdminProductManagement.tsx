import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";
import { ProductType } from "../../utils/type/type";
import theme from "../../utils/Theme/theme";
import ProductForm from './ProductForm';


type AdminProductManagementType = {
  selectedProductForEdit: ProductType | null;
  setSelectedProductForEdit: React.Dispatch<React.SetStateAction<ProductType | null>>;
}


const AdminProductManagement: React.FC<AdminProductManagementType> = ({selectedProductForEdit, setSelectedProductForEdit }) => {

  const { addProduct, products, setProducts } = useProducts();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState({

    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    status: "none",

  });

  useEffect(() => {
    if (selectedProductForEdit) {

      setFormData({
        name: selectedProductForEdit.name,
        description: selectedProductForEdit.description,
        price: selectedProductForEdit.price,
        image: selectedProductForEdit.image,
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

  const handleAddProduct = () => {
    if (
      formData.name &&
      formData.description &&
      formData.price > 0 &&
      formData.image &&
      formData.category &&
      formData.status
    ) {
      const newProduct: ProductType = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        isVoiture: formData.category === "voiture",
        isHome: formData.category === "home",
        isElectronic: formData.category === "electronic",
        isTerrain: formData.category === "terrain",
        status: formData.status as "none" | "vendu" | "en_location" | "épuisé",
      };

      addProduct(newProduct);
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        status: "none",
      });
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  const handleAddOrUpdateProduct = () => {
    if (
      formData.name &&
      formData.description &&
      formData.price > 0 &&
      formData.image &&
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
          image: formData.image,
          isVoiture: formData.category === "voiture",
          isHome: formData.category === "home",
          isElectronic: formData.category === "electronic",
          isTerrain: formData.category === "terrain",
          status: formData.status as "none" | "vendu" | "en_location" | "épuisé",
        };

        const updatedProducts = products.map((product) =>
          product.id === selectedProductForEdit.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
      } else {
        // Add a new Product
        const newProduct: ProductType = {
          id: products.length ? products[products.length - 1].id + 1 : 1,
          name: formData.name,
          description: formData.description,
          price: formData.price,
          image: formData.image,
          isVoiture: formData.category === "voiture",
          isHome: formData.category === "home",
          isElectronic: formData.category === "electronic",
          isTerrain: formData.category === "terrain",
          status: formData.status as "none" | "vendu" | "en_location" | "épuisé",
        };

        addProduct(newProduct);
      }

     
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        status: "none",
      });

      setSelectedProductForEdit(null); // Call this function to reset selectedProductForEdit
    } else {
      alert("Veuillez remplir tous les champs !");
    }
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
         onSubmit={handleAddProduct}
         buttonText="Ajouter le produit"    
         />
        ) : (
          <ProductForm
          formData={formData}
          handleInputChange={handleInputChange}
          onSubmit={handleAddOrUpdateProduct}
          buttonText="Modifier le produit"
        />
        )}
      </AccordionContent>
    </AccordionContainer>
  );
};

export default AdminProductManagement;



const AccordionContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 80px;
  right: 20px;
  width: ${({ isOpen }) => (isOpen ? "350px" : "50px")};
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  border: 1px solid ${theme.gray200};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowLg};
  backdrop-filter: blur(10px);
  z-index: ${theme.zDropdown};
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


 
