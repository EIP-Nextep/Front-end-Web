"use client";
import { useRouter } from 'next/navigation';
import { SchoolCatalogCard } from "@/components/Schools/catalog";
import Navbar from "@/components/navbar"; // On importe la Navbar ici

const MOCK_SCHOOLS = [
  { id: '1', name: 'Institut du Futur Digital', description: 'Master spécialisé en IA et robotique appliqué aux enjeux climatiques.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800', degree: 'Bac+5', price: '4500', location: 'Paris' },
  { id: '2', name: 'Green Business School', description: 'Leader de la transition écologique et du management durable en Europe.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800', degree: 'Bachelor', price: '3200', location: 'Lyon' },
  { id: '3', name: 'Art & Tech Academy', description: 'Fusion entre design créatif et développement Web full-stack.', image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=800', degree: 'Certification', price: '2800', location: 'Bordeaux' },
  { id: '4', name: 'Data Science Institute', description: 'Maîtrisez le Big Data et le Machine Learning avec des experts du secteur.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', degree: 'Master', price: '5200', location: 'Toulouse' },
  { id: '5', name: 'CyberSecurity Lab', description: 'Formation intensive pour devenir expert en défense numérique.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', degree: 'Expert', price: '6000', location: 'Lille' },
  { id: '6', name: 'Design d\'Interface UX', description: 'Pensez, créez et prototypez les services numériques de demain.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', degree: 'Bachelor', price: '3500', location: 'Nantes' },
  { id: '7', name: 'Marketing Digital Pro', description: 'Stratégies d\'acquisition, SEO et growth hacking sur mesure.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', degree: 'Certification', price: '2500', location: 'Strasbourg' },
  { id: '8', name: 'Cloud Engineering School', description: 'Spécialisation architecture Cloud et déploiement DevOps.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800', degree: 'Bac+5', price: '4800', location: 'Marseille' },
  { id: '10', name: 'Tech pour le Bien Social', description: 'Développer des solutions technologiques pour l\'humanitaire.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800', degree: 'Bachelor', price: '3000', location: 'Rennes' },
  { id: '11', name: 'Académie du Design Graphique', description: 'Maîtrisez la typographie, la mise en page et l\'identité visuelle moderne.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800', degree: 'Bachelor', price: '3800', location: 'Lyon' },
  { id: '12', name: 'Institut de Robotique Avancée', description: 'Conception et programmation de systèmes robotiques complexes.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800', degree: 'Bac+5', price: '5900', location: 'Grenoble' },
  { id: '13', name: 'École de la Finance Durable', description: 'Investissements éthiques et gestion de portefeuille durable.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800', degree: 'Master', price: '4200', location: 'Paris' },
  { id: '14', name: 'Data Visualisation Hub', description: 'Transformez des données brutes en histoires visuelles percutantes.', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800', degree: 'Certification', price: '2100', location: 'Nantes' },
  { id: '17', name: 'Global Management Academy', description: 'Leadership international et gestion d\'équipes multiculturelles.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800', degree: 'Master', price: '6500', location: 'Paris' },
  { id: '19', name: 'Institut de Psychologie Cognitive', description: 'Comprenez le comportement humain appliqué aux interfaces numériques.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800', degree: 'Master', price: '3900', location: 'Montpellier' },
  { id: '22', name: 'Creative Branding Academy', description: 'Développez des identités de marque fortes et narratives visuelles.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', degree: 'Certification', price: '2900', location: 'Lyon' },
  { id: '23', name: 'École du Design Numérique', description: 'Maîtrisez les outils de prototypage pour le web et le mobile.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800', degree: 'Bachelor', price: '3600', location: 'Nantes' },
  { id: '24', name: 'Motion Design Masters', description: 'Donnez vie à vos designs avec l\'animation 2D et 3D.', image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=800', degree: 'Master', price: '5400', location: 'Bordeaux' },
  { id: '27', name: 'Typographie & Édition Studio', description: 'Maîtrise de la lettre, mise en page et design éditorial.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800', degree: 'Certification', price: '2500', location: 'Lille' },
  { id: '28', name: 'Design de Service Public', description: 'Améliorez les services publics par le design thinking.', image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=800', degree: 'Master', price: '4500', location: 'Rennes' },
  { id: '30', name: 'Art & Design de Mode', description: 'Techniques de création, dessin de mode et éco-conception textile.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800', degree: 'Bac+5', price: '6500', location: 'Paris' },
  { id: 'e1', name: 'ESSEC Business School', description: 'Une approche innovante du business alliant excellence académique et sens de l\'engagement.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800', degree: 'Bachelor', price: '22000', location: 'Cergy-Pontoise' },
  { id: 'h1', name: 'HEC Paris', description: 'Leader mondial de l\'enseignement du management. Excellence académique et réseau international.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800', degree: 'Master', price: '25000', location: 'Paris' },

  { 
    id: '31', 
    name: 'Institut Paul Bocuse', 
    description: 'L\'excellence des arts culinaires, de la pâtisserie et du management hôtelier.', 
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800', 
    degree: 'Bachelor', 
    price: '15000', 
    location: 'Lyon' 
  },
];
export default function Catalog() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar /> {/* Elle s'affichera automatiquement en mode "Alexandre M." */}

      <main className="pt-12 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-12">
          <button onClick={() => router.back()} className="group mb-4 flex items-center gap-2 text-slate-400 hover:text-[#1d3583] font-semibold transition-all">
            <span>←</span> Retour
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Tes parcours <span className="text-[#1d3583]">recommandés</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                Notre algorithme a analysé ton profil. Voici les formations qui correspondent le mieux à tes ambitions.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-8">
                <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase">Matchs</p>
                    <p className="text-xl font-black text-[#1d3583]">24</p>
                </div>
                <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase">Top 1%</p>
                    <p className="text-xl font-black text-[#f27a2b]">3</p>
                </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_SCHOOLS.map((school) => (
            <SchoolCatalogCard key={school.id} school={school as any} />
          ))}
        </div>
      </main>
    </div>
  );
}