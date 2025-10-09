import { ProductType } from "../type/type";

const taxServices: ProductType[] = [
  {
    id: 2001,
    images: [
      "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800",
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800"
    ],
    name: "Déclaration Fiscale des Particuliers",
    description: "Assistance pour la déclaration d'impôts sur le revenu (IRPP) auprès de la DGI. Calcul, optimisation et dépôt de votre déclaration fiscale.",
    price: 35000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2002,
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    ],
    name: "Déclaration TVA Entreprise",
    description: "Service de déclaration mensuelle ou trimestrielle de TVA pour votre entreprise. Calcul, vérification et télédéclaration à la DGI.",
    price: 50000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2003,
    images: [
      "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
    ],
    name: "Obtention NIF (Numéro d'Identification Fiscale)",
    description: "Accompagnement pour l'obtention de votre NIF auprès de la Direction Générale des Impôts. Constitution de dossier et suivi.",
    price: 25000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2004,
    images: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
    ],
    name: "Attestation de Non Redevance",
    description: "Obtention d'attestation de non-redevance fiscale auprès de la DGI. Document indispensable pour diverses démarches administratives.",
    price: 20000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2005,
    images: [
      "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"
    ],
    name: "Régularisation Fiscale",
    description: "Service d'accompagnement pour la régularisation de votre situation fiscale. Négociation d'échéanciers et mise en conformité.",
    price: 75000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2006,
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    ],
    name: "Immatriculation Fiscale Entreprise",
    description: "Immatriculation de votre nouvelle entreprise auprès de la DGI. Obtention du NIF et activation du compte fiscal électronique.",
    price: 40000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2007,
    images: [
      "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
    ],
    name: "Déclaration IS (Impôt sur les Sociétés)",
    description: "Préparation et dépôt de la déclaration annuelle d'impôt sur les sociétés. Optimisation fiscale et conformité légale.",
    price: 100000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2008,
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800"
    ],
    name: "Patente Commerciale",
    description: "Obtention ou renouvellement de la patente pour votre activité commerciale. Démarches auprès de la DGI et de la mairie.",
    price: 30000,
    status: "disponible",
    isHome: true
  },
  {
    id: 2009,
    images: [
      "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
    ],
    name: "Quitus Fiscal",
    description: "Obtention du quitus fiscal attestant que vous êtes en règle avec l'administration fiscale. Indispensable pour appels d'offres.",
    price: 45000,
    status: "disponible",
    isHome: true
  }
];

export default taxServices;
