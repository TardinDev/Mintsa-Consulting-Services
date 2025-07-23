import styled from "styled-components";
import theme from "../../utils/Theme/theme";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

type ProductFormType = {
    formData: {
      name: string;
      description: string;
      price: number;
      images: string[];
      category: string;
      status: string;
    };

    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImagesChange: (images: string[]) => void;
    onSubmit: () => void;
    buttonText: string;
  }
  
  const ProductForm: React.FC<ProductFormType> = ({ 
    formData, 
    handleInputChange, 
    handleImagesChange,
    onSubmit, 
    buttonText 
  }) => {
    const [newImageUrl, setNewImageUrl] = useState("");

    const addImage = () => {
      if (newImageUrl.trim()) {
        handleImagesChange([...formData.images, newImageUrl.trim()]);
        setNewImageUrl("");
      }
    };

    const removeImage = (index: number) => {
      const updatedImages = formData.images.filter((_, i) => i !== index);
      handleImagesChange(updatedImages);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addImage();
      }
    };
    
    return (
      <Form>
        <h3>{buttonText === "Ajouter le produit" ? "Ajoutez un nouveau produit" : "Modifier le produit"}</h3>
        <Input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleInputChange}
        />
        
        <ImageSection>
          <ImageSectionTitle>Images du produit</ImageSectionTitle>
          <ImageInputContainer>
            <Input
              type="text"
              placeholder="Lien de l'image"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <AddImageButton type="button" onClick={addImage}>
              <FaPlus size={14} />
            </AddImageButton>
          </ImageInputContainer>
          
          {formData.images.length > 0 && (
            <ImagesList>
              {formData.images.map((image, index) => (
                <ImageItem key={index}>
                  <ImagePreview src={image} alt={`Image ${index + 1}`} />
                  <RemoveImageButton onClick={() => removeImage(index)}>
                    <FaTrash size={12} />
                  </RemoveImageButton>
                </ImageItem>
              ))}
            </ImagesList>
          )}
        </ImageSection>

        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleInputChange}
        />
        <Select name="category" value={formData.category} onChange={handleInputChange}>
          <option value="">Choisissez une catégorie</option>
          <option value="voiture">Voiture</option>
          <option value="home">Maison</option>
          <option value="electronic">Appareils électroniques</option>
          <option value="terrain">Terrain</option>
        </Select>
        <Select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="">Choisissez un état</option>
          <option value="none">Disponible</option>
          <option value="vendu">Vendu</option>
          <option value="en_location">En Location</option>
          <option value="épuisé">Épuisé</option>
        </Select>
        <AddButton type="button" onClick={onSubmit}>
          {buttonText}
        </AddButton>
      </Form>
    );
  };

  export default ProductForm;

  const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h3 {
    text-align: center;
    color: ${theme.primary};
  }
`;

const ImageSection = styled.div`
  border: 1px solid ${theme.gray200};
  border-radius: ${theme.borderRadius.md};
  padding: 1rem;
  background: ${theme.gray50};
`;

const ImageSectionTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: ${theme.gray700};
  font-size: 0.875rem;
  font-weight: 600;
`;

const ImageInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const AddImageButton = styled.button`
  padding: 0.5rem;
  background: ${theme.primary};
  color: ${theme.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transition.fast};

  &:hover {
    background: ${theme.primaryDark};
    transform: scale(1.05);
  }
`;

const ImagesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const ImageItem = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  border: 2px solid ${theme.gray200};
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: ${theme.error};
  color: ${theme.white};
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all ${theme.transition.fast};

  &:hover {
    background: #dc2626;
    transform: scale(1.1);
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: ${theme.primary};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;