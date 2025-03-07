
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Composant pour basculer entre le mode jour et nuit
const ThemeToggle = () => {
  // État pour suivre le thème actuel
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { toast } = useToast();

  // Effet pour charger la préférence de thème au chargement
  useEffect(() => {
    // Vérifie si un thème est stocké dans localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si un thème est enregistré ou si l'utilisateur préfère le mode sombre au niveau système
    if (savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      // Passer au mode jour
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast({
        title: "Mode jour activé",
        description: "L'interface est maintenant en mode jour",
      });
    } else {
      // Passer au mode nuit
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast({
        title: "Mode nuit activé",
        description: "L'interface est maintenant en mode nuit",
      });
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} title={isDarkMode ? "Passer en mode jour" : "Passer en mode nuit"}>
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
