import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, RotateCcw, FastForward, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  onAdComplete?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isAdPlaying, setIsAdPlaying] = useState(true); // Simulate pre-roll ad
  const [adTimeLeft, setAdTimeLeft] = useState(5);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (isAdPlaying) {
      const timer = setInterval(() => {
        setAdTimeLeft((prev) => {
          if (prev <= 1) {
            setIsAdPlaying(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAdPlaying]);

  const togglePlay = () => {
    if (isAdPlaying) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAdPlaying) return;
    const newProgress = parseFloat(e.target.value);
    if (videoRef.current) {
      const time = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(newProgress);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div 
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group border border-zinc-800 shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onContextMenu={(e) => e.preventDefault()} // Prevent right-click download
    >
      {/* Support for Iframe Embeds */}
      {src.includes('/e/') || src.includes('embed') || src.includes('youtube.com') ? (
        <iframe
          src={src}
          className="w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <>
          {/* The Actual Video Element */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            playsInline
            /* These make standard browser-level downloading harder */
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Ad Overlay (Pre-roll Simulation) */}
          <AnimatePresence>
            {isAdPlaying && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="max-w-md space-y-6">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary text-2xl font-bold mx-auto animate-pulse">
                    Ad
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Premium Ad Sponsor</h3>
                  <p className="text-zinc-400 text-sm">Experience the best streaming with zero interruptions after this short message.</p>
                  
                  <div className="pt-8">
                    <button className="px-6 py-2 bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 cursor-not-allowed">
                      Skip Ad in {adTimeLeft}s
                    </button>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8">
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                    Visit Sponsor <SkipForward size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Controls Container */}
          <AnimatePresence>
            {showControls && !isAdPlaying && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-black/40"
              >
                {/* Center Play/Pause button for touch/click feedback */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isPlaying && (
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white scale-110">
                      <Play fill="currentColor" size={40} />
                    </div>
                  )}
                </div>

                {/* Bottom Bar */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Progress Slider */}
                  <div className="px-2">
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={progress}
                      onChange={handleProgressChange}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-primary hover:h-1.5 transition-all"
                    />
                  </div>

                  {/* Controls Grid */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button onClick={togglePlay} className="text-white hover:text-brand-primary transition-colors">
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                      </button>
                      
                      <div className="flex items-center gap-3 group/vol">
                        <button onClick={() => setIsMuted(!isMuted)} className="text-white">
                          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input 
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-0 group-hover/vol:w-20 transition-all duration-300 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                      </div>
                      
                      <div className="text-[11px] sm:text-xs font-mono text-zinc-400">
                        <span className="text-white">0:00</span> / 12:45
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                      <button className="text-zinc-400 hover:text-white transition-colors">
                        <Settings size={20} />
                      </button>
                      <button className="text-zinc-400 hover:text-white transition-colors" onClick={() => videoRef.current?.requestFullscreen()}>
                        <Maximize size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
