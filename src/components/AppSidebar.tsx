
import { Home, Calendar, Users, Settings, FileText, ClipboardList, UserCog } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  },
  {
    title: "Équipe",
    icon: Users,
    url: "/equipe"
  }
];

// Éléments du menu Admin
const adminItems = [
  {
    title: "Gestion des utilisateurs",
    icon: UserCog,
    url: "/admin/utilisateurs"
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "/admin/parametres"
  }
];

// Composant de la barre latérale
const AppSidebar = () => {
  return (
    <Sidebar>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-epie-blue">CONGEPIE</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3 text-gray-600 hover:text-epie-blue transition-colors">
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
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3 text-gray-600 hover:text-epie-blue transition-colors">
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
