import styled from "styled-components";
import theme from "../../../utils/Theme/theme";
import { useAdminMode } from "../../../context/AdminModeContext";


type ProductCardType = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  onDetailsClick: () => void;
  isAuthenticated: boolean;
};

export default function ProductCard({
  image,
  name,
  description,
  price,
  onDetailsClick,
}: ProductCardType) {


  const { isAdminMode } = useAdminMode(); // Utilisation du contexte pour isAdminMode




  return (
    <ProductCardStyle>
      <ImageWrapper>
        <img src={image} alt={name} />

          {isAdminMode && <CloseButton>&times;</CloseButton> }
       
       

      </ImageWrapper>
      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductDescription>{description}</ProductDescription>
        <PriceTag>{price} Fcfa</PriceTag>
        <DetailsButton onClick={onDetailsClick}>Voir les détails</DetailsButton>
      </ProductInfo>
    </ProductCardStyle>
  );
}

const ProductCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.pink};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled.h3`
  font-size: 1.2em;
  margin: 10px 0;
  color: #333;
  text-align: center;
`;

const ProductDescription = styled.p`
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
  text-align: center;
`;

const PriceTag = styled.span`
  margin-top: 8px;
  font-size: 1.1em;
  font-weight: bold;
  color: #008000;
`;

const DetailsButton = styled.button`
  margin-top: 12px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  font-size: 0.95em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
