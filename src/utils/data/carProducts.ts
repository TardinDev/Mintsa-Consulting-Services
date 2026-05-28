import { ProductType } from "../type/type";

const carProducts: ProductType[] = [
    {
      id: 16,
      images: ['https://images.pexels.com/photos/12937789/pexels-photo-12937789.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'SUV Familial',
      description: 'Parfait pour les grandes aventures en famille.',
      price: 25000,
      status: 'disponible',
      isVoiture: true,
    },
    {
      id: 17,
      images: ['https://images.pexels.com/photos/18678626/pexels-photo-18678626.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Voiture Citadine',
      description: 'Compacte et idéale pour la ville.',
      price: 5000,
      status: 'disponible',
      isVoiture: true,
    },
    {
      id: 18,
      images: ['https://images.pexels.com/photos/937668/pexels-photo-937668.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Pick-up Tout-Terrain',
      description: 'Conçu pour les routes difficiles et les charges lourdes.',
      price: 28000,
      status: 'disponible',
      isVoiture: true,
    },
    {
      id: 19,
      images: ['https://images.pexels.com/photos/18029637/pexels-photo-18029637.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Berline de Luxe',
      description: 'Élégance et confort pour vos déplacements.',
      price: 30000,
      status: 'disponible',
      isVoiture: true,
    },
    {
      id: 20,
      images: ['https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Voiture Électrique',
      description: 'Un choix écologique et moderne.',
      price: 45000,
      status: 'disponible',
      isVoiture: true,
    },
  ];

  export default carProducts;
