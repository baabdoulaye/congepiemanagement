
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaveRequest } from "@/types/leave";
import { leaveTypes } from "@/data/mockData";

// Couleurs pour le graphique (en accord avec la charte graphique)
const COLORS = ['#3db2e7', '#1f9b00', '#e74c3c', '#f39c12', '#9b59b6', '#34495e'];

// Propriétés du composant
type TypeReportProps = {
  leaveRequests: LeaveRequest[];
  year: number;
};

// Composant d'affichage des rapports par type de congé
const TypeReport = ({ leaveRequests, year }: TypeReportProps) => {
  // État pour le mode d'affichage (graphique ou tableau)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  
  // Filtrer les congés pour l'année sélectionnée
  const filteredRequests = leaveRequests.filter(req => 
    new Date(req.startDate).getFullYear() === year
  );
  
  // Calculer les données pour le graphique
  const chartData = leaveTypes.map(type => {
    // Compter les jours de congé pour ce type
    const requests = filteredRequests.filter(req => req.leaveTypeId === type.id);
    const totalDays = requests.reduce((sum, req) => sum + req.businessDays, 0);
    
    return {
      name: type.name,
      value: totalDays,
      color: type.color
    };
  }).filter(item => item.value > 0); // Ne garder que les types avec des congés
  
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
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} jours`, 'Jours pris']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Affichage en mode tableau */}
      {viewMode === 'table' && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de congé</TableHead>
              <TableHead>Nombre de jours</TableHead>
              <TableHead>Pourcentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((item, index) => {
              const totalDays = chartData.reduce((sum, item) => sum + item.value, 0);
              const percentage = (item.value / totalDays * 100).toFixed(1);
              
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}></div>
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.value} jours</TableCell>
                  <TableCell>{percentage}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TypeReport;
