
// Types pour la gestion des congés

// Type de congé - définit les différents types de congés disponibles dans l'application
export type LeaveType = {
  id: string;                    // Identifiant unique du type de congé
  name: string;                  // Nom affiché du type de congé (ex: "Congés payés", "RTT", "Maladie")
  color: string;                 // Couleur pour l'affichage dans le calendrier et les graphiques
  maxDaysPerYear?: number;       // Nombre maximum de jours par an (optionnel, pour les congés limités)
  requiresJustification?: boolean; // Si un justificatif est requis (ex: certificat médical)
  default?: boolean;             // Si c'est le type de congé proposé par défaut dans le formulaire
};

// Statut d'une demande de congé - représente les différents états possibles d'une demande
export enum LeaveRequestStatus {
  PENDING = "pending",     // En attente de validation par le manager
  APPROVED = "approved",   // Approuvée par le manager
  REJECTED = "rejected",   // Rejetée par le manager
  CANCELLED = "cancelled"  // Annulée par l'employé avant validation
}

// Demande de congé - structure d'une demande complète
export type LeaveRequest = {
  id: string;              // Identifiant unique de la demande
  employeeId: string;      // Identifiant de l'employé qui fait la demande
  leaveTypeId: string;     // Type de congé demandé (référence l'id du LeaveType)
  startDate: Date;         // Date de début du congé
  endDate: Date;           // Date de fin du congé
  halfDayStart?: boolean;  // Si le premier jour est un demi-jour (matin ou après-midi)
  halfDayEnd?: boolean;    // Si le dernier jour est un demi-jour (matin ou après-midi)
  businessDays: number;    // Nombre de jours ouvrés calculés (jours travaillés, hors weekends et jours fériés)
  reason?: string;         // Motif de la demande (obligatoire pour certains types de congés)
  status: LeaveRequestStatus; // Statut actuel de la demande
  createdAt: Date;         // Date de création de la demande
  updatedAt: Date;         // Date de dernière modification
  managerComment?: string; // Commentaire du manager lors de l'approbation/rejet (optionnel)
};

// Solde de congés - suivi du nombre de jours disponibles par type de congé pour un employé
export type LeaveBalance = {
  employeeId: string;      // Identifiant de l'employé concerné
  leaveTypeId: string;     // Type de congé concerné
  total: number;           // Total de jours accordés pour l'année en cours
  used: number;            // Jours déjà utilisés (demandes terminées)
  scheduled: number;       // Jours programmés dans le futur (demandes approuvées)
  pending: number;         // Jours en attente de validation (demandes en cours)
  remaining: number;       // Jours restants disponibles (total - used - scheduled)
};
