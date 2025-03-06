
import { Home, Calendar, Users, Settings, FileText } from 'lucide-react';
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

// Configuration des éléments du menu
const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    url: "/dashboard"
  },
  {
    title: "Mes congés",
    icon: Calendar,
    url: "/conges"
  },
  {
    title: "Équipe",
    icon: Users,
    url: "/equipe"
  },
  {
    title: "Rapports",
    icon: FileText,
    url: "/rapports"
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "/parametres"
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
                    <a href={item.url} className="flex items-center gap-3 text-gray-600 hover:text-epie-blue transition-colors">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
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
