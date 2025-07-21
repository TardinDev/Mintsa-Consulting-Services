import { ProductType } from "../type/type";
import carProducts from "./carProducts";
import electronicsProducts from "./electronicproducts";
import homeProducts from "./homeProducts";
import terrainProducts from "./terrainProducts";



const dataProducts: ProductType[] = [

    // Produits pour voiture
    ...carProducts,
    // Produits pour maison
    ...homeProducts,
    // Produits électroniques 
    ...electronicsProducts,
    // produits Terrains
    ...terrainProducts
    
];

export default dataProducts;
