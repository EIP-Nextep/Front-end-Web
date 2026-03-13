"use client";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { MapPin, GraduationCap, Users, Euro, Languages, MessageCircle, Heart, Share2, ArrowLeft } from "lucide-react";

const MOCK_SCHOOLS = [
  { 
    id: 'e1', 
    name: 'ESSEC Business School', 
    description: 'Une approche innovante du business alliant excellence académique et sens de l\'engagement.', 
    about: "L'ESSEC se distingue par sa pédagogie axée sur l'apprentissage par l'expérience. Avec un réseau mondial puissant, l'école prépare les leaders de demain à relever les défis de la complexité et de la transition durable.",
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800', 
    degree: 'Bachelor', 
    price: '22000', 
    location: 'Cergy-Pontoise',
    stats: { admission: '15%', students: '6,500', lang: 'FR, EN' }
  },
  { 
    id: 'h1', 
    name: 'HEC Paris', 
    description: 'Leader mondial de l\'enseignement du management. Excellence académique et réseau international.', 
    about: "HEC Paris est une institution de renommée mondiale. Située sur un campus exceptionnel, elle offre des programmes qui propulsent les étudiants vers les sommets du management et de l'entrepreneuriat.",
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800', 
    degree: 'Master', 
    price: '25000', 
    location: 'Paris',
    stats: { admission: '8%', students: '4,500', lang: 'FR, EN, ES' }
  },
  { 
    id: '31', 
    name: 'Institut Paul Bocuse', 
    description: 'L\'excellence des arts culinaires, de la pâtisserie et du management hôtelier.', 
    about: "L'école forme les futurs dirigeants du secteur de l'hôtellerie-restauration mondiale. Alliant tradition gastronomique et techniques de gestion moderne, elle est une référence absolue dans le domaine.",
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800', 
    degree: 'Bachelor', 
    price: '15000', 
    location: 'Lyon',
    stats: { admission: '20%', students: '1,200', lang: 'FR, EN' }
  },
  { 
    id: '12', 
    name: 'Institut de Robotique Avancée', 
    description: 'Conception et programmation de systèmes robotiques complexes.', 
    about: "À la pointe de l'innovation, cet institut prépare les ingénieurs aux métiers de demain : cobotique, intelligence artificielle embarquée et systèmes autonomes.",
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800', 
    degree: 'Bac+5', 
    price: '5900', 
    location: 'Grenoble',
    stats: { admission: '25%', students: '850', lang: 'FR, EN' }
  },
  { 
    id: '4', 
    name: 'Data Science Institute', 
    description: 'Maîtrisez le Big Data et le Machine Learning avec des experts du secteur.', 
    about: "Une immersion totale dans l'univers de la donnée. Le programme met l'accent sur les applications concrètes de l'IA pour transformer les entreprises.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
    degree: 'Master', 
    price: '5200', 
    location: 'Toulouse',
    stats: { admission: '18%', students: '1,500', lang: 'FR, EN' }
  },
    { 
      id: '1', name: 'Institut du Futur Digital', description: 'Master spécialisé en IA et robotique appliqué aux enjeux climatiques.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800', degree: 'Bac+5', price: '4500', location: 'Paris',
      about: "Un programme pionnier qui fusionne les technologies de pointe avec la préservation de l'environnement. Apprenez à concevoir des systèmes robotiques éco-conçus.",
      stats: { admission: '14%', students: '400', lang: 'FR, EN' }
    },
    { 
      id: '2', name: 'Green Business School', description: 'Leader de la transition écologique et du management durable en Europe.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800', degree: 'Bachelor', price: '3200', location: 'Lyon',
      about: "Formez-vous aux enjeux climatiques de demain tout en maîtrisant les outils de gestion d'entreprise performants. Une approche résolument tournée vers l'économie circulaire.",
      stats: { admission: '22%', students: '1200', lang: 'FR' }
    },
    { 
      id: '3', name: 'Art & Tech Academy', description: 'Fusion entre design créatif et développement Web full-stack.', image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=800', degree: 'Certification', price: '2800', location: 'Bordeaux',
      about: "Le pont entre créativité artistique et rigueur technique. Idéal pour ceux qui veulent maîtriser l'art du développement web moderne et de l'UI/UX design.",
      stats: { admission: '30%', students: '350', lang: 'FR, EN' }
    },
    { 
      id: '4', name: 'Data Science Institute', description: 'Maîtrisez le Big Data et le Machine Learning avec des experts du secteur.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', degree: 'Master', price: '5200', location: 'Toulouse',
      about: "Plongez au cœur des algorithmes prédictifs. Ce programme intensif vous transforme en architecte de la donnée capable de résoudre les problèmes les plus complexes.",
      stats: { admission: '10%', students: '800', lang: 'EN' }
    },
    { 
      id: '5', name: 'CyberSecurity Lab', description: 'Formation intensive pour devenir expert en défense numérique.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', degree: 'Expert', price: '6000', location: 'Lille',
      about: "Une immersion en environnement réel pour anticiper les cyber-menaces. Apprenez à sécuriser les infrastructures critiques à l'échelle mondiale.",
      stats: { admission: '12%', students: '500', lang: 'FR, EN' }
    },
    { 
      id: '6', name: 'Design d\'Interface UX', description: 'Pensez, créez et prototypez les services numériques de demain.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', degree: 'Bachelor', price: '3500', location: 'Nantes',
      about: "Centré sur l'utilisateur, ce cursus permet de concevoir des expériences numériques intuitives et fluides pour tous les supports.",
      stats: { admission: '25%', students: '450', lang: 'FR' }
    },
    { 
      id: '7', name: 'Marketing Digital Pro', description: 'Stratégies d\'acquisition, SEO et growth hacking sur mesure.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', degree: 'Certification', price: '2500', location: 'Strasbourg',
      about: "Maîtrisez les leviers d'acquisition, l'analyse de données et le growth hacking. Devenez le stratège digital que toutes les entreprises s'arrachent.",
      stats: { admission: '40%', students: '600', lang: 'FR' }
    },
    { 
      id: '8', name: 'Cloud Engineering School', description: 'Spécialisation architecture Cloud et déploiement DevOps.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800', degree: 'Bac+5', price: '4800', location: 'Marseille',
      about: "Architecture, scalabilité, cloud computing. Ce programme est conçu pour ceux qui veulent construire l'épine dorsale technologique des entreprises du futur.",
      stats: { admission: '18%', students: '700', lang: 'EN' }
    },
    { 
      id: '10', name: 'Tech pour le Bien Social', description: 'Développer des solutions technologiques pour l\'humanitaire.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800', degree: 'Bachelor', price: '3000', location: 'Rennes',
      about: "Utiliser la technologie pour un impact social positif. Un programme dédié aux porteurs de projets à vocation humanitaire et solidaire.",
      stats: { admission: '35%', students: '300', lang: 'FR' }
    },
    { 
      id: '11', name: 'Académie du Design Graphique', description: 'Maîtrisez la typographie, la mise en page et l\'identité visuelle moderne.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800', degree: 'Bachelor', price: '3800', location: 'Lyon',
      about: "L'excellence visuelle au service de la communication. Un cursus complet pour maîtriser les codes de l'identité de marque moderne.",
      stats: { admission: '20%', students: '550', lang: 'FR' }
    },
    { 
      id: '12', name: 'Institut de Robotique Avancée', description: 'Conception et programmation de systèmes robotiques complexes.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800', degree: 'Bac+5', price: '5900', location: 'Grenoble',
      about: "À la pointe de l'innovation, cet institut prépare les ingénieurs aux métiers de demain : cobotique, intelligence artificielle embarquée et systèmes autonomes.",
      stats: { admission: '15%', students: '400', lang: 'FR, EN' }
    },
    { 
      id: '13', name: 'École de la Finance Durable', description: 'Investissements éthiques et gestion de portefeuille durable.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800', degree: 'Master', price: '4200', location: 'Paris',
      about: "Financez le changement. Ce cursus allie expertise financière de haut niveau et enjeux environnementaux pour une économie responsable.",
      stats: { admission: '12%', students: '900', lang: 'FR, EN' }
    },
    { 
      id: '14', name: 'Data Visualisation Hub', description: 'Transformez des données brutes en histoires visuelles percutantes.', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800', degree: 'Certification', price: '2100', location: 'Nantes',
      about: "Apprenez à rendre la donnée lisible et impactante. La science de la narration visuelle pour les décideurs de demain.",
      stats: { admission: '45%', students: '250', lang: 'FR' }
    },
    { 
      id: '17', name: 'Global Management Academy', description: 'Leadership international et gestion d\'équipes multiculturelles.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800', degree: 'Master', price: '6500', location: 'Paris',
      about: "Développez votre leadership dans un contexte global. Management interculturel, stratégie internationale et gestion d'équipes complexes.",
      stats: { admission: '10%', students: '1100', lang: 'EN, FR' }
    },
    { 
      id: '19', name: 'Institut de Psychologie Cognitive', description: 'Comprenez le comportement humain appliqué aux interfaces numériques.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800', degree: 'Master', price: '3900', location: 'Montpellier',
      about: "L'alliance entre sciences cognitives et design numérique. Comprendre les utilisateurs pour mieux concevoir les systèmes de demain.",
      stats: { admission: '20%', students: '600', lang: 'FR' }
    },
    { 
      id: '22', name: 'Creative Branding Academy', description: 'Développez des identités de marque fortes et narratives visuelles.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', degree: 'Certification', price: '2900', location: 'Lyon',
      about: "Construisez des marques mémorables. Stratégie, storytelling et design d'identité visuelle dans un marché saturé.",
      stats: { admission: '30%', students: '400', lang: 'FR' }
    },
    { 
      id: '23', name: 'École du Design Numérique', description: 'Maîtrisez les outils de prototypage pour le web et le mobile.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800', degree: 'Bachelor', price: '3600', location: 'Nantes',
      about: "De l'idée au produit fini. Maîtrise des outils de prototypage haute fidélité pour des interfaces web et mobile de premier plan.",
      stats: { admission: '22%', students: '500', lang: 'FR' }
    }
  ];

