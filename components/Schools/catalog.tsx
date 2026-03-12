"use client";
import Link from "next/link";

interface SchoolInfo {
  id: string;
  name?: string;
  image?: string;
  location?: string;
}

interface CourseData {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  degree?: string;
  level?: string;
  price?: string | number;
  location?: string;
  provider?: string;
  duration?: string;
  category?: string;
  domains?: string[];
  schoolId?: string;
  school_id?: string;
  _school?: SchoolInfo | null;
}

export const SchoolCatalogCard = ({ school }: { school: CourseData }) => {
  const displayName = school.name || school.title || "Sans nom";
  const displayImage = school.image || school.imageUrl;
  const displayLocation = school.location || school.provider || null;
  const displayDegree =
    school.degree ||
    school.level ||
    (school.domains && school.domains.length > 0
      ? school.domains.join(", ")
      : null);
  const displayPrice = school.price != null ? `${school.price}€` : null;
  const displayDescription =
    school.description || school.category || school.duration || "";
  const linkedSchool = school._school;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {displayImage ? (
        <img
          src={displayImage}
          alt={displayName}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <span className="text-4xl">🎓</span>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-bold text-xl text-blue-900 mb-1">{displayName}</h3>

        {linkedSchool && (
          <div className="flex items-center gap-2 mb-3">
            {linkedSchool.image && (
              <img
                src={linkedSchool.image}
                alt={linkedSchool.name}
                className="w-5 h-5 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium text-indigo-600">
              {linkedSchool.name}
            </span>
          </div>
        )}

        {displayDescription && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {displayDescription}
          </p>
        )}

        <div className="space-y-2 mb-6">
          {(linkedSchool?.location || displayLocation) && (
            <div className="flex items-center text-xs font-medium text-gray-600">
              <span className="mr-2">📍</span>{" "}
              {linkedSchool?.location || displayLocation}
            </div>
          )}
          {displayDegree && (
            <div className="flex items-center text-xs font-medium text-gray-600">
              <span className="mr-2">🎓</span> {displayDegree}
            </div>
          )}
          {displayPrice && (
            <div className="flex items-center text-xs font-medium text-blue-600">
              <span className="mr-2">💰</span> {displayPrice}
            </div>
          )}
        </div>

        <button className="w-full py-2.5 bg-blue-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors">
          Détails
        </button>
      </div>
    </div>
  );
};
