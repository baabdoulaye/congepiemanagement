
# CONGEPIE - Gestion des Congés

Application de gestion des congés pour entreprises, permettant aux employés de soumettre des demandes de congés et aux managers de les approuver.

## Fonctionnalités

- Authentification des utilisateurs
- Soumission de demandes de congés
- Approbation/rejet des demandes
- Visualisation du calendrier des congés
- Rapports et statistiques
- Interface responsive

## Architecture technique

### Architecture globale

CONGEPIE est une application web fullstack suivant une architecture client-serveur :

- **Frontend** : Application React SPA (Single Page Application) communiquant avec le backend via une API REST
- **Backend** : Serveur Express.js exposant des endpoints RESTful
- **Base de données** : MySQL pour le stockage persistant des données

### Frontend

- **Framework** : React avec TypeScript
- **Routage** : React Router pour la navigation entre les pages
- **Styling** : Tailwind CSS pour le design responsive et les composants UI
- **UI Components** : shadcn/ui pour les composants réutilisables
- **State Management** : React Query pour la gestion des données, des requêtes API et du cache
- **Layout** : Responsive design avec support mobile, tablette et desktop

### Backend

- **Framework** : Node.js avec Express
- **ORM** : Sequelize pour l'accès à la base de données et la gestion des modèles
- **Authentification** : JWT (JSON Web Tokens) pour la gestion sécurisée des sessions
- **Validation** : Validation des données à l'entrée via middlewares
- **Emails** : Envoi de notifications par email via Nodemailer

### Base de données

- **SGBD** : MySQL (v8.0+)
- **Modèles principaux** :
  - Users (utilisateurs)
  - Departments (départements)
  - Leaves (demandes de congés)
  - LeaveBalances (soldes de congés)

### Diagramme des relations

```
User 1:N Leaves (Un utilisateur peut avoir plusieurs demandes de congés)
User 1:N LeaveBalances (Un utilisateur a plusieurs soldes par type de congés)
Department 1:N Users (Un département contient plusieurs utilisateurs)
User 1:N User (Relation manager-employés)
```

## Installation

### Prérequis
- Node.js (v14 ou plus)
- MySQL (v8.0 ou plus)

### Configuration du frontend
1. Installer les dépendances : `npm install`
2. Démarrer le serveur de développement : `npm run dev`

### Configuration du backend
1. Accéder au dossier backend : `cd backend`
2. Installer les dépendances : `npm install`
3. Configurer le fichier `.env` avec vos variables d'environnement :
   ```
   DB_HOST=localhost
   DB_USER=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=congepie_db
   JWT_SECRET=votre_cle_secrete
   ```
4. Initialiser la base de données : `npm run db:setup`
5. Démarrer le serveur : `npm run dev`

## Structure du projet

```
congepie/
├── src/                    # Code source frontend
│   ├── components/         # Composants React réutilisables
│   │   ├── ui/             # Composants UI de base (shadcn/ui)
│   │   ├── leave/          # Composants liés aux congés
│   │   ├── reports/        # Composants de visualisation des rapports
│   │   └── users/          # Composants de gestion des utilisateurs
│   ├── layouts/            # Layouts de l'application
│   ├── pages/              # Pages principales de l'application
│   │   ├── admin/          # Pages d'administration
│   │   ├── auth/           # Pages d'authentification
│   │   ├── leave/          # Pages de gestion des congés
│   │   └── reports/        # Pages de rapports
│   ├── hooks/              # Hooks personnalisés
│   ├── types/              # Types TypeScript
│   ├── data/               # Données mock pour le développement
│   └── lib/                # Utilitaires et fonctions helpers
├── backend/                # Code source backend
│   ├── models/             # Modèles Sequelize
│   ├── routes/             # Routes API
│   ├── controllers/        # Contrôleurs pour la logique métier
│   ├── middlewares/        # Middlewares personnalisés
│   ├── utils/              # Fonctions utilitaires
│   └── scripts/            # Scripts pour l'initialisation
└── ...
```

## Flux des données

### Authentification
1. L'utilisateur saisit ses identifiants sur la page de connexion
2. Le frontend envoie une requête à l'API d'authentification
3. Le backend vérifie les identifiants et renvoie un JWT
4. Le frontend stocke le JWT et l'utilise pour les requêtes ultérieures

### Demande de congés
1. L'utilisateur remplit le formulaire de demande
2. Le frontend envoie la demande à l'API
3. Le backend valide la demande, calcule les jours ouvrés et met à jour les soldes
4. Le manager est notifié et peut approuver/rejeter la demande

### Rapports
1. L'utilisateur sélectionne le type de rapport
2. Le frontend récupère les données nécessaires via l'API
3. Les données sont transformées et affichées sous forme de graphiques

### Responsive design
L'interface s'adapte automatiquement aux différentes tailles d'écran, y compris les appareils mobiles.

### Sécurité
- Authentification par JWT
- Validation des entrées utilisateur
- Protection contre les injections SQL via ORM
- Permissions basées sur les rôles
