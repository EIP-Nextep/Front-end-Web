"use client";
import React from 'react';
import { LayoutDashboard, BookOpen, Users, Calendar, BarChart, Settings, Bell, Mail } from 'lucide-react';
import { NexTepLogo, NexTepIcon} from "@/components/Logo/nextepLogo";

export default function SchoolDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <NexTepIcon size={40} /> 
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          {['Accueil', 'Formations', 'Étudiants', 'Événements', 'Statistiques', 'Paramètres'].map(item => (
            <a key={item} href="#" className="hover:text-blue-600">{item}</a>
          ))}
        </nav>
        <button className="text-sm font-semibold text-gray-600 hover:text-red-600">Déconnexion</button>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Bonjour, Admin 👋</h2>
        <p className="text-gray-500">Voici l'état de votre campus et l'avancement de vos futurs étudiants.</p>
      </section>

      {/* VUE D'ENSEMBLE (Statistiques rapides) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Élèves matchés" value="1,248" icon={<Users />} />
        <StatCard title="Notifications" value="12" icon={<Bell />} />
        <StatCard title="Alertes événements" value="3" icon={<Calendar />} />
      </div>

      {/* SECTION CENTRALE : Stats & Événements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-bold mb-6">Statistiques & Intérêts</h3>
           {/* Ici, tu insères tes barres de progression */}
           <div className="space-y-4">
             {['Développement Web', 'Cybersécurité', 'Data Science'].map(skill => (
               <div key={skill}>
                 <div className="flex justify-between text-sm mb-1"><span>{skill}</span><span>85%</span></div>
                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-[85%]"></div></div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-bold mb-6">JPO et Salons</h3>
           {/* Liste des événements */}
           <div className="space-y-4">
              <EventItem date="12 NOV" title="Journée Portes Ouvertes - Tech" />
              <EventItem date="28 NOV" title="Salon de l'Étudiant" />
           </div>
        </div>
      </div>

      {/* GESTION DES FORMATIONS */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold mb-6">Gestion des formations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FormationCard title="Bachelor Informatique" level="Bac+3" />
           <FormationCard title="Mastère Cybersécurité" level="Bac+5" />
           <FormationCard title="Mastère IA & Data" level="Bac+5" />
        </div>
      </section>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---
const StatCard = ({title, value, icon}: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">{icon}</div>
    <div><p className="text-sm text-gray-500">{title}</p><p className="text-2xl font-bold">{value}</p></div>
  </div>
);

const EventItem = ({date, title}: any) => (
  <div className="flex items-center gap-4 p-3 border rounded-xl">
    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold">{date}</div>
    <p className="font-semibold text-sm">{title}</p>
  </div>
);

const FormationCard = ({title, level}: any) => (
  <div className="p-5 border rounded-2xl">
    <div className="flex justify-between mb-2">
      <h4 className="font-bold">{title}</h4>
      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">{level}</span>
    </div>
    <p className="text-xs text-gray-400 mb-4">Formation généraliste...</p>
  </div>
);