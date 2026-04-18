import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Clock, Eye, Share2 } from "lucide-react";
import { Video } from "../data/videos";

interface VideoCardProps {
  video: Video;
  onClick: (id: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(video.id)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
        <motion.img
          src={video.thumbnailUrl}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-xl shadow-brand-primary/20 scale-110">
                <Play size={24} fill="currentColor" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Duration Badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] sm:text-xs font-mono text-white rounded border border-white/10">
          {video.duration}
        </div>

        {/* Trending Badge */}
        {video.isTrending && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-primary text-[10px] font-bold text-white rounded-full uppercase tracking-tighter">
            Trending
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="flex gap-3 px-1 py-1">
        <div className="flex-1 space-y-1.5">
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
            {video.title}
          </h3>
          
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {(video.views / 1000).toFixed(1)}K views
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {video.uploadDate}
            </span>
            <span className="text-zinc-600">
              #{video.category}
            </span>
          </div>
        </div>
        
        <button 
          className="h-fit p-1.5 text-zinc-500 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // In a real app, this would open share menu
          }}
        >
          <Share2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};
