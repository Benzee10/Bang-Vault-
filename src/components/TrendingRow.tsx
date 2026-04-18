import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Video } from "../data/videos";
import { VideoCard } from "./VideoCard";

interface TrendingRowProps {
  videos: Video[];
  onVideoClick: (id: string) => void;
}

export const TrendingRow: React.FC<TrendingRowProps> = ({ videos, onVideoClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-6 sm:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Zap size={20} fill="currentColor" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">Trending Now</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-90"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-12 pb-4"
      >
        {videos.map((video) => (
          <div key={video.id} className="min-w-[280px] sm:min-w-[360px] md:min-w-[420px]">
            <VideoCard video={video} onClick={onVideoClick} />
          </div>
        ))}
      </div>
    </section>
  );
};
