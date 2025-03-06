
import { LeaveBalance, LeaveType } from "@/types/leave";
import LeaveBalanceCard from "./LeaveBalanceCard";

// Composant d'affichage des soldes de congés
interface LeaveBalanceListProps {
  balances: LeaveBalance[];
  leaveTypes: LeaveType[];
}

const LeaveBalanceList = ({ balances, leaveTypes }: LeaveBalanceListProps) => {
  // Si aucun solde, afficher un message
  if (!balances || balances.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">Aucun solde de congé trouvé</p>
      </div>
    );
  }

  // Fonction pour retrouver un type de congé par son ID
  const getLeaveTypeById = (id: string) => {
    return leaveTypes.find(type => type.id === id) || {
      id: "unknown",
      name: "Type inconnu",
      color: "#999"
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {balances.map(balance => (
        <LeaveBalanceCard
          key={balance.leaveTypeId}
          balance={balance}
          leaveType={getLeaveTypeById(balance.leaveTypeId)}
        />
      ))}
    </div>
  );
};

export default LeaveBalanceList;
