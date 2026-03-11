"use client";
import { useState, useEffect } from 'react';
import SchoolCard from "@/components/Schools/swipe";

export default function SwipeCardPage() {
  const [metiers, setMetiers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetiers = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const userId = JSON.parse(atob(token.split('.')[1])).sub;
        const res = await fetch(`http://localhost:8080/api/matching/recommendations/metiers/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
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
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
      <header className="p-8">
        <h1 className="text-3xl font-bold text-blue-900">Metching recommandée</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative">
        {currentIndex < metiers.length ? (
          <SchoolCard 
            school={metiers[currentIndex]} 
            onSwipe={handleSwipe} 
          />
        ) : (
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-700">C'est fini pour aujourd'hui !</h2>
            <p className="text-slate-500 mt-2">Plus de recommandations trouvées.</p>
          </div>
        )}
      </main>
    </div>
  );
}