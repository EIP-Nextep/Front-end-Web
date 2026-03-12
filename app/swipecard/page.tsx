"use client";
import { useState, useEffect } from "react";
import { SchoolCard } from "@/components/Schools/swipe";
import SchoolsSidebar from "@/components/Schools/sidebar";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SwipeCardPage() {
  const [metiers, setMetiers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMetiers = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const userId = JSON.parse(atob(token.split(".")[1])).sub;
        const res = await fetch(
          `http://localhost:8080/api/matching/recommendations/metiers/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) {
          console.error("Erreur API :", res.status, await res.text());
          throw new Error(`Erreur API ${res.status}`);
        }
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

  const handleSwipe = async (dir: "left" | "right") => {
    const currentMetier = metiers[currentIndex];
    const token = localStorage.getItem("authToken");

    setCurrentIndex((prev) => prev + 1);

    try {
      const userId = JSON.parse(atob(token!.split(".")[1])).sub;
      await fetch("http://localhost:8080/api/matching/interactions/metier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          metierId: currentMetier.id,
          liked: dir === "right",
        }),
      });
    } catch (e) {
      console.error("Erreur lors de l'envoi de l'interaction", e);
    }
  };

  const progress =
    metiers.length > 0 ? (currentIndex / metiers.length) * 100 : 0;
  const isDone = currentIndex >= metiers.length;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-[#1d3583] rounded-2xl flex items-center justify-center animate-pulse shadow-lg shadow-blue-900/20">
            <span className="text-white font-black text-xl">N</span>
          </div>
          <p className="text-sm font-semibold text-slate-400 tracking-wide">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Main swipe area */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-8">
        {/* Header */}
        <header className="absolute top-8 left-8 right-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1d3583] tracking-tight">
              Trouve ton métier
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Swipe pour découvrir ce qui te correspond
            </p>
          </div>
          {!isDone && metiers.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 tabular-nums">
                {currentIndex + 1} / {metiers.length}
              </span>
            </div>
          )}
        </header>

        {/* Progress bar */}
        {!isDone && metiers.length > 0 && (
          <div className="absolute top-24 left-8 right-8">
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1d3583] to-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Card or end state */}
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center max-w-md"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#1d3583] mb-3">
                C&apos;est terminé !
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                On a analysé tes préférences pour te proposer les meilleurs
                parcours.
              </p>
              <button
                onClick={() => router.push("/myschools")}
                className="bg-[#1d3583] text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#162b6e] transition-all shadow-lg shadow-blue-900/20 active:scale-95 tracking-wide uppercase"
              >
                Voir mes parcours recommandés →
              </button>
            </motion.div>
          ) : (
            <SchoolCard
              key={metiers[currentIndex]?.id || currentIndex}
              school={metiers[currentIndex]}
              onSwipe={handleSwipe}
            />
          )}
        </AnimatePresence>

        {/* Swipe hint */}
        {!isDone && (
          <div className="absolute bottom-8 flex items-center gap-8 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">← Pas pour moi</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="flex items-center gap-1.5">
              Ça m&apos;intéresse →
            </span>
          </div>
        )}
      </main>

      {/* Sidebar */}
      <aside className="w-[380px] border-l border-slate-100 bg-white/80 backdrop-blur-sm p-8 overflow-y-auto flex flex-col gap-8">
        <div>
          <h2 className="text-lg font-extrabold text-[#1d3583] mb-1">
            Écoles en vue
          </h2>
          <p className="text-xs text-slate-400">Basé sur notre catalogue</p>
        </div>
        <SchoolsSidebar />
      </aside>
    </div>
  );
}
