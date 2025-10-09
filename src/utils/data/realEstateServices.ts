import { ProductType } from "../type/type";

const realEstateServices: ProductType[] = [
  {
    id: 4001,
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"
    ],
    name: "Titre Foncier - Obtention",
    description: "Accompagnement complet pour l'obtention d'un titre foncier auprès de la Conservation Foncière. Bornage, enquête de commodo et délivrance.",
    price: 500000,
    status: "disponible",
    isTerrain: true
  },
  {
    id: 4002,
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    name: "Certificat de Propriété Immobilière",
    description: "Obtention du certificat de propriété pour votre bien immobilier. Vérification des droits, extraction et certification auprès de la Conservation.",
    price: 75000,
    status: "disponible",
    isHome: true
  },
  {
    id: 4003,
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800"
    ],
    name: "Morcellement de Terrain",
    description: "Service de morcellement et subdivision de terrain. Constitution du dossier, plan topographique et obtention des nouveaux titres fonciers.",
    price: 350000,
    status: "disponible",
    isTerrain: true
  },
  {
    id: 4004,
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800"
    ],
    name: "Permis de Construire",
    description: "Accompagnement pour l'obtention du permis de construire auprès des services d'urbanisme. Plans, dossier technique et suivi administratif.",
    price: 200000,
    status: "disponible",
    isHome: true
  },
  {
    id: 4005,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
    ],
    name: "Bail d'Habitation",
    description: "Rédaction et enregistrement de contrat de bail d'habitation conforme à la législation gabonaise. Service juridique inclus.",
    price: 50000,
    status: "disponible",
    isHome: true
  },
  {
    id: 4006,
    images: [
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"
    ],
    name: "Certificat d'Urbanisme",
    description: "Obtention du certificat d'urbanisme pour votre projet immobilier. Renseignements sur les règles applicables à votre terrain.",
    price: 40000,
    status: "disponible",
    isTerrain: true
  },
  {
    id: 4007,
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    name: "Acte de Vente Immobilière",
    description: "Rédaction et enregistrement d'acte de vente immobilière. Assistance notariale et inscription à la Conservation Foncière.",
    price: 300000,
    status: "disponible",
    isHome: true
  },
  {
    id: 4008,
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800"
    ],
    name: "Plan Topographique et Bornage",
    description: "Réalisation de plan topographique et opération de bornage par géomètre agréé. Levé de terrain et établissement des limites.",
    price: 250000,
    status: "disponible",
    isTerrain: true
  },
  {
    id: 4009,
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800"
    ],
    name: "Certificat de Conformité",
    description: "Obtention du certificat de conformité pour construction achevée. Inspection, vérification et délivrance du document officiel.",
    price: 150000,
    status: "disponible",
    isHome: true
  },
  {
    id: 4010,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
    ],
    name: "Mainlevée d'Hypothèque",
    description: "Service de levée d'hypothèque sur bien immobilier. Démarches auprès de la Conservation Foncière et radiation de l'inscription.",
    price: 180000,
    status: "disponible",
    isHome: true
  }
];

export default realEstateServices;
