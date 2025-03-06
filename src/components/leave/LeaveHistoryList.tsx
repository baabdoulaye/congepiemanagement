
import { LeaveRequest, LeaveType } from "@/types/leave";
import LeaveHistoryItem from "./LeaveHistoryItem";

// Composant d'affichage de l'historique des demandes de congés
interface LeaveHistoryListProps {
  requests: LeaveRequest[];
  leaveTypes: LeaveType[];
}

const LeaveHistoryList = ({ requests, leaveTypes }: LeaveHistoryListProps) => {
  // Si aucune demande, afficher un message
  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">Aucune demande de congé trouvée</p>
        <p className="text-sm text-gray-400 mt-1">Vos demandes apparaîtront ici</p>
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
    <div className="space-y-4">
      {requests.map(request => (
        <LeaveHistoryItem
          key={request.id}
          request={request}
          leaveType={getLeaveTypeById(request.leaveTypeId)}
        />
      ))}
    </div>
  );
};

export default LeaveHistoryList;
