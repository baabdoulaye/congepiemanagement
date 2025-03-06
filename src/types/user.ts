
// Types pour la gestion des utilisateurs dans l'application CONGEPIE

// Rôles disponibles dans l'application - définit les niveaux d'accès et permissions
export enum UserRole {
  EMPLOYEE = "employee",    // Employé standard - peut demander des congés, voir son calendrier
  MANAGER = "manager",      // Manager d'équipe - peut approuver/rejeter les demandes de son équipe
  ADMIN = "admin"           // Administrateur - accès complet à toutes les fonctionnalités
}

// Structure d'un utilisateur - contient toutes les informations relatives à un compte utilisateur
export type User = {
  id: string;              // Identifiant unique de l'utilisateur dans le système
  email: string;           // Email professionnel, utilisé pour l'authentification
  firstName: string;       // Prénom de l'utilisateur
  lastName: string;        // Nom de famille de l'utilisateur
  role: UserRole;          // Rôle dans l'application, détermine les permissions
  departmentId?: string;   // Service/département auquel l'utilisateur appartient
  managerId?: string;      // ID du manager direct (pour les employés)
  avatar?: string;         // URL de l'avatar/photo de profil (optionnel)
  startDate: Date;         // Date d'embauche, utilisée pour calculer les droits aux congés
  createdAt: Date;         // Date de création du compte
  updatedAt: Date;         // Date de dernière modification du compte
  isActive: boolean;       // Indique si le compte est actif ou désactivé (ex: départ de l'entreprise)
};

// Structure d'un département/service - organisation hiérarchique de l'entreprise
export type Department = {
  id: string;              // Identifiant unique du département
  name: string;            // Nom du département ou service
  managerId?: string;      // ID du responsable de département (optionnel)
  createdAt: Date;         // Date de création du département
  updatedAt: Date;         // Date de dernière modification des informations
};
