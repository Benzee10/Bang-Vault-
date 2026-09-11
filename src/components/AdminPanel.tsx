import React, { useState } from "react";
import { Copy, Check, LogOut, Lock, ExternalLink } from "lucide-react";
import { Video } from "../data/videos";
import { slugify } from "../data/videos";

interface AdminPanelProps {
  videos: Video[];
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ videos, onLogout }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const base = `${window.location.origin}${window.location.pathname}`;

  const watchLink = (v: Video) => `${base}#/watch/${slugify(v.title)}`;

  const copy = async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Admin Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center">
            <Lock size={14} strokeWidth={3} />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">BangVault Admin</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Video Link Manager</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Video Links</h1>
          <p className="text-zinc-500 text-sm">Copy a public watch link for any video. Visitors can browse the full website normally.</p>
        </div>

        <div className="space-y-4">
          {videos.map((v) => (
            <div key={v.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative w-32 sm:w-40 aspect-video rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  <img src={v.thumbnailUrl} alt={v.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-[9px] font-mono text-white rounded">{v.duration}</div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3 min-w-0">
                  <div>
                    <p className="font-bold text-sm line-clamp-2 leading-snug">{v.title}</p>
                    <p className="text-[11px] text-zinc-500 mt-1">{v.category} · {v.uploadDate}</p>
                  </div>

                  {/* Public watch link */}
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-1"><ExternalLink size={9} /> Your Watch Link</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-[11px] bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-400 truncate">
                        {watchLink(v)}
                      </code>
                      <button
                        type="button"
                        onClick={() => copy(watchLink(v), `watch-${v.id}`)}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-[11px] font-bold uppercase tracking-wider text-zinc-300 transition-colors"
                      >
                        {copiedId === `watch-${v.id}` ? <Check size={12} /> : <Copy size={12} />}
                        {copiedId === `watch-${v.id}` ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-500 space-y-1">
          <p className="font-semibold text-zinc-400">Admin Notes</p>
          <p>• <strong>Public Watch Link</strong> — opens the video page and keeps the rest of the website available.</p>
          <p>• To change your admin secret, edit <code className="text-zinc-400">src/links/adminKey.ts</code>.</p>
        </div>
      </div>
    </div>
  );
};
