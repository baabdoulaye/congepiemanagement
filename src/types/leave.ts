
// Types pour la gestion des congés

// Type de congé
export type LeaveType = {
  id: string;
  name: string;          // Nom du type de congé (ex: "Congés payés", "RTT", "Maladie")
  color: string;         // Couleur pour l'affichage dans le calendrier
  maxDaysPerYear?: number; // Nombre maximum de jours par an (optionnel)
  requiresJustification?: boolean; // Si un justificatif est requis
  default?: boolean;     // Si c'est le type par défaut
};

// Statut d'une demande de congé
export enum LeaveRequestStatus {
  PENDING = "pending",   // En attente
  APPROVED = "approved", // Approuvée
  REJECTED = "rejected", // Rejetée
  CANCELLED = "cancelled" // Annulée par l'employé
}

// Demande de congé
export type LeaveRequest = {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: Date;
  endDate: Date;
  halfDayStart?: boolean; // Si le premier jour est un demi-jour
  halfDayEnd?: boolean;   // Si le dernier jour est un demi-jour
  businessDays: number;   // Nombre de jours ouvrés calculés
  reason?: string;        // Motif (optionnel)
  status: LeaveRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  managerComment?: string; // Commentaire du manager lors de l'approbation/rejet
};

// Solde de congés
export type LeaveBalance = {
  employeeId: string;
  leaveTypeId: string;
  total: number;         // Total de jours accordés
  used: number;          // Jours utilisés
  scheduled: number;     // Jours programmés (demandes approuvées)
  pending: number;       // Jours en attente de validation
  remaining: number;     // Jours restants (total - used - scheduled)
};
