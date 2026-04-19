import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Search, Zap, Play, Clock, Eye, 
  Share2, MessageSquare, ThumbsUp, ThumbsDown, 
  ChevronRight, Filter, TrendingUp, Grid3X3, Loader2 
} from "lucide-react";

import { VIDEOS, CATEGORIES, Video } from "./data/videos";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoCard } from "./components/VideoCard";
import { TrendingRow } from "./components/TrendingRow";
import { AdSlot } from "./components/AdSlot";
import { VideoPlayer } from "./components/VideoPlayer";
import { Footer } from "./components/Footer";

type Page = "home" | "watch" | "category" | "search";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState(12);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bangvault_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (id: string) => {
    const newHistory = [id, ...history.filter(i => i !== id)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("bangvault_history", JSON.stringify(newHistory));
  };

  const currentVideo = useMemo(() => 
    VIDEOS.find(v => v.id === selectedVideoId) || VIDEOS[0] || null, 
  [selectedVideoId]);

  const featuredVideo = useMemo(() => 
    VIDEOS.find(v => v.isFeatured) || VIDEOS[0] || null, 
  []);

  const filteredVideos = useMemo(() => {
    let list = [...VIDEOS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => 
        v.title.toLowerCase().includes(q) || 
        v.tags.some(t => t.toLowerCase().includes(q)) ||
        v.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "All") {
      list = list.filter(v => v.category === selectedCategory);
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const handleWatch = (id: string) => {
    setLoading(true);
    setSelectedVideoId(id);
    addToHistory(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Simulate loading
    setTimeout(() => {
      setCurrentPage("watch");
      setLoading(false);
    }, 400);
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && currentPage !== "watch") {
      setCurrentPage("search");
    } else if (!query && currentPage === "search") {
      setCurrentPage("home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-primary selection:text-white">
      <Header 
        onSearch={handleSearch} 
        onLogoClick={() => setCurrentPage("home")} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[80vh] flex items-center justify-center flex-col gap-4"
            >
              <Loader2 size={48} className="text-brand-primary animate-spin" />
              <p className="text-zinc-500 font-display font-medium uppercase tracking-[0.2em] text-xs">Loading Premium Content</p>
            </motion.div>
          ) : (
            <>
              {currentPage === "home" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12 sm:space-y-20 pb-20"
                >
                  {featuredVideo && <Hero video={featuredVideo} onWatch={handleWatch} />}
                  
                  {/* Category Filter Row */}
                  {CATEGORIES.length > 0 && (
                    <div className="px-6 sm:px-12 flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                      {CATEGORIES.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${selectedCategory === cat ? 'bg-brand-primary border-brand-primary text-white' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Trending Section */}
                  {VIDEOS.some(v => v.isTrending) && (
                    <TrendingRow 
                      videos={VIDEOS.filter(v => v.isTrending)} 
                      onVideoClick={handleWatch} 
                    />
                  )}

                  {/* Ads Banner */}
                  <div className="px-6 sm:px-12">
                    <AdSlot type="banner" />
                  </div>

                  {/* Video Grid */}
                  <section className="px-6 sm:px-12 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-800">
                        <Grid3X3 size={20} />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                        {selectedCategory === "All" ? "Recommended For You" : `${selectedCategory} Videos`}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {filteredVideos.slice(0, visibleVideos).map((video, idx) => (
                        <React.Fragment key={video.id}>
                          <VideoCard video={video} onClick={handleWatch} />
                          {/* In-feed ad every 6 videos */}
                          {idx === 5 && (
                            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                              <AdSlot type="banner" className="h-40" label="In-feed Sponsor" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {filteredVideos.length > visibleVideos && (
                      <div className="flex justify-center pt-10 pb-10">
                        <button 
                          onClick={() => setVisibleVideos(prev => prev + 8)}
                          className="px-10 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl font-bold uppercase tracking-[0.2em] text-xs transition-all active:scale-95"
                        >
                          Show More Videos
                        </button>
                      </div>
                    )}
                  </section>
                </motion.div>
              )}

              {currentPage === "watch" && currentVideo && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="max-w-[1800px] mx-auto px-4 sm:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                  {/* Left Column: Player & Info */}
                  <div className="lg:col-span-8 space-y-8">
                    <VideoPlayer src={currentVideo.videoUrl} poster={currentVideo.thumbnailUrl} />
                    
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {currentVideo.tags && currentVideo.tags.map(tag => (
                            <span key={tag} className="text-brand-primary text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer">#{tag}</span>
                          ))}
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-tight">
                          {currentVideo.title}
                        </h1>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-zinc-900">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-display font-bold text-lg">BV</div>
                          <div>
                            <p className="font-bold text-white flex items-center gap-2">BangVault Studios <span className="w-3 h-3 bg-brand-primary rounded-full" /></p>
                            <p className="text-xs text-zinc-500 font-medium">Verified Partner • 2.4M followers</p>
                          </div>
                          <button className="ml-4 px-6 py-2 bg-black border border-white text-black bg-white hover:bg-zinc-200 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                            Subscribe
                          </button>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="flex bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden">
                            <button className="flex items-center gap-2 px-5 py-2 hover:bg-zinc-800 border-r border-zinc-800 transition-colors">
                              <ThumbsUp size={18} />
                              <span className="text-xs font-bold">12K</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 transition-colors">
                              <ThumbsDown size={18} />
                            </button>
                          </div>
                          <button className="flex items-center gap-2 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-all">
                            <Share2 size={18} />
                            <span className="text-xs font-bold hidden sm:block">Share</span>
                          </button>
                        </div>
                      </div>

                      {/* Description Box */}
                      <div className="bg-zinc-900/50 rounded-2xl p-6 space-y-4 border border-zinc-900">
                        <div className="flex items-center gap-6 text-sm font-bold">
                          <span>{(currentVideo.views / 1000).toFixed(1)}K views</span>
                          <span>{currentVideo.uploadDate}</span>
                        </div>
                        <div className="text-zinc-400 text-sm leading-relaxed">
                          {currentVideo.description}
                        </div>
                        <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-primary">Show More</button>
                      </div>

                      {/* Fake Comments Section */}
                      <div className="space-y-6 pt-6">
                        <h3 className="text-lg font-bold flex items-center gap-3">
                          <MessageSquare size={20} className="text-zinc-500" />
                          24 Comments
                        </h3>
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600">U</div>
                          <input 
                            type="text" 
                            placeholder="Add a comment (Sign in disabled)..." 
                            className="flex-1 bg-transparent border-b border-zinc-800 focus:border-white py-2 text-sm focus:outline-none placeholder:text-zinc-600"
                            disabled
                          />
                        </div>
                        <div className="p-10 border-2 border-dashed border-zinc-900 rounded-2xl text-center space-y-3">
                          <p className="text-sm font-medium text-zinc-500">Comments are archived for this video.</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">BangVault Community Guidelines Apply</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Sidebar Ads & Related */}
                  <div className="lg:col-span-4 space-y-10">
                    <AdSlot type="sidebar" className="shadow-2xl shadow-brand-primary/5" />
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold tracking-tight">Up Next</h3>
                        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-brand-primary">Autoplay</button>
                      </div>
                      
                      <div className="space-y-6 px-1">
                        {VIDEOS.filter(v => v.id !== selectedVideoId).slice(0, 6).map(video => (
                          <div 
                            key={video.id} 
                            className="flex gap-4 group cursor-pointer"
                            onClick={() => handleWatch(video.id)}
                          >
                            <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                                <img src={video.thumbnailUrl} alt={video.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-[9px] font-mono text-white rounded">{video.duration}</div>
                            </div>
                            <div className="space-y-1.5">
                              <h4 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">{video.title}</h4>
                              <p className="text-[11px] text-zinc-500 font-medium">BangVault Studios</p>
                              <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-mono">
                                <span>{(video.views / 1000).toFixed(0)}K views</span>
                                <span>{video.uploadDate}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full py-4 bg-zinc-950 border border-zinc-900 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all">
                        Load More Recommendations
                      </button>
                    </div>

                    <AdSlot type="sidebar" label="Sponsor Content" />
                  </div>
                </motion.div>
              )}

              {currentPage === "search" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-[1800px] mx-auto px-6 sm:px-12 py-12 space-y-12"
                >
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-8">
                    <div className="space-y-2">
                       <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">Search Results</h1>
                       <p className="text-zinc-500 font-medium">Found {filteredVideos.length} premium results for <span className="text-brand-primary">"{searchQuery}"</span></p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest transition-all">
                      <Filter size={16} /> Filter
                    </button>
                  </div>

                  {filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {filteredVideos.map(video => (
                        <VideoCard key={video.id} video={video} onClick={handleWatch} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-32 text-center space-y-6">
                      <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-700">
                        <Search size={32} />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold">No results found</h2>
                        <p className="text-zinc-500 max-w-sm mx-auto">Try adjusting your search or category to find what you're looking for.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          setCurrentPage("home");
                        }}
                        className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs"
                      >
                        Explore Trending
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Structured Data for SEO */}
      {currentVideo && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": currentVideo.title,
            "description": currentVideo.description,
            "thumbnailUrl": currentVideo.thumbnailUrl,
            "uploadDate": currentVideo.uploadDate,
            "duration": "PT12M45S",
            "contentUrl": currentVideo.videoUrl,
            "embedUrl": currentVideo.videoUrl,
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/WatchAction",
              "userInteractionCount": currentVideo.views
            }
          })}
        </script>
      )}
    </div>
  );
}
