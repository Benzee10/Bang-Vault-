import React, { useState } from "react";
import { Search, Menu, User, Bell, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onLogoClick: () => void;
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onLogoClick,
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryClick = (cat: string) => {
    onCategorySelect(cat);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-bottom border-zinc-800 px-4 h-16 sm:h-20 sm:px-8">
        <div className="max-w-[1800px] mx-auto h-full flex items-center justify-between gap-4 md:gap-8">
          
          {/* Left: Logo & Menu */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={onLogoClick}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                <Upload size={18} strokeWidth={3} className="-rotate-12 transition-transform group-hover:rotate-0" />
              </div>
              <span className="text-xl sm:text-2xl font-display font-bold tracking-tighter hidden sm:block">
                Bang<span className="text-brand-primary">Vault</span>
              </span>
            </div>
          </div>

          {/* Center: Search Bar */}
          <form 
            onSubmit={handleSubmit}
            className="flex-1 max-w-2xl"
          >
            <div className={`relative flex items-center h-10 sm:h-12 bg-zinc-900 border transition-all duration-300 rounded-full overflow-hidden ${isSearchFocused ? 'border-brand-primary/50 ring-4 ring-brand-primary/5' : 'border-zinc-800 hover:border-zinc-700'}`}>
              <Search size={18} className="ml-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search premium videos, categories..." 
                className="w-full h-full bg-transparent px-3 text-sm focus:outline-none placeholder:text-zinc-600"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    onSearch("");
                  }}
                  className="p-2 mr-1 text-zinc-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
              
              <button className="h-full px-4 sm:px-6 bg-zinc-800 hover:bg-zinc-700 border-l border-zinc-700 text-xs font-bold uppercase tracking-widest transition-colors hidden sm:block">
                Search
              </button>
            </div>
          </form>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button className="p-2 text-zinc-400 hover:text-white relative hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-black" />
            </button>
            
            <button className="flex items-center gap-2 pr-1 pl-1 py-1 sm:pr-4 sm:pl-2 sm:py-1.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                <User size={16} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider hidden md:block">Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Categories Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              key="menu-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-zinc-950 border-r border-zinc-900 z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 sm:h-20 border-b border-zinc-900">
                <span className="text-lg font-display font-bold tracking-tighter">
                  Bang<span className="text-brand-primary">Vault</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <p className="px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">
                  Categories
                </p>
                <ul className="flex flex-col">
                  {categories.map((cat) => {
                    const active = cat === selectedCategory;
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(cat)}
                          className={`w-full text-left px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors border-l-2 ${
                            active
                              ? "border-brand-primary text-white bg-zinc-900"
                              : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
