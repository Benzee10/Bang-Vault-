import React from "react";
import { motion } from "motion/react";
import { Play, Info, TrendingUp } from "lucide-react";
import { Video } from "../data/videos";

interface HeroProps {
  video: Video;
  onWatch: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ video, onWatch }) => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] overflow-hidden group">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <motion.img 
          src={video.thumbnailUrl} 
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_50%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1800px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-12 sm:pb-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl space-y-6"
        >
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-xs font-bold uppercase tracking-widest border border-brand-primary/30 backdrop-blur-md">
              <TrendingUp size={14} />
              Featured Video
            </span>
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">
              {video.category} • {video.duration}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight">
            {video.title}
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 line-clamp-3 max-w-xl font-medium leading-relaxed">
            {video.description}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={() => onWatch(video.id)}
              className="flex items-center gap-3 px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-primary/20"
            >
              <Play fill="currentColor" size={20} />
              WATCH NOW
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all backdrop-blur-md border border-white/10">
              <Info size={20} />
              MORE INFO
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};
