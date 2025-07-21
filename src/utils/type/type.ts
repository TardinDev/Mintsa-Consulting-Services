export type ProductType = {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    status:"none" | "vendu" | "en_location" | "épuisé" | "disponible";
    isVoiture?: boolean;
    isHome?: boolean;
    isElectronic?: boolean;
    isTerrain?: boolean;
    selectedProductForEdit?:boolean;
    setSelectedProductForEdit?:() => void;

    
    
  };
  