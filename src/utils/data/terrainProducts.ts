import { ProductType } from "../type/type";

const terrainProducts: ProductType[] = [
    {
      id: 11,
      images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop'],
      name: 'Terrain Constructible',
      description: 'Terrain idéal pour construire votre maison de rêve.',
      price: 50000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 12,
      images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'],
      name: 'Terrain Agricole',
      description: 'Vaste terrain pour l\'agriculture et l\'élevage.',
      price: 75000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 13,
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'],
      name: 'Terrain Commercial',
      description: 'Emplacement stratégique pour votre entreprise.',
      price: 120000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 14,
      images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop'],
      name: 'Terrain Résidentiel',
      description: 'Zone résidentielle calme et sécurisée.',
      price: 85000,
      status: 'disponible',
      isTerrain: true,
    },
    {
      id: 15,
      images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'],
      name: 'Terrain de Loisirs',
      description: 'Parfait pour les activités de plein air.',
      price: 60000,
      status: 'disponible',
      isTerrain: true,
    },
  ];
  
  export default terrainProducts;
