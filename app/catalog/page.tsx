"use client";

import { useEffect, useState } from 'react';
import { SchoolCatalogCard } from "@/components/Schools/catalog";

interface School {
  id: string;
  name: string;
  description: string;
  image: string;
  degree: string;
  price: string;
  location: string;
}

export default function Catalog() {
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    fetch('http://localhost:8080/api/catalog/schools', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur ${res.status} : Impossible de récupérer les écoles`);
        }
        return res.json();
      })
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (error) return <div className="text-red-500 p-10 font-bold">Erreur : {error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Catalogue des écoles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((school) => (
            <SchoolCatalogCard key={school.id} school={school} />
          ))}
        </div>
      </div>
    </div>
  );
}