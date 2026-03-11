"use client";
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface SchoolCardProps {
  school: { 
    name: string; 
    description: string; 
    image: string; 
    degree: string; 
    price: string 
  };
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SchoolCard = ({ school, onSwipe }: SchoolCardProps) => {
  if (!school) {
    return <div className="w-full max-w-[400px] h-[500px] bg-slate-200 rounded-[2rem] animate-pulse" />;
  }

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 100, 200], [0, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, opacity }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_: any, info: PanInfo) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
      }}
      whileTap={{ cursor: "grabbing" }}
      className="relative w-full max-w-[400px] bg-white rounded-[2rem] shadow-2xl overflow-hidden cursor-grab select-none"
    >
      <motion.div 
        style={{ opacity: likeOpacity }}
        className="absolute top-10 left-10 z-20 border-4 border-green-500 text-green-500 px-6 py-2 rounded-xl font-black text-3xl rotate-[-15deg] bg-white/90"
      >
        LIKE
      </motion.div>

      <motion.div 
        style={{ opacity: nopeOpacity }}
        className="absolute top-10 right-10 z-20 border-4 border-red-500 text-red-500 px-6 py-2 rounded-xl font-black text-3xl rotate-[15deg] bg-white/90"
      >
        NOPE
      </motion.div>

      <div className="relative h-72 w-full">
        <img src={school.image} alt={school.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a367f] via-transparent to-transparent" />
      </div>
      
      <div className="p-8 bg-[#1a367f] text-white -mt-10 relative z-10">
        <h2 className="text-3xl font-bold mb-3">{school.name}</h2>
        <p className="text-sm text-blue-100 mb-6 leading-relaxed line-clamp-3">
          {school.description}
        </p>
        
        <div className="flex flex-wrap gap-3">
          <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-medium border border-white/20">
             🎓 {school.degree}
          </span>
          <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-medium border border-white/20">
             💰 {school.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SchoolCard;