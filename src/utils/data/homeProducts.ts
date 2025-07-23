import { ProductType } from "../type/type";

const homeProducts: ProductType[] = [
    {
      id: 1,
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop'],
      name: 'Maison Moderne',
      description: 'Une maison contemporaine avec toutes les commodités modernes.',
      price: 150000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 2,
      images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop'],
      name: 'Villa de Luxe',
      description: 'Villa spacieuse avec jardin et piscine.',
      price: 300000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 3,
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop'],
      name: 'Appartement Centre-Ville',
      description: 'Appartement moderne au cœur de la ville.',
      price: 80000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 4,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop'],
      name: 'Maison Traditionnelle',
      description: 'Charme et authenticité dans cette maison traditionnelle.',
      price: 120000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 5,
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop'],
      name: 'Loft Industriel',
      description: 'Loft moderne avec style industriel.',
      price: 95000,
      status: 'disponible',
      isHome: true,
    },
  ];
  
  export default homeProducts;
  