import { X, Heart, ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h1 className="text-5xl lg:text-7xl font-black text-[#1e293b] leading-[1.1]">
          Trouve l'école de <br />
          tes rêves en un <br />
          <span className="text-blue-600 italic">swipe</span>.
        </h1>
        <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
          Fini les salons étudiants ennuyeux. Découvre, matche et discute avec les meilleures écoles pour trouver ta voie.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-[#1d3583] hover:bg-[#152a66] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-xl shadow-blue-900/20">
            Commencer gratuitement <ArrowRight size={20} />
          </button>
          <button className="border-2 border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all">
            Espace Écoles
          </button>
        </div>
      </div>

      <div className="relative h-[550px] w-full flex items-center justify-center">
        <div className="absolute w-[320px] h-[450px] bg-white border border-slate-100 rounded-[2.5rem] rotate-6 shadow-sm translate-x-4"></div>
        
        <div className="relative w-[340px] h-[500px] bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col -rotate-3 hover:rotate-0 transition-all duration-500 group cursor-pointer">
          <div className="h-[60%] w-full bg-slate-200 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
              alt="Epitech Campus" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Top Match 98%</span>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow bg-white">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Epitech</h3>
              <p className="text-sm text-slate-400 mt-2 leading-snug font-medium line-clamp-2">
                L'école de l'innovation et de l'expertise informatique. Une pédagogie par projet unique.
              </p>
            </div>
            <div className="flex justify-center gap-6 pt-4">
              <button className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all active:scale-90">
                <X size={28} strokeWidth={3} />
              </button>
              <button className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-orange-500 hover:bg-orange-50 hover:scale-110 transition-all active:scale-90">
                <Heart size={28} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-white py-20 border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-10 flex flex-wrap justify-center gap-16 md:gap-32">
        <div className="text-center">
          <h2 className="text-5xl font-black text-[#1d3583] mb-2 tracking-tighter">500+</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Écoles Partenaires</p>
        </div>
        <div className="text-center">
          <h2 className="text-5xl font-black text-[#1d3583] mb-2 tracking-tighter">120k</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Matchs Réalisés</p>
        </div>
        <div className="text-center">
          <h2 className="text-5xl font-black text-[#1d3583] mb-2 tracking-tighter">98%</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">D'étudiants Satisfaits</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsSection />
    </div>
  );
}