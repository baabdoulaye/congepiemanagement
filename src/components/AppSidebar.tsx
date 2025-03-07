
import { Home, Calendar, Users, FileText, ClipboardList } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';

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
  const { state } = useSidebar();
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
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
  );
};

export default AppSidebar;
