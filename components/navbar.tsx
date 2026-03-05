import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-white border-b border-slate-50 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#1d3583] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
          <span className="text-white font-black text-xl">N</span>
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tight">NexTep</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
        <Link href="#" className="hover:text-[#1d3583] transition-colors">Comment ça marche</Link>
        <Link href="#" className="hover:text-[#1d3583] transition-colors">Écoles</Link>
        <Link href="#" className="hover:text-[#1d3583] transition-colors">FAQ</Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-sm font-bold text-[#1d3583] hover:underline uppercase tracking-widest">
          Se connecter
        </button>
        <Link href="/signup">
        <button className="bg-[#f27a2b] hover:bg-[#d96920] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all active:scale-95">
          Inscription
        </button>
        </Link>
      </div>
    </nav>
  );
}