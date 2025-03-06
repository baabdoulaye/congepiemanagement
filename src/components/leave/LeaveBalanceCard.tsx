
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalance, LeaveType } from "@/types/leave";
import { Progress } from "@/components/ui/progress";

// Composant d'affichage des soldes de congés
interface LeaveBalanceCardProps {
  balance: LeaveBalance;
  leaveType: LeaveType;
}

const LeaveBalanceCard = ({ balance, leaveType }: LeaveBalanceCardProps) => {
  // Calcul du pourcentage utilisé
  const percentUsed = Math.floor(((balance.used + balance.scheduled) / balance.total) * 100);
  
  return (
    <Card className="hover-lift hover:border-epie-blue transition-smooth">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <div 
            className="h-3 w-3 rounded-full mr-2" 
            style={{ backgroundColor: leaveType.color }}
          />
          {leaveType.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Solde disponible</span>
            <span className="font-semibold">{balance.remaining} jours</span>
          </div>
          
          <Progress value={percentUsed} className="h-2" 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.1)',
              '--tw-progress-fill': leaveType.color 
            } as React.CSSProperties} 
          />
          
          <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
            <span>Utilisés: {balance.used} j</span>
            <span>En attente: {balance.pending} j</span>
            <span>Total: {balance.total} j</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveBalanceCard;
