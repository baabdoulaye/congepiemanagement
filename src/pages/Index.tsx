
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bienvenue sur CONGEPIE
          </h1>
          <p className="text-lg text-gray-600">
            Gérez vos congés simplement et efficacement
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-epie-blue">
              Accès rapide
            </h2>
            <div className="space-y-4">
              <Button className="w-full justify-start bg-epie-blue hover:bg-epie-blue-dark">
                <Calendar className="mr-2 h-5 w-5" />
                Demander un congé
              </Button>
              {/* Autres boutons d'accès rapide à ajouter */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-epie-green">
              Mes congés
            </h2>
            <div className="text-gray-600">
              <p>Chargement de vos congés...</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
