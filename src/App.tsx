
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RequestLeave from "./pages/leave/RequestLeave";
import LeaveCalendar from "./pages/leave/LeaveCalendar";
import UserManagement from "./pages/admin/UserManagement";
import LeaveReports from "./pages/reports/LeaveReports";

// Création du client de requêtes pour React Query
const queryClient = new QueryClient();

// Point d'entrée principal de l'application
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/conges" element={<RequestLeave />} />
          <Route path="/calendrier" element={<LeaveCalendar />} />
          <Route path="/rapports" element={<LeaveReports />} />
          <Route path="/admin/utilisateurs" element={<UserManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
