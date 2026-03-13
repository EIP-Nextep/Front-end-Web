"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell } from "lucide-react";
import { NexTepIcon, NexTepLogo } from "@/components/Logo/nextepLogo";

export default function Navbar() {
  const pathname = usePathname();
  
  const isConnected = pathname.includes("/catalog") || pathname.includes("/swipe");

  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-white border-b border-slate-50 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
      <NexTepIcon size={40} />
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
        <Link href="#" className="hover:text-[#1d3583] transition-colors">Comment ça marche</Link>
        <Link href="/catalog" className={`transition-colors ${pathname === '/catalog' ? 'text-[#1d3583]' : 'hover:text-[#1d3583]'}`}>
          Écoles
        </Link>        
        <Link href="#" className="hover:text-[#1d3583] transition-colors">FAQ</Link>
      </div>

      <div className="flex items-center gap-6">
        {!isConnected ? (
          <>
            <Link href="/signin">
              <button className="text-sm font-bold text-[#1d3583] hover:underline uppercase tracking-widest">Se connecter</button>
            </Link>
            <Link href="/signup">
              <button className="bg-[#f27a2b] hover:bg-[#d96920] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                Inscription
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <button className="text-slate-400 hover:text-[#1d3583] transition-colors relative">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f27a2b] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-none">Alexandre M.</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Étudiant</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 group-hover:border-[#1d3583] transition-colors">
                <User size={18} className="text-slate-600" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}