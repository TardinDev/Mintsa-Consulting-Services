import styled from "styled-components";
import theme from "../../utils/Theme/theme";

type ProductFormType = {

    formData: {
      name: string;
      description: string;
      price: number;
      image: string;
      category: string;
      status: string;
    };

    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: () => void;
    buttonText: string;
  }
  
  const ProductForm: React.FC<ProductFormType> = ({ formData, handleInputChange, onSubmit, buttonText }) => {
    
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
        <Input
          type="text"
          name="image"
          placeholder="Lien de l'image"
          value={formData.image}
          onChange={handleInputChange}
        />
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
          <option value="none">Aucun</option>
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