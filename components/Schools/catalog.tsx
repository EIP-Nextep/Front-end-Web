"use client";
import Link from "next/link";

interface School {
  id: string;
  name: string;
  description: string;
  image: string;
  degree: string;
  price: string;
  location: string;
}

export const SchoolCatalogCard = ({ school }: { school: School }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
    <img src={school.image} alt={school.name} className="h-48 w-full object-cover" />
    <div className="p-5">
      <h3 className="font-bold text-xl text-blue-900 mb-2">{school.name}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{school.description}</p>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-xs font-medium text-gray-600">
          <span className="mr-2">📍</span> {school.location}
        </div>
        <div className="flex items-center text-xs font-medium text-gray-600">
          <span className="mr-2">🎓</span> {school.degree}
        </div>
        <div className="flex items-center text-xs font-medium text-blue-600">
          <span className="mr-2">💰</span> {school.price}
        </div>
      </div>

      <button className="w-full py-2.5 bg-blue-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors">
        Détails
      </button>
    </div>
  </div>
);