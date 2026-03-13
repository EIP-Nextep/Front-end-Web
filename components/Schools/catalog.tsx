"use client";
import { useRouter } from 'next/navigation';

export const SchoolCatalogCard = ({ school }: { school: any }) => {
  const router = useRouter();

  const handleLearnMore = () => {
    // Redirige vers la page dynamique : app/catalog/[id]/page.tsx
    router.push(`/catalog/${school.id}`);
  };

  return (
    <div className="group bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image & Badge Location */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={school.image} 
          alt={school.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1d3583] shadow-sm">
          📍 {school.location}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-[#1d3583] transition-colors">
          {school.name}
        </h3>
        <p className="text-sm text-slate-500 mb-6 h-12 line-clamp-2 leading-relaxed">
          {school.description}
        </p>
        
        <div className="flex gap-2 mb-6">
          <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] uppercase font-bold tracking-wider">
            🎓 {school.degree}
          </span>
          <span className="bg-blue-50 text-[#1d3583] px-3 py-1.5 rounded-xl text-[10px] uppercase font-bold tracking-wider">
            💰 {school.price}€
          </span>
        </div>

        <button 
          onClick={handleLearnMore}
          className="w-full py-3.5 bg-[#1d3583] text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#162a66] transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98]"
        >
          En savoir plus
        </button>
      </div>
    </div>
  );
};