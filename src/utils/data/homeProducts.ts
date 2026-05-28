import { ProductType } from "../type/type";

const homeProducts: ProductType[] = [
    {
      id: 1,
      images: ['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Maison Moderne',
      description: 'Une maison contemporaine avec toutes les commodités modernes.',
      price: 150000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 2,
      images: ['https://images.pexels.com/photos/17010997/pexels-photo-17010997.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Villa de Luxe',
      description: 'Villa spacieuse avec jardin et piscine.',
      price: 300000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 3,
      images: ['https://images.pexels.com/photos/562199/pexels-photo-562199.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Appartement Centre-Ville',
      description: 'Appartement moderne au cœur de la ville.',
      price: 80000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 4,
      images: ['https://images.pexels.com/photos/35751505/pexels-photo-35751505.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Maison Traditionnelle',
      description: 'Charme et authenticité dans cette maison traditionnelle.',
      price: 120000,
      status: 'disponible',
      isHome: true,
    },
    {
      id: 5,
      images: ['https://images.pexels.com/photos/16451357/pexels-photo-16451357.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Loft Industriel',
      description: 'Loft moderne avec style industriel.',
      price: 95000,
      status: 'disponible',
      isHome: true,
    },
  ];

  export default homeProducts;
