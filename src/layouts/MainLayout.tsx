
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import TopNav from '@/components/TopNav';

// Layout principal de l'application
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <TopNav />
        <div className="flex flex-1 pt-14 md:pt-0"> {/* Ajout de padding-top pour éviter le chevauchement */}
          <AppSidebar />
          <main className="flex-1 p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
