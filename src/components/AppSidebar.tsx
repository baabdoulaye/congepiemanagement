
import { useState } from 'react';
import { Home, Calendar, Users, FileText, ClipboardList, Menu, X } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

// Configuration des éléments du menu
const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    url: "/"
  },
  {
    title: "Mes congés",
    icon: ClipboardList,
    url: "/conges"
  },
  {
    title: "Calendrier",
    icon: Calendar,
    url: "/calendrier"
  },
  {
    title: "Rapports",
    icon: FileText,
    url: "/rapports"
  }
];

// Éléments du menu Admin
const adminItems = [
  {
    title: "Gestion des utilisateurs",
    icon: Users,
    url: "/admin/utilisateurs"
  }
];

// Composant de la barre latérale
const AppSidebar = () => {
  const { state, openMobile, setOpenMobile } = useSidebar();
  
  // Fonction pour afficher le menu sur mobile
  const toggleMobileMenu = () => {
    setOpenMobile(!openMobile);
  };
  
  // Fonction pour fermer le menu sur mobile
  const closeMobileMenu = () => {
    setOpenMobile(false);
  };
  
  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={toggleMobileMenu}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Menu</span>
      </Button>
      
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarContent>
          {/* Bouton de fermeture pour mobile */}
          {openMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-50 md:hidden" 
              onClick={closeMobileMenu}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Fermer</span>
            </Button>
          )}
          
          {/* Espace supplémentaire en haut sur mobile */}
          <div className="h-12 md:hidden"></div>
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-3 text-foreground hover:text-epie-blue transition-colors">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-3 text-foreground hover:text-epie-blue transition-colors">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
