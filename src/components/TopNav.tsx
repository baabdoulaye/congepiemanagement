
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

// Composant de la barre de navigation supérieure
const TopNav = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white z-10 relative">
      {/* Titre avec positionnement ajusté */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <h1 className="text-2xl font-bold text-epie-blue">CONGEPIE</h1>
        </Link>
      </div>
      
      {/* Bouton de connexion */}
      <div className="flex items-center gap-2">
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
