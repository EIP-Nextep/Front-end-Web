"use client";
import { useState, useEffect } from 'react';
import { SchoolCard } from "@/components/Schools/swipe";
import SchoolsSidebar from "@/components/Schools/sidebar";

import { useRouter } from 'next/navigation';

export default function SwipeCardPage() {
  const [metiers, setMetiers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMetiers = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const userId = JSON.parse(atob(token.split('.')[1])).sub;
        const res = await fetch(`http://localhost:8080/api/matching/recommendations/metiers/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) {
          console.error("Erreur API :", res.status, await res.text());
          throw new Error(`Erreur API ${res.status}`);
        }        const data = await res.json();
        setMetiers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur chargement métiers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetiers();
  }, []);

  const handleSwipe = async (dir: 'left' | 'right') => {
    const currentMetier = metiers[currentIndex];
    const token = localStorage.getItem('authToken');
    
    setCurrentIndex((prev) => prev + 1);

    try {
      const userId = JSON.parse(atob(token!.split('.')[1])).sub;
      await fetch('http://localhost:8080/api/matching/interactions/metier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId, metierId: currentMetier.id, liked: dir === 'right' })
      });
    } catch (e) {
      console.error("Erreur lors de l'envoi de l'interaction", e);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-blue-900">NexTep chargement...</div>;

  return (
    <div className="flex flex-row h-screen w-full bg-slate-50 overflow-hidden">
      
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <header className="absolute top-8 left-8">
          <h1 className="text-3xl font-bold text-blue-900">Matching recommandé</h1>
        </header>

        {currentIndex >= metiers.length ? (
         <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">C'est fini !</h2>
        <button 
      onClick={() => router.push('/myschools')}
      className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
    >
      Voir mes écoles recommandées
    </button>
  </div>
) : (
  <SchoolCard school={metiers[currentIndex]} onSwipe={handleSwipe} />
)}
      </main>

      <aside className="w-96 border-l border-slate-200 bg-white p-8 overflow-y-auto">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Écoles en vue</h2>
        <SchoolsSidebar />
      </aside>
      
    </div>
  );
}