# 🚀 Backend API - Mintsa Services

Backend sécurisé pour l'application Mintsa Services avec authentification JWT, base de données MongoDB et API RESTful.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Sécurité](#-sécurité)
- [Déploiement](#-déploiement)
- [Contribuer](#-contribuer)

## ✨ Fonctionnalités

### 🔐 Authentification & Autorisation
- **JWT (JSON Web Tokens)** pour l'authentification sécurisée
- **bcrypt** pour le hashage des mots de passe
- **Rôles utilisateur** (admin, user) avec permissions granulaires
- **Refresh tokens** pour une expérience utilisateur fluide
- **Rate limiting** pour prévenir les attaques par force brute

### 🛡️ Sécurité
- **Helmet** pour les headers de sécurité
- **CORS** configuré pour les domaines autorisés
- **Validation des données** avec express-validator
- **Sanitisation des entrées** pour prévenir les injections
- **Rate limiting** par IP et par endpoint
- **Compression** pour optimiser les performances

### 📊 Base de Données
- **MongoDB** avec Mongoose ODM
- **Index optimisés** pour les performances
- **Validation des schémas** intégrée
- **Middleware de hashage** automatique des mots de passe
- **Gestion des erreurs** robuste

### 📝 Logging & Monitoring
- **Morgan** pour les logs HTTP
- **Logs d'erreurs** dans des fichiers séparés
- **Statistiques** de la base de données
- **Monitoring** de la santé du serveur

## 🛠️ Technologies

- **Node.js** (v18+)
- **TypeScript** pour la sécurité des types
- **Express.js** framework web
- **MongoDB** base de données NoSQL
- **Mongoose** ODM pour MongoDB
- **JWT** pour l'authentification
- **bcryptjs** pour le hashage
- **Helmet** pour la sécurité
- **CORS** pour les requêtes cross-origin
- **Morgan** pour les logs
- **Compression** pour l'optimisation

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB (local ou cloud)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer le fichier .env avec vos configurations
```

4. **Compiler TypeScript**
```bash
npm run build
```

5. **Démarrer le serveur**
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` basé sur `.env.example` :

```env
# Configuration du serveur
NODE_ENV=development
PORT=5000

# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/mintsa_services

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Sécurité
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 🔒 Sécurité des clés

**⚠️ IMPORTANT :** Ne jamais commiter les vraies clés dans Git !

- Utilisez des clés JWT longues et aléatoires
- Changez les clés par défaut en production
- Utilisez des variables d'environnement pour les secrets
- Le fichier `.env` est déjà dans `.gitignore`

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/          # Configuration (DB, etc.)
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middlewares (auth, security)
│   ├── models/          # Modèles Mongoose
│   ├── routes/          # Routes API
│   ├── types/           # Types TypeScript
│   ├── utils/           # Utilitaires
│   └── app.ts           # Point d'entrée
├── logs/                # Fichiers de logs
├── dist/                # Code compilé
├── .env.example         # Exemple de configuration
├── .gitignore           # Fichiers ignorés par Git
├── package.json         # Dépendances et scripts
├── tsconfig.json        # Configuration TypeScript
└── README.md           # Documentation
```

## 🔌 API Endpoints

### 🔐 Authentification
```
POST   /api/auth/register     # Inscription
POST   /api/auth/login        # Connexion
POST   /api/auth/refresh      # Rafraîchir token
POST   /api/auth/logout       # Déconnexion
GET    /api/auth/me           # Profil utilisateur
```

### 📦 Produits
```
GET    /api/products          # Liste des produits
GET    /api/products/:id      # Détails d'un produit
POST   /api/products          # Créer un produit (admin)
PUT    /api/products/:id      # Modifier un produit (admin)
DELETE /api/products/:id      # Supprimer un produit (admin)
```

### 👥 Utilisateurs
```
GET    /api/users             # Liste des utilisateurs (admin)
GET    /api/users/:id         # Détails d'un utilisateur
PUT    /api/users/:id         # Modifier un utilisateur
DELETE /api/users/:id         # Supprimer un utilisateur (admin)
```

### 📊 Statistiques
```
GET    /api/stats             # Statistiques du système (admin)
GET    /health                # Santé du serveur
```

## 🛡️ Sécurité

### Mesures implémentées

1. **Authentification JWT**
   - Tokens d'accès avec expiration
   - Tokens de rafraîchissement
   - Validation automatique des tokens

2. **Protection des mots de passe**
   - Hashage bcrypt avec salt
   - Validation de la complexité
   - Protection contre les attaques par force brute

3. **Headers de sécurité**
   - Helmet pour les headers HTTP sécurisés
   - Content Security Policy (CSP)
   - Protection XSS et CSRF

4. **Rate Limiting**
   - Limitation par IP
   - Limitation spécifique pour l'authentification
   - Limitation pour les uploads

5. **Validation des données**
   - Sanitisation des entrées
   - Validation des types
   - Protection contre les injections

6. **CORS**
   - Configuration stricte des origines
   - Gestion des credentials
   - Protection contre les attaques cross-origin

## 🚀 Déploiement

### Production

1. **Variables d'environnement**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mintsa_services
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

2. **Build et démarrage**
```bash
npm run build
npm start
```

### Docker (optionnel)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/app.js"]
```

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Scripts disponibles

```bash
npm run dev          # Démarrage en mode développement
npm run build        # Compilation TypeScript
npm start            # Démarrage en production
npm run test         # Exécution des tests
npm run lint         # Vérification du code
npm run lint:fix     # Correction automatique du code
```

## 🔧 Développement

### Mode développement
```bash
npm run dev
```
Le serveur redémarre automatiquement lors des modifications.

### Tests
```bash
npm test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**⚠️ Note de sécurité :** Ce backend est conçu pour être sécurisé, mais il est recommandé de :
- Changer toutes les clés par défaut
- Utiliser HTTPS en production
- Surveiller régulièrement les logs
- Maintenir les dépendances à jour
