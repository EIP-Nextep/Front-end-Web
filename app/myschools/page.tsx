"use client";
import { useEffect, useState } from "react";
import { SchoolCatalogCard } from "@/components/Schools/catalog";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).sub;
  } catch (e) {
    console.error("Erreur décodage token:", e);
    return null;
  }
};

export default function MySchoolsPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalizedCatalog = async () => {
      const token = localStorage.getItem("authToken");
      const userId = getUserIdFromToken();
      if (!token || !userId) return;

      try {
        // 1. Fetch recommended course IDs
        const resIds = await fetch(
          `http://localhost:8080/api/matching/recommendations/courses/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const raw = await resIds.json();
        console.log("Réponse brute API recommendations:", raw);

        if (!resIds.ok) {
          console.error("Erreur API recommendations:", resIds.status, raw);
          setLoading(false);
          return;
        }

        const ids: string[] = Array.isArray(raw)
          ? raw.map((item: any) => (typeof item === "string" ? item : item.id))
          : [];
        if (!ids || ids.length === 0) {
          setLoading(false);
          return;
        }

        // 2. Fetch course details
        const detailsPromises = ids.map((id) =>
          fetch(`http://localhost:8080/api/catalog/courses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            if (!res.ok) return null;
            return res.json();
          }),
        );

        const coursesData = (await Promise.all(detailsPromises)).filter(
          Boolean,
        );
        if (coursesData.length > 0)
          console.log(
            "Exemple de cours reçu:",
            JSON.stringify(coursesData[0], null, 2),
          );

        // 3. Fetch school details for each course that has a schoolId
        const schoolIds = [
          ...new Set(
            coursesData
              .map((c: any) => c.schoolId || c.school_id || c.schoolID)
              .filter(Boolean),
          ),
        ];

        const schoolMap: Record<string, any> = {};

        if (schoolIds.length > 0) {
          const schoolPromises = schoolIds.map((sId: string) =>
            fetch(`http://localhost:8080/api/catalog/schools/${sId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => {
                if (!res.ok) return null;
                return res.json();
              })
              .catch(() => null),
          );

          const schoolsData = await Promise.all(schoolPromises);
          schoolsData.filter(Boolean).forEach((s: any) => {
            schoolMap[s.id] = s;
          });
          console.log("Écoles chargées:", schoolMap);
        }

        // 4. Attach school info to each course
        const enrichedCourses = coursesData.map((course: any) => {
          const sId = course.schoolId || course.school_id || course.schoolID;
          const school = sId ? schoolMap[sId] : null;
          return { ...course, _school: school };
        });

        setCourses(enrichedCourses);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Impossible de charger les détails.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalizedCatalog();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center">
        Chargement de votre catalogue personnalisé...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Erreur : {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Vos parcours recommandés
        </h1>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <SchoolCatalogCard key={course.id} school={course} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            Aucun parcours trouvé pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}
