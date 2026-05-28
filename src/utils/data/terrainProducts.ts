import { ProductType } from "../type/type";

const terrainProducts: ProductType[] = [
    {
      id: 11,
      images: ['https://images.pexels.com/photos/102728/pexels-photo-102728.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Terrain Constructible',
      description: 'Terrain idéal pour construire votre maison de rêve.',
      price: 50000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 12,
      images: ['https://images.pexels.com/photos/30255157/pexels-photo-30255157.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Terrain Agricole',
      description: 'Vaste terrain pour l\'agriculture et l\'élevage.',
      price: 75000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 13,
      images: ['https://images.pexels.com/photos/14989321/pexels-photo-14989321.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Terrain Commercial',
      description: 'Emplacement stratégique pour votre entreprise.',
      price: 120000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 14,
      images: ['https://images.pexels.com/photos/18821291/pexels-photo-18821291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Terrain Résidentiel',
      description: 'Zone résidentielle calme et sécurisée.',
      price: 85000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 15,
      images: ['https://images.pexels.com/photos/4136648/pexels-photo-4136648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Terrain de Loisirs',
      description: 'Parfait pour les activités de plein air.',
      price: 60000,
      status: 'disponible',
      isTerrain: true,
    },
  ];

  export default terrainProducts;
