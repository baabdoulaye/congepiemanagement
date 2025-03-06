
// Données utilisateurs de démonstration
import { User, UserRole, Department } from "@/types/user";
import { subMonths, subYears } from "date-fns";

// Départements fictifs
export const departments: Department[] = [
  {
    id: "dept1",
    name: "Administratif",
    managerId: "user2",
    createdAt: subYears(new Date(), 3),
    updatedAt: subYears(new Date(), 3)
  },
  {
    id: "dept2",
    name: "Formation",
    managerId: "user4",
    createdAt: subYears(new Date(), 3),
    updatedAt: subYears(new Date(), 3)
  },
  {
    id: "dept3",
    name: "Commercial",
    managerId: "user6", 
    createdAt: subYears(new Date(), 3),
    updatedAt: subYears(new Date(), 3)
  }
];

// Utilisateurs fictifs
export const users: User[] = [
  {
    id: "user1",
    email: "admin@epie-formation.fr",
    firstName: "Thomas",
    lastName: "Durand",
    role: UserRole.ADMIN,
    departmentId: "dept1",
    startDate: subYears(new Date(), 5),
    createdAt: subYears(new Date(), 5),
    updatedAt: subMonths(new Date(), 2),
    isActive: true
  },
  {
    id: "user2",
    email: "marie.dubois@epie-formation.fr",
    firstName: "Marie",
    lastName: "Dubois",
    role: UserRole.MANAGER,
    departmentId: "dept1",
    startDate: subYears(new Date(), 4),
    createdAt: subYears(new Date(), 4),
    updatedAt: subMonths(new Date(), 3),
    isActive: true
  },
  {
    id: "user3",
    email: "paul.martin@epie-formation.fr",
    firstName: "Paul",
    lastName: "Martin",
    role: UserRole.EMPLOYEE,
    departmentId: "dept1",
    managerId: "user2",
    startDate: subYears(new Date(), 2),
    createdAt: subYears(new Date(), 2),
    updatedAt: subMonths(new Date(), 6),
    isActive: true
  },
  {
    id: "user4",
    email: "sophie.bernard@epie-formation.fr",
    firstName: "Sophie",
    lastName: "Bernard",
    role: UserRole.MANAGER,
    departmentId: "dept2",
    startDate: subYears(new Date(), 3),
    createdAt: subYears(new Date(), 3),
    updatedAt: subMonths(new Date(), 1),
    isActive: true
  },
  {
    id: "user5",
    email: "jean.robert@epie-formation.fr",
    firstName: "Jean",
    lastName: "Robert",
    role: UserRole.EMPLOYEE,
    departmentId: "dept2",
    managerId: "user4",
    startDate: subYears(new Date(), 1),
    createdAt: subYears(new Date(), 1),
    updatedAt: subMonths(new Date(), 2),
    isActive: true
  },
  {
    id: "user6",
    email: "claire.dupont@epie-formation.fr",
    firstName: "Claire",
    lastName: "Dupont",
    role: UserRole.MANAGER,
    departmentId: "dept3",
    startDate: subYears(new Date(), 2),
    createdAt: subYears(new Date(), 2),
    updatedAt: subMonths(new Date(), 4),
    isActive: true
  }
];

// Fonction pour obtenir le nom complet d'un utilisateur
export const getUserFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

// Fonction pour obtenir le département d'un utilisateur
export const getUserDepartment = (user: User): Department | undefined => {
  return departments.find(dept => dept.id === user.departmentId);
};

// Fonction pour obtenir le manager d'un utilisateur
export const getUserManager = (user: User): User | undefined => {
  if (!user.managerId) return undefined;
  return users.find(u => u.id === user.managerId);
};

// Fonction pour obtenir les employés sous la responsabilité d'un manager
export const getManagerEmployees = (managerId: string): User[] => {
  return users.filter(user => user.managerId === managerId && user.isActive);
};
