"use client";
import { useEffect, useState } from 'react';
import { SchoolCatalogCard } from "@/components/Schools/catalog";

const getUserIdFromToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1])).sub;
  } catch (e) {
    console.error("Erreur décodage token:", e);
    return null;
  }
};

export default function MySchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalizedCatalog = async () => {
      const token = localStorage.getItem('authToken');
      const userId = getUserIdFromToken();
      if (!token || !userId) return;

      try {
        const resIds = await fetch(`http://localhost:8080/api/matching/recommendations/courses/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const raw = await resIds.json();
        console.log("STATUS:", resIds.status);
        console.log("Réponse brute API recommendations:", raw);

        if (!resIds.ok) {
          console.error("Erreur API recommendations:", resIds.status, raw);
          setLoading(false);
          return;
        }

        const ids: string[] = Array.isArray(raw) ? raw : [];
        if (!ids || ids.length === 0) {
          setLoading(false);
          return;
        }

        const detailsPromises = ids.map(id =>
          fetch(`http://localhost:8080/api/catalog/courses/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(res => {
            console.log(`Course ${id} status:`, res.status);
            if (!res.ok) return null;
            return res.json();
          })
        );

        const data = await Promise.all(detailsPromises);
        setSchools(data.filter(Boolean));
      } catch (err) {
        console.error("Erreur :", err);
        setError("Impossible de charger les détails.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalizedCatalog();
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement de votre catalogue personnalisé...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">Erreur : {error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Vos parcours recommandés</h1>
        {schools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((s) => (
              <SchoolCatalogCard key={s.id} school={s} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">Aucun parcours trouvé pour le moment.</div>
        )}
      </div>
    </div>
  );
}