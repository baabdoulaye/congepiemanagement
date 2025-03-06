
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';

// Layout principal de l'application
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
