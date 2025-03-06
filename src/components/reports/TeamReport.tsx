
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaveRequest } from "@/types/leave";
import { Department } from "@/types/user";
import { users } from "@/data/mockUsers";

// Propriétés du composant
type TeamReportProps = {
  leaveRequests: LeaveRequest[];
  departments: Department[];
  year: number;
};

// Composant d'affichage des rapports par équipe/département
const TeamReport = ({ leaveRequests, departments, year }: TeamReportProps) => {
  // État pour le mode d'affichage (graphique ou tableau)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  
  // Filtrer les congés pour l'année sélectionnée
  const filteredRequests = leaveRequests.filter(req => 
    new Date(req.startDate).getFullYear() === year
  );
  
  // Calculer les données par département
  const chartData = departments.map(dept => {
    // Trouver les employés de ce département
    const deptEmployees = users.filter(user => user.departmentId === dept.id).map(user => user.id);
    
    // Filtrer les demandes de congés pour ces employés
    const deptRequests = filteredRequests.filter(req => 
      deptEmployees.includes(req.employeeId)
    );
    
    // Calculer le total de jours
    const totalDays = deptRequests.reduce((sum, req) => sum + req.businessDays, 0);
    
    // Calculer la moyenne par employé
    const avgDays = deptEmployees.length > 0 ? (totalDays / deptEmployees.length).toFixed(1) : "0";
    
    return {
      name: dept.name,
      total: totalDays,
      average: parseFloat(avgDays),
      employees: deptEmployees.length
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
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} jours`, '']} />
              <Legend />
              <Bar name="Total jours" dataKey="total" fill="#3db2e7" />
              <Bar name="Moyenne par employé" dataKey="average" fill="#1f9b00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Affichage en mode tableau */}
      {viewMode === 'table' && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Département</TableHead>
              <TableHead>Nombre d'employés</TableHead>
              <TableHead>Total jours</TableHead>
              <TableHead>Moyenne par employé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.employees}</TableCell>
                <TableCell>{item.total} jours</TableCell>
                <TableCell>{item.average} jours</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TeamReport;
