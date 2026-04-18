import React from "react";
import { Info } from "lucide-react";

interface AdSlotProps {
  type: "banner" | "sidebar" | "native" | "interstitial";
  className?: string;
  label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, className = "", label = "Advertisement" }) => {
  const sizeClasses = {
    banner: "w-full h-24 md:h-32",
    sidebar: "w-full aspect-[4/5] md:aspect-square",
    native: "w-full aspect-[16/9]",
    interstitial: "fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4",
  };

  return (
    <div className={`ad-slot relative group ${sizeClasses[type]} ${className}`}>
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</span>
        <Info size={10} className="text-zinc-500" />
      </div>
      
      <div className="text-center p-6 flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 bg-zinc-800/50">
          $
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-400">Premium Ad Placement</p>
          <p className="text-xs text-zinc-600">Maximize your CPC and revenue</p>
        </div>
        <button className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] rounded transition-colors uppercase tracking-widest font-semibold border border-zinc-700">
          Learn More
        </button>
      </div>
      
      {/* Decorative scan lines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </div>
  );
};
