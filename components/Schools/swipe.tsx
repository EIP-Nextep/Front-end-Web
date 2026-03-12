"use client";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

interface SchoolCardProps {
  school: {
    name: string;
    description: string;
    image?: string;
    degree?: string;
    price?: string;
    domains?: string[];
  };
  onSwipe: (direction: "left" | "right") => void;
}

export const SchoolCard = ({ school, onSwipe }: SchoolCardProps) => {
  if (!school) {
    return (
      <div className="w-full max-w-[420px] h-[540px] bg-slate-100 rounded-3xl animate-pulse" />
    );
  }

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);

  const likeBg = useTransform(
    x,
    [30, 150],
    ["rgba(34,197,94,0)", "rgba(34,197,94,0.08)"],
  );
  const nopeBg = useTransform(
    x,
    [-30, -150],
    ["rgba(239,68,68,0)", "rgba(239,68,68,0.08)"],
  );

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, opacity }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_: any, info: PanInfo) => {
        if (info.offset.x > 100) onSwipe("right");
        else if (info.offset.x < -100) onSwipe("left");
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileTap={{ cursor: "grabbing" }}
      className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden cursor-grab select-none"
    >
      {/* Like / Nope overlays */}
      <motion.div
        style={{ opacity: likeOpacity, backgroundColor: likeBg }}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <div className="border-[5px] border-green-500 text-green-500 px-8 py-3 rounded-2xl font-black text-4xl -rotate-12 bg-white/90 shadow-lg">
          OUI ✓
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: nopeOpacity, backgroundColor: nopeBg }}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <div className="border-[5px] border-red-500 text-red-500 px-8 py-3 rounded-2xl font-black text-4xl rotate-12 bg-white/90 shadow-lg">
          NON ✗
        </div>
      </motion.div>

      {/* Image area */}
      <div className="relative h-56 w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        {school.image ? (
          <img
            src={school.image}
            alt={school.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-6xl opacity-40">💼</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-7 pt-2 relative z-10">
        <h2 className="text-2xl font-extrabold text-[#1d3583] mb-2 leading-tight">
          {school.name}
        </h2>
        <p className="text-sm text-slate-400 mb-5 leading-relaxed line-clamp-3">
          {school.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {school.degree && (
            <span className="bg-blue-50 text-[#1d3583] px-4 py-1.5 rounded-full text-xs font-bold">
              🎓 {school.degree}
            </span>
          )}
          {school.price && (
            <span className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold">
              💰 {school.price}
            </span>
          )}
          {school.domains &&
            school.domains.slice(0, 2).map((d: string, i: number) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {d}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SchoolCard;
