
// Données de démonstration pour l'application CONGEPIE
// Ce fichier contient des données fictives qui seront remplacées par des données réelles
// provenant de la base de données (MongoDB ou MySQL) dans la version finale

import { LeaveBalance, LeaveRequest, LeaveRequestStatus, LeaveType } from "@/types/leave";
import { addDays, subDays } from "date-fns";

// Types de congés disponibles dans l'application
// Ces données seront configurables par l'administrateur
export const leaveTypes: LeaveType[] = [
  {
    id: "cp",                    // Congés payés standards
    name: "Congés payés",
    color: "#3db2e7",            // Bleu EPIE pour les congés payés
    maxDaysPerYear: 25,          // 25 jours par an selon la convention
    default: true                // Type par défaut dans le formulaire
  },
  {
    id: "rtt",                   // Réduction du temps de travail
    name: "RTT",
    color: "#1f9b00",            // Vert EPIE pour les RTT
    maxDaysPerYear: 11           // 11 jours par an en fonction du temps de travail
  },
  {
    id: "maladie",               // Congés maladie
    name: "Maladie",
    color: "#e74c3c",            // Rouge pour les congés maladie
    requiresJustification: true  // Nécessite un certificat médical
  },
  {
    id: "sans-solde",            // Congés sans solde
    name: "Congé sans solde",
    color: "#f39c12"             // Orange pour les congés sans solde
  },
  {
    id: "maternite",             // Congés maternité
    name: "Maternité",
    color: "#9b59b6",            // Violet pour congés maternité
    requiresJustification: true  // Nécessite un justificatif
  }
];

// Date actuelle pour générer des données relatives
const today = new Date();

// Génération de demandes de congés fictives pour la démonstration
// Ces données seront remplacées par les vraies demandes des utilisateurs
export const leaveRequests: LeaveRequest[] = [
  {
    id: "req1",                  // Demande en attente pour le futur
    employeeId: "emp1",
    leaveTypeId: "cp",
    startDate: addDays(today, 10), // Dans 10 jours
    endDate: addDays(today, 15),   // Pour 5 jours ouvrables
    businessDays: 5,
    status: LeaveRequestStatus.PENDING,
    createdAt: subDays(today, 2),
    updatedAt: subDays(today, 2)
  },
  {
    id: "req2",                  // Demande déjà approuvée (passée)
    employeeId: "emp1",
    leaveTypeId: "rtt",
    startDate: subDays(today, 10), // Il y a 10 jours
    endDate: subDays(today, 10),   // Pour 1 jour
    businessDays: 1,
    status: LeaveRequestStatus.APPROVED,
    createdAt: subDays(today, 15),
    updatedAt: subDays(today, 14)
  },
  {
    id: "req3",                  // Congé maladie récent
    employeeId: "emp1",
    leaveTypeId: "maladie",
    startDate: subDays(today, 30), // Il y a 30 jours
    endDate: subDays(today, 25),   // Pour 4 jours ouvrables
    businessDays: 4,
    reason: "Fièvre et grippe",    // Motif médical
    status: LeaveRequestStatus.APPROVED,
    createdAt: subDays(today, 30),
    updatedAt: subDays(today, 29)
  }
];

// Soldes de congés fictifs pour la démonstration
// Ces données seront calculées automatiquement en fonction des droits et des congés pris
export const leaveBalances: LeaveBalance[] = [
  {
    employeeId: "emp1",          // Solde de congés payés
    leaveTypeId: "cp",
    total: 25,                   // 25 jours accordés au total
    used: 5,                     // 5 jours déjà pris
    scheduled: 0,                // 0 jours programmés et approuvés
    pending: 5,                  // 5 jours en attente de validation
    remaining: 15                // 15 jours encore disponibles
  },
  {
    employeeId: "emp1",          // Solde de RTT
    leaveTypeId: "rtt",
    total: 11,                   // 11 jours de RTT au total
    used: 1,                     // 1 jour déjà pris
    scheduled: 0,                // 0 jours programmés
    pending: 0,                  // 0 jour en attente
    remaining: 10                // 10 jours encore disponibles
  }
];
