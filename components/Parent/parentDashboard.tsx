"use client";
import { NexTepIcon, NexTepLogo } from "@/components/Logo/nextepLogo";

const PersonalityTestCard = () => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
    <h3 className="font-bold text-lg mb-4">Résultats du Test de Personnalité</h3>
    <div className="space-y-4">
      <div><div className="flex justify-between text-sm mb-1"><span className="font-medium">Créativité</span><span>92%</span></div><div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-blue-600 rounded-full w-[92%]"></div></div></div>
      <div><div className="flex justify-between text-sm mb-1"><span className="font-medium">Logique</span><span>78%</span></div><div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-orange-400 rounded-full w-[78%]"></div></div></div>
    </div>
  </div>
);

const SchoolRecommendations = () => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
    <h3 className="font-bold text-lg mb-4">Écoles & Filières recommandées</h3>
    <div className="space-y-3">
        <div className="p-4 border rounded-2xl flex justify-between items-center"><div><p className="font-bold">Bachelor Design Numérique</p><p className="text-xs text-slate-400">Paris</p></div><span className="text-green-600 font-bold text-sm">98% COMPATIBILITÉ</span></div>
    </div>
  </div>
);



const ImportantDates = () => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
    <h3 className="font-bold text-lg mb-4">Dates Importantes</h3>
    <div className="space-y-4 text-sm">
        <p className="border-l-2 border-blue-500 pl-3"><strong>19 Mars</strong> - JPO École du Digital</p>
        <p className="border-l-2 border-orange-500 pl-3"><strong>10 Mai</strong> - Clôture des vœux</p>
    </div>
  </div>
);

const KeyStatistics = () => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
    <h3 className="font-bold text-lg mb-4">Statistiques Clés</h3>
    <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xl font-black text-blue-900">92%</p><p className="text-[10px] uppercase">Insertion</p></div>
        <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xl font-black text-blue-900">34k€</p><p className="text-[10px] uppercase">Salaire</p></div>
    </div>
  </div>
);

const HelpWidget = () => (
  <div className="bg-blue-600 p-6 rounded-3xl text-white">
    <h3 className="font-bold mb-2">Besoin d'aide ?</h3>
    <p className="text-sm opacity-80 mb-4">Contactez un conseiller pour faire le point.</p>
    <button className="w-full py-2 bg-white text-blue-600 rounded-xl font-bold text-sm">Contacter</button>
  </div>
);

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-[#FDFBF9] p-8">
      <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
      <NexTepIcon size={40} />
      </div>         
    <div className="flex items-center gap-4">
            <span className="font-bold text-sm">Sophie Martin</span>
            <div className="w-10 h-10 rounded-full bg-slate-300"></div>
         </div>
      </header>

      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-bold mb-2">Bonjour Sophie, l'avenir de Thomas est entre de bonnes mains.</h2>
           <p className="text-slate-500">Retrouvez ici toutes les informations clés pour accompagner votre enfant.</p>
           <div className="flex gap-8 mt-6">
              <div><span className="text-2xl font-black text-blue-600">85%</span><p className="text-sm font-medium">PROFIL COMPLÉTÉ</p></div>
              <div><span className="text-2xl font-black text-blue-600">3</span><p className="text-sm font-medium">CANDIDATURES EN COURS</p></div>
           </div>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/3069/3069172.png" className="w-32" alt="Owl" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <PersonalityTestCard />
           <SchoolRecommendations />
        </div>
        <div className="space-y-8">
           <ImportantDates />
           <KeyStatistics />
           <HelpWidget />
        </div>
      </div>
    </div>
  );
}