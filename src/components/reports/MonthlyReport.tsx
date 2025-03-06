
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaveRequest } from "@/types/leave";
import { format, getMonth, getYear, differenceInBusinessDays, isWithinInterval } from "date-fns";
import { fr } from "date-fns/locale";

// Propriétés du composant
type MonthlyReportProps = {
  leaveRequests: LeaveRequest[];
  year: number;
};

// Composant d'affichage des rapports par mois
const MonthlyReport = ({ leaveRequests, year }: MonthlyReportProps) => {
  // État pour le mode d'affichage (graphique ou tableau)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  
  // Noms des mois en français
  const months = Array.from({ length: 12 }, (_, i) => {
    return format(new Date(year, i, 1), 'MMMM', { locale: fr });
  });
  
  // Calculer les données mensuelles des congés
  const chartData = months.map((month, index) => {
    // Pour chaque mois, calculer le nombre de jours de congé
    const monthStart = new Date(year, index, 1);
    const monthEnd = new Date(year, index + 1, 0);
    
    // Compter les jours de congé pour ce mois
    let totalDays = 0;
    
    leaveRequests.forEach(request => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      
      // Si les dates de congé chevauchent le mois en cours
      if (
        (isWithinInterval(startDate, { start: monthStart, end: monthEnd }) ||
        isWithinInterval(endDate, { start: monthStart, end: monthEnd })) ||
        (startDate <= monthStart && endDate >= monthEnd)
      ) {
        // Calculer l'intersection des périodes
        const periodStart = startDate < monthStart ? monthStart : startDate;
        const periodEnd = endDate > monthEnd ? monthEnd : endDate;
        
        // Ajouter les jours ouvrés dans cette période
        totalDays += differenceInBusinessDays(periodEnd, periodStart) + 1;
      }
    });
    
    return {
      name: month.charAt(0).toUpperCase() + month.slice(1),
      jours: totalDays
    };
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {/* Sélecteur de mode d'affichage */}
        <Select
          value={viewMode}
          onValueChange={(value) => setViewMode(value as 'chart' | 'table')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mode d'affichage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chart">Graphique</SelectItem>
            <SelectItem value="table">Tableau</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Affichage en mode graphique */}
      {viewMode === 'chart' && (
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} jours`, 'Jours de congé']} />
              <Legend />
              <Line type="monotone" name="Jours de congé" dataKey="jours" stroke="#3db2e7" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Affichage en mode tableau */}
      {viewMode === 'table' && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mois</TableHead>
              <TableHead>Jours de congé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.jours} jours</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MonthlyReport;
