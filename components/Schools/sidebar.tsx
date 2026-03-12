"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolsSidebar() {
  const [schools, setSchools] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:8080/api/catalog/schools", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const arrayData = Array.isArray(data) ? data : [];
        setSchools(arrayData.slice(0, 5));
      });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {schools.map((school) => (
        <div
          key={school.id}
          className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
            {school.image ? (
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
                <span className="text-lg">🏫</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-700 truncate group-hover:text-[#1d3583] transition-colors">
              {school.name}
            </p>
            {school.location && (
              <p className="text-[11px] text-slate-400 truncate">
                📍 {school.location}
              </p>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={() => router.push("/catalog")}
        className="flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#1d3583] hover:text-[#1d3583] transition-all group"
      >
        <span className="text-lg font-bold">+</span>
        <span className="text-xs font-semibold">Voir le catalogue</span>
      </button>
    </div>
  );
}
