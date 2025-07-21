import { ProductType } from "../type/type";

const terrainProducts: ProductType[] = [
    {
        id: 26,
        image: 'https://placehold.co/300x200?text=Terrain+Constructible',
        name: 'Terrain Constructible',
        description: 'Terrain prêt pour la construction.',
        price: 500000,
        status: 'disponible',
        isTerrain: true
    },
    {
        id: 27,
        image: 'https://placehold.co/300x200?text=Terrain+Agricole',
        name: 'Terrain Agricole',
        description: 'Parfait pour l\'agriculture.',
        price: 300000,
        status: 'disponible',
        isTerrain: true
    },
    {
        id: 28,
        image: 'https://placehold.co/300x200?text=Terrain+Commercial',
        name: 'Terrain Commercial',
        description: 'Idéal pour les activités commerciales.',
        price: 800000,
        status: 'disponible',
        isTerrain: true
    },
    {
        id: 29,
        image: 'https://placehold.co/300x200?text=Terrain+Résidentiel',
        name: 'Terrain Résidentiel',
        description: 'Pour construire votre maison de rêve.',
        price: 400000,
        status: 'disponible',
        isTerrain: true
    },
    {
        id: 30,
        image: 'https://placehold.co/300x200?text=Terrain+Industriel',
        name: 'Terrain Industriel',
        description: 'Adapté aux activités industrielles.',
        price: 1000000,
        status: 'disponible',
        isTerrain: true
    },
];

export default terrainProducts;
