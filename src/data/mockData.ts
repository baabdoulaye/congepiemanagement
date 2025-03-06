
// Données de démonstration pour l'application
import { LeaveBalance, LeaveRequest, LeaveRequestStatus, LeaveType } from "@/types/leave";
import { addDays, subDays } from "date-fns";

// Types de congés disponibles
export const leaveTypes: LeaveType[] = [
  {
    id: "cp",
    name: "Congés payés",
    color: "#3db2e7", // Bleu EPIE
    maxDaysPerYear: 25,
    default: true
  },
  {
    id: "rtt",
    name: "RTT",
    color: "#1f9b00", // Vert EPIE
    maxDaysPerYear: 11
  },
  {
    id: "maladie",
    name: "Maladie",
    color: "#e74c3c",
    requiresJustification: true
  },
  {
    id: "sans-solde",
    name: "Congé sans solde",
    color: "#f39c12"
  },
  {
    id: "maternite",
    name: "Maternité",
    color: "#9b59b6",
    requiresJustification: true
  }
];

// Génération de demandes de congés fictives
const today = new Date();

export const leaveRequests: LeaveRequest[] = [
  {
    id: "req1",
    employeeId: "emp1",
    leaveTypeId: "cp",
    startDate: addDays(today, 10),
    endDate: addDays(today, 15),
    businessDays: 5,
    status: LeaveRequestStatus.PENDING,
    createdAt: subDays(today, 2),
    updatedAt: subDays(today, 2)
  },
  {
    id: "req2",
    employeeId: "emp1",
    leaveTypeId: "rtt",
    startDate: subDays(today, 10),
    endDate: subDays(today, 10),
    businessDays: 1,
    status: LeaveRequestStatus.APPROVED,
    createdAt: subDays(today, 15),
    updatedAt: subDays(today, 14)
  },
  {
    id: "req3",
    employeeId: "emp1",
    leaveTypeId: "maladie",
    startDate: subDays(today, 30),
    endDate: subDays(today, 25),
    businessDays: 4,
    reason: "Fièvre et grippe",
    status: LeaveRequestStatus.APPROVED,
    createdAt: subDays(today, 30),
    updatedAt: subDays(today, 29)
  }
];

// Soldes de congés fictifs
export const leaveBalances: LeaveBalance[] = [
  {
    employeeId: "emp1",
    leaveTypeId: "cp",
    total: 25,
    used: 5,
    scheduled: 0,
    pending: 5,
    remaining: 15
  },
  {
    employeeId: "emp1",
    leaveTypeId: "rtt",
    total: 11,
    used: 1,
    scheduled: 0,
    pending: 0,
    remaining: 10
  }
];
