
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, FileText } from "lucide-react";
import TypeReport from "@/components/reports/TypeReport";
import MonthlyReport from "@/components/reports/MonthlyReport";
import { leaveRequests } from "@/data/mockData";

// Page principale de génération de rapports sur les congés
const LeaveReports = () => {
  // État pour stocker la période sélectionnée (année courante par défaut)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Rapports de congés</h1>
          <p className="text-lg text-gray-600">
            Visualisez et analysez les données relatives aux congés
          </p>
        </header>
        
        {/* Résumé des indicateurs clés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-epie-blue">Total des congés</CardTitle>
              <CardDescription>Demandes acceptées (année courante)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{leaveRequests.length} jours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-epie-green">Taux d'approbation</CardTitle>
              <CardDescription>Pourcentage de demandes approuvées</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">87%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-500">En attente</CardTitle>
              <CardDescription>Demandes en cours de validation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Onglets pour les différents types de rapports */}
        <Tabs defaultValue="by-type">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="by-type" className="flex gap-2 items-center">
              <PieChart className="h-4 w-4" />
              <span>Par type de congé</span>
            </TabsTrigger>
            <TabsTrigger value="by-month" className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              <span>Évolution mensuelle</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="by-type">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6 text-epie-blue border-b pb-2">
                Répartition par type de congé
              </h2>
              <TypeReport 
                leaveRequests={leaveRequests}
                year={selectedYear}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="by-month">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6 text-epie-blue border-b pb-2">
                Évolution mensuelle des congés
              </h2>
              <MonthlyReport 
                leaveRequests={leaveRequests}
                year={selectedYear}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LeaveReports;
