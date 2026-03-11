import { UserPlus, Layers, MessageSquare } from "lucide-react";

const steps = [
  {
    title: "1. Crée ton profil",
    description: "Renseigne tes notes, tes passions et ce que tu recherches pour avoir des recommandations sur-mesure.",
    icon: <UserPlus className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "2. Swipe les écoles",
    description: "Découvre les campus en images. Swipe à droite si tu aimes, à gauche pour passer à l'école suivante.",
    icon: <Layers className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "3. Discute en direct",
    description: "C'est un match ! Pose toutes tes questions directement aux étudiants et conseillers d'admission.",
    icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">Comment ça marche</h3>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Ton avenir, simplifié.</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Une méthode unique et ludique pour t'orienter sans stress, en quelques minutes par jour.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              {step.icon}
            </div>
            <h4 className="text-xl font-bold mb-4">{step.title}</h4>
            <p className="text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}