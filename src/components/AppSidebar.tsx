
import { useState, useEffect } from 'react';
import { Home, Calendar, FileText, ClipboardList, Menu, X } from 'lucide-react';
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
import { Link, useLocation } from 'react-router-dom';
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
    icon: Home,
    url: "/admin/utilisateurs"
  }
];

// Composant de la barre latérale
const AppSidebar = () => {
  const { state, openMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const isMobile = window.innerWidth < 768;
  
  // Fonction pour afficher le menu sur mobile
  const toggleMobileMenu = () => {
    setOpenMobile(!openMobile);
  };
  
  // Fonction pour fermer le menu sur mobile
  const closeMobileMenu = () => {
    setOpenMobile(false);
  };
  
  // État pour suivre la taille de l'écran
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Effet pour détecter les changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    // Initialiser
    handleResize();
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('resize', handleResize);
    
    // Nettoyer
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
        <SidebarContent className={`${isSmallScreen ? 'bg-black' : 'bg-white'} md:bg-white`}>
          {/* Bouton de fermeture pour mobile */}
          {openMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-50 md:hidden text-white" 
              onClick={closeMobileMenu}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Fermer</span>
            </Button>
          )}
          
          {/* Espace supplémentaire en haut sur mobile */}
          <div className="h-20 md:hidden"></div>
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.url || 
                                  (item.url !== '/' && location.pathname.startsWith(item.url));
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link to={item.url} 
                          className={`flex items-center gap-3 transition-colors ${
                            isSmallScreen 
                              ? "text-white md:text-foreground" 
                              : isActive 
                                ? "text-epie-blue font-semibold" 
                                : "text-foreground hover:text-epie-blue"
                          } ${
                            isActive ? "text-epie-blue font-semibold" : ""
                          }`}>
                          <item.icon className={`h-5 w-5 ${isActive ? "text-epie-blue" : ""}`} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className={isSmallScreen ? "text-white md:text-sidebar-foreground/70" : "text-sidebar-foreground/70"}>
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => {
                  const isActive = location.pathname === item.url || 
                                  (item.url !== '/' && location.pathname.startsWith(item.url));
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link to={item.url} 
                          className={`flex items-center gap-3 transition-colors ${
                            isSmallScreen 
                              ? "text-white md:text-foreground" 
                              : isActive 
                                ? "text-epie-blue font-semibold" 
                                : "text-foreground hover:text-epie-blue"
                          } ${
                            isActive ? "text-epie-blue font-semibold" : ""
                          }`}>
                          <item.icon className={`h-5 w-5 ${isActive ? "text-epie-blue" : ""}`} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
