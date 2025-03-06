
// Types pour la gestion des utilisateurs

// Rôles disponibles dans l'application
export enum UserRole {
  EMPLOYEE = "employee",    // Employé standard
  MANAGER = "manager",      // Manager d'équipe
  ADMIN = "admin"           // Administrateur
}

// Structure d'un utilisateur
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  departmentId?: string;    // Service/département
  managerId?: string;       // ID du manager (pour les employés)
  avatar?: string;          // URL de l'avatar
  startDate: Date;          // Date d'embauche
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;        // Si le compte est actif
};

// Structure d'un département/service
export type Department = {
  id: string;
  name: string;
  managerId?: string;       // ID du responsable de département
  createdAt: Date;
  updatedAt: Date;
};