export default function SchoolDetails() {
  const params = useParams();
  const id = params.id;
  const school = MOCK_SCHOOLS.find((s) => s.id === id);
  const router = useRouter();

  if (!school) return <div className="p-20 text-center font-bold">École introuvable...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
      <button
      onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#1d3583] transition-colors group"
      >
        <span className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 bg-white group-hover:border-[#1d3583] group-hover:bg-[#eef2ff] transition-all">
          <ArrowLeft size={15} />
        </span>
        Retour
      </button>
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm mb-8">
          <div className="h-64 w-full relative">
            <img src={school.image} className="w-full h-full object-cover" alt={school.name} />
            <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"><Share2 size={20} /></button>
          </div>

          <div className="px-8 pb-8 relative">
            <div className="absolute -top-12 left-8 w-32 h-32 bg-white rounded-2xl shadow-xl border-4 border-white flex items-center justify-center font-black text-4xl text-[#1d3583]">
                {school.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="pl-40 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900">{school.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-slate-500 text-sm font-bold">
                    <span className="flex items-center gap-1"><MapPin size={16} /> {school.location}</span>
                    <span className="flex items-center gap-1"><GraduationCap size={16} /> {school.degree}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-3 border rounded-xl text-slate-400 hover:text-red-500"><Heart /></button>
                <button className="px-8 py-3 bg-[#f27a2b] text-white font-black rounded-xl hover:bg-[#d96920]">Postuler</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[32px] border border-slate-100">
                <h2 className="text-xl font-black mb-4 flex items-center gap-2"><span className="text-orange-500">💡</span> À propos</h2>
                <p className="text-slate-600 leading-relaxed">{school.about}</p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-black text-lg">En bref</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1d3583]"><Users size={18}/></div>
                        <div><p className="text-[10px] font-bold text-slate-400 uppercase">Admission</p><p className="font-bold">{school.stats.admission}</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1d3583]"><Euro size={18}/></div>
                        <div><p className="text-[10px] font-bold text-slate-400 uppercase">Coût</p><p className="font-bold">{school.price}€ / an</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1d3583]"><Languages size={18}/></div>
                        <div><p className="text-[10px] font-bold text-slate-400 uppercase">Langues</p><p className="font-bold">{school.stats.lang}</p></div>
                    </div>
                </div>
            </div>

            <button
          onClick={() => router.push('/message')}
          className="w-full py-4 bg-[#1d3583] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#162a66]"
          >
          <MessageCircle size={18} /> Démarrer le chat
          </button>
          </div>
        </div>
      </main>

    </div>
  );
}