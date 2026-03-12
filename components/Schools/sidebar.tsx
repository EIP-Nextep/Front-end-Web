"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SchoolsSidebar() {
  const [schools, setSchools] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/catalog/schools', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        const arrayData = Array.isArray(data) ? data : [];
        setSchools(arrayData.slice(0, 4));
      });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      {schools.map((school) => (
        <div 
          key={school.id} 
          className="relative rounded-2xl overflow-hidden h-24 group cursor-pointer border border-slate-200 hover:shadow-lg transition-shadow"
        >
          <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end p-2">
            <p className="text-white text-[10px] font-bold leading-tight truncate">{school.name}</p>
          </div>
        </div>
      ))}
      <button 
        onClick={() => router.push('/catalog')}
        className="h-24 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-slate-50"
      >
        <span className="text-2xl font-bold">+</span>
        <span className="text-[10px] font-medium">Voir tout</span>
      </button>
    </div>
  );
}