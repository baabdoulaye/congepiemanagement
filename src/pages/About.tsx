
// Page À propos qui présente l'application CONGEPIE
import MainLayout from '@/layouts/MainLayout';

/**
 * Page d'information qui présente l'application CONGEPIE
 * Cette page expose le but et les fonctionnalités de la plateforme
 */
const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos de CONGEPIE</h1>
        </header>

        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-epie-blue mb-4">Notre plateforme</h2>
            <p className="text-gray-700 leading-relaxed">
              CONGEPIE est l'outil de gestion des congés développé spécifiquement pour EPIE FORMATION. 
              Cette plateforme a été conçue pour simplifier et optimiser la gestion des congés au sein 
              de notre établissement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-epie-blue mb-4">Objectifs</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Simplifier le processus de demande et de validation des congés pour l'ensemble du personnel</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Offrir une vue claire et instantanée des soldes de congés disponibles</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Permettre une planification efficace des absences pour maintenir la continuité des services</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Faciliter le suivi et la gestion administrative des congés</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-epie-blue mb-4">Fonctionnalités principales</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Demande de congés en ligne avec calendrier interactif</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Suivi en temps réel des soldes de congés</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Historique complet des demandes et validations</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 bg-epie-blue rounded-full"></span>
                <p>Tableau de bord personnalisé pour une meilleure visibilité</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
