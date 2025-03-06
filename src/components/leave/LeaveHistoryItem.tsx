
import { Badge } from "@/components/ui/badge";
import { 
  LeaveRequest, 
  LeaveRequestStatus, 
  LeaveType 
} from "@/types/leave";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, Clock, XCircle } from "lucide-react";

// Composant d'affichage d'une demande de congé dans l'historique
interface LeaveHistoryItemProps {
  request: LeaveRequest;
  leaveType: LeaveType;
}

const LeaveHistoryItem = ({ request, leaveType }: LeaveHistoryItemProps) => {
  // Configuration des badges de statut
  const statusConfig = {
    [LeaveRequestStatus.PENDING]: {
      text: "En attente",
      variant: "outline" as const,
      icon: Clock,
    },
    [LeaveRequestStatus.APPROVED]: {
      text: "Approuvé",
      variant: "success" as const,
      icon: CheckCircle,
    },
    [LeaveRequestStatus.REJECTED]: {
      text: "Refusé",
      variant: "destructive" as const,
      icon: XCircle,
    },
    [LeaveRequestStatus.CANCELLED]: {
      text: "Annulé",
      variant: "secondary" as const,
      icon: XCircle,
    },
  };

  const config = statusConfig[request.status];
  
  return (
    <div className="p-4 border rounded-md mb-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium flex items-center">
            <div 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: leaveType.color }}
            />
            {leaveType.name}
          </h4>
          <div className="text-sm text-gray-500">
            Du {format(request.startDate, 'dd MMMM yyyy', { locale: fr })} au{' '}
            {format(request.endDate, 'dd MMMM yyyy', { locale: fr })}
          </div>
        </div>
        <Badge variant={config.variant} className="flex gap-1 items-center">
          <config.icon className="h-3 w-3" />
          <span>{config.text}</span>
        </Badge>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          {request.businessDays} jour{request.businessDays > 1 ? 's' : ''}
        </span>
        <span className="text-gray-500">
          Demande créée le {format(request.createdAt, 'dd/MM/yyyy', { locale: fr })}
        </span>
      </div>
      
      {request.reason && (
        <div className="mt-2 text-sm border-t pt-2">
          <span className="text-gray-700">Motif: </span>
          {request.reason}
        </div>
      )}
    </div>
  );
};

export default LeaveHistoryItem;
