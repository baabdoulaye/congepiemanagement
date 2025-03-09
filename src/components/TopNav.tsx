
// Composant de la barre de navigation supérieure - Affiche le titre de l'application et le bouton de connexion
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white z-10 relative">
      <div className="flex items-center gap-2 md:ml-0 ml-12">
        <Link to="/">
          <h1 className="text-2xl font-bold text-epie-blue">CONGEPIE</h1>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="hover:bg-epie-blue hover:text-white transition-colors"
        >
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
