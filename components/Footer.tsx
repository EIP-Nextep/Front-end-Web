import { Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl italic">N</span>
            </div>
            <span className="text-xl font-bold text-slate-900">NexTep</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            La première application d'orientation scolaire qui met en relation directe les étudiants et les écoles, sans intermédiaire.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6">Étudiants</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Comment ça marche</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Les écoles</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Conseils d'orientation</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Créer un compte</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6">Écoles</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Devenir partenaire</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Nos offres</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Espace Recruteur</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Témoignages</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6">Légal & Support</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Centre d'aide</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Politique de confidentialité</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Mentions légales</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
        <p>© {currentYear} NexTep. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
            <Globe className="w-3 h-3" />
            <span>Français (FR)</span>
          </div>
          <span className="cursor-pointer hover:text-gray-600">Accessibilité</span>
        </div>
      </div>
    </footer>
  );
}