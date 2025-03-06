
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveRequestForm from "@/components/leave/LeaveRequestForm";
import LeaveHistoryList from "@/components/leave/LeaveHistoryList";
import LeaveBalanceList from "@/components/leave/LeaveBalanceList";
import { leaveBalances, leaveRequests, leaveTypes } from "@/data/mockData";
import { FileTextIcon, HistoryIcon, CalendarIcon } from "lucide-react";
import { LeaveRequest, LeaveRequestStatus } from "@/types/leave";

// Page principale de demande de congés
const RequestLeave = () => {
  // État pour stocker les demandes de congés
  const [requests, setRequests] = useState(leaveRequests);
  
  // Fonction pour ajouter une nouvelle demande
  const handleNewRequest = (formData: any) => {
    // Création d'une nouvelle demande
    const newRequest: LeaveRequest = {
      id: `req${requests.length + 1}`,
      employeeId: "emp1", // ID de l'employé connecté (à remplacer par un système d'authentification)
      leaveTypeId: formData.leaveTypeId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      halfDayStart: formData.halfDayStart,
      halfDayEnd: formData.halfDayEnd,
      businessDays: formData.businessDays,
      reason: formData.reason,
      status: LeaveRequestStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Ajout de la demande à la liste
    setRequests([newRequest, ...requests]);
  };
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des congés</h1>
          <p className="text-lg text-gray-600">
            Demandez vos congés, consultez votre historique et vos soldes
          </p>
        </header>
        
        <Tabs defaultValue="new-request">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="new-request" className="flex gap-2 items-center">
              <CalendarIcon className="h-4 w-4" />
              <span>Nouvelle demande</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex gap-2 items-center">
              <HistoryIcon className="h-4 w-4" />
              <span>Historique</span>
            </TabsTrigger>
            <TabsTrigger value="balances" className="flex gap-2 items-center">
              <FileTextIcon className="h-4 w-4" />
              <span>Mes soldes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-request">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6 text-epie-blue border-b pb-2">
                Nouvelle demande de congé
              </h2>
              <LeaveRequestForm 
                leaveTypes={leaveTypes} 
                onSubmit={handleNewRequest} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6 text-epie-blue border-b pb-2">
                Historique de mes demandes
              </h2>
              <LeaveHistoryList 
                requests={requests} 
                leaveTypes={leaveTypes} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="balances">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6 text-epie-green border-b pb-2">
                Mes soldes de congés
              </h2>
              <LeaveBalanceList 
                balances={leaveBalances} 
                leaveTypes={leaveTypes} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RequestLeave;
