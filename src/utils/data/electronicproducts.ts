import { ProductType } from "../type/type";

const electronicProducts: ProductType[] = [
    {
      id: 6,
      images: ['https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Smartphone Premium',
      description: 'Dernière génération avec fonctionnalités avancées.',
      price: 1200,
      status: 'disponible',
      isElectronic: true,
    },
    {
      id: 7,
      images: ['https://images.pexels.com/photos/943596/pexels-photo-943596.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Ordinateur Portable',
      description: 'Puissant et portable pour tous vos besoins.',
      price: 2500,
      status: 'disponible',
      isElectronic: true,
    },
    {
      id: 8,
      images: ['https://images.pexels.com/photos/210927/pexels-photo-210927.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Casque Audio',
      description: 'Qualité sonore exceptionnelle et confort optimal.',
      price: 300,
      status: 'disponible',
      isElectronic: true,
    },
    {
      id: 9,
      images: ['https://images.pexels.com/photos/4372403/pexels-photo-4372403.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Appareil Photo',
      description: 'Capturez vos moments les plus précieux.',
      price: 800,
      status: 'disponible',
      isElectronic: true,
    },
    {
      id: 10,
      images: ['https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=600&h=400'],
      name: 'Montre Connectée',
      description: 'Technologie avancée au poignet.',
      price: 400,
      status: 'disponible',
      isElectronic: true,
    },
  ];

  export default electronicProducts;
