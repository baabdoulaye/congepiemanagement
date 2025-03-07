
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { UserRound } from 'lucide-react';

// Composant de la barre de navigation supérieure
const TopNav = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Logo et titre */}
      <div className="flex items-center gap-2">
        <img src="/epie-logo.svg" alt="EPIE Formation" className="h-8 w-auto" />
        <h1 className="text-2xl font-bold text-epie-blue">CONGEPIE</h1>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="sm" asChild>
          <Link to="/connexion">
            <UserRound className="mr-2 h-4 w-4" />
            Connexion
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
