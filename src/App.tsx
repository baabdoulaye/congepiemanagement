
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RequestLeave from "./pages/leave/RequestLeave";
import LeaveCalendar from "./pages/leave/LeaveCalendar";
import UserManagement from "./pages/admin/UserManagement";
import LeaveReports from "./pages/reports/LeaveReports";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/types/user";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  // Converting enum to string for comparison to fix type error
  const userRole = UserRole.EMPLOYEE;
  const adminRoleStr = UserRole.ADMIN.toString();
  const managerRoleStr = UserRole.MANAGER.toString();
  const userRoleStr = userRole.toString();

  if (userRoleStr !== adminRoleStr && userRoleStr !== managerRoleStr) {
    toast({
      title: "Accès refusé",
      description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

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
          <Route path="/a-propos" element={<About />} />
          <Route 
            path="/admin/utilisateurs" 
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            } 
          />
          <Route path="/connexion" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
