import React from "react";
import { Upload, Facebook, Twitter, Instagram, Youtube, Mail, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 px-6 sm:px-12">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-20">
        
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white">
              <Upload size={18} strokeWidth={3} className="-rotate-12" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">
              Bang<span className="text-brand-primary">Vault</span>
            </span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            The world's premium free video streaming platform. Discover, watch, and share the highest quality cinematic content from creators across the globe.
          </p>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-primary hover:bg-zinc-800 transition-all">
              <Twitter size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-primary hover:bg-zinc-800 transition-all">
              <Facebook size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-primary hover:bg-zinc-800 transition-all">
              <Instagram size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-primary hover:bg-zinc-800 transition-all">
              <Youtube size={18} />
            </button>
          </div>
        </div>

        {/* Company */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Corporate</h3>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li className="hover:text-white cursor-pointer transition-colors">About BangVault</li>
            <li className="hover:text-white cursor-pointer transition-colors">Advertising Solutions</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">DMCA Compliance</li>
          </ul>
        </div>

        {/* Contact/Newsletter */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Stay Updated</h3>
          <p className="text-xs text-zinc-600">Get the latest trending videos and platform updates directly in your inbox.</p>
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <input 
              type="email" 
              placeholder="Your email address"
              className="bg-transparent px-3 py-2 text-xs flex-1 focus:outline-none"
            />
            <button className="p-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 transition-colors">
              <Mail size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">
            <ExternalLink size={10} />
            Licensed by Global Media Corp
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto border-t border-zinc-900/50 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-xs text-zinc-700 font-medium">© 2024 BangVault Interactive. All rights reserved. Built for performance.</span>
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-700">
          <span className="hover:text-zinc-500 cursor-pointer transition-colors">Support</span>
          <span className="hover:text-zinc-500 cursor-pointer transition-colors">Cookies</span>
          <span className="hover:text-zinc-500 cursor-pointer transition-colors">Sitemap</span>
        </div>
      </div>
    </footer>
  );
};
