
# CONGEPIE - Gestion des Congés

Application de gestion des congés pour entreprises, permettant aux employés de soumettre des demandes de congés et aux managers de les approuver.

## Fonctionnalités

- Authentification des utilisateurs
- Soumission de demandes de congés
- Approbation/rejet des demandes
- Visualisation du calendrier des congés
- Rapports et statistiques
- Mode jour/nuit
- Interface responsive

## Architecture technique

### Frontend
- React avec TypeScript
- React Router pour la navigation
- Tailwind CSS pour le style
- shadcn/ui pour les composants
- React Query pour la gestion des données

### Backend
- Node.js avec Express
- MongoDB pour la base de données
- JWT pour l'authentification

## Installation

### Prérequis
- Node.js (v14 ou plus)
- MongoDB (local ou Atlas)

### Configuration du frontend
1. Installer les dépendances : `npm install`
2. Démarrer le serveur de développement : `npm run dev`

### Configuration du backend
1. Accéder au dossier backend : `cd backend`
2. Installer les dépendances : `npm install`
3. Configurer le fichier .env avec vos variables d'environnement
4. Démarrer le serveur : `npm run dev`

## Structure du projet

```
congepie/
├── src/              # Code source frontend
│   ├── components/   # Composants React
│   ├── layouts/      # Layouts de l'application
│   ├── pages/        # Pages de l'application
│   ├── hooks/        # Hooks personnalisés
│   ├── types/        # Types TypeScript
│   └── ...
├── backend/          # Code source backend
│   ├── models/       # Modèles MongoDB
│   ├── routes/       # Routes API
│   ├── middlewares/  # Middlewares
│   └── ...
└── ...
```

## Développement

### Mode jour/nuit
L'application intègre un mode jour/nuit réactif qui s'adapte aux préférences de l'utilisateur et peut être changé manuellement.

### Responsive design
L'interface s'adapte automatiquement aux différentes tailles d'écran, y compris les appareils mobiles.
