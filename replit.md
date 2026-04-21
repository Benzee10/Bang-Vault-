# BangVault

React 19 + Vite 6 + Tailwind 4 video streaming SPA.

## Replit Setup
- Workflow: `Start application` runs `npm run dev` (Vite on `0.0.0.0:5000`).
- `vite.config.ts` sets `server.host=0.0.0.0`, `server.port=5000`, and `allowedHosts=true` to work behind the Replit proxy.
- Deployment: autoscale, build `npm run build`, run `npx vite preview --host=0.0.0.0 --port=5000`.

## Stack
React 19, Vite 6, Tailwind CSS 4, Lucide-React, Motion, @google/genai (optional, requires `GEMINI_API_KEY`).
