# BangVault - Project Overview & Instructions

BangVault is a high-performance, SEO-optimized video streaming platform designed for maximum engagement and ad monetization.

## Project Structure

- `src/types/video.ts`: Defines the `Video` data structure.
- `src/data/categories.ts`: List of available video categories.
- `src/data/contents/`: Directory where each video has its own file.
- `src/data/videos.ts`: Aggregator that exports all videos and categories.
- `src/components/`: Reusable UI components (Player, AdSlots, Cards, etc.).
- `src/App.tsx`: Main logic handling search, categories, and page views.

## 1. How to add more videos
To keep the project clean, videos are organized in separate files:

1. Create a new file in `src/data/contents/` (e.g., `v5.ts`).
2. Paste the following template and fill in the details:
```typescript
import { Video } from "../../types/video";

export const video: Video = {
  id: "v5",
  title: "Your Clickbait SEO Title Here",
  description: "Highly optimized description for search engines...",
  thumbnailUrl: "https://your-image-url.com/thumb.jpg",
  videoUrl: "https://your-video-url.com/video.mp4",
  category: "Tech",
  tags: ["keyword1", "keyword2"],
  views: 100000,
  duration: "10:00",
  uploadDate: "2024-04-18",
  isTrending: true,
  isFeatured: false
};
```
3. Open `src/data/contents/index.ts`.
4. Import your new video and add it to the `allVideos` array:
```typescript
import { video as v1 } from "./v1";
// ...
import { video as v5 } from "./v5";

export const allVideos = [v1, v2, v3, v4, v5];
```

## 2. Managing Advertisements
The `AdSlot` component is used throughout the app. You can find active placements in:
- `App.tsx` (Homepage Banner, In-feed Native, Sidebar)
- `VideoPlayer.tsx` (Pre-roll simulation)

To update the "ads", modify the `AdSlot.tsx` component or replace the placeholders in `App.tsx` with your actual ad scripts (e.g., Google AdSense or PropellerAds).

## 3. SEO & Monetization Features
- **Structured Data:** The `App.tsx` file dynamically generates JSON-LD for every video played, ensuring search engines index your content correctly.
- **Auto-Play Hover:** Thumbnails use `motion` to scale on hover, increasing Click-Through Rate (CTR).
- **No-Download Guard:** The `VideoPlayer` uses standard web restrictions (`onContextMenu`, `controlsList="nodownload"`) to discourage users from saving videos locally.

## 4. Deployment Guide

### Option A: Static Hosting (Cloudflare Pages / Vercel / Netlify)
Since this app is a Single Page Application (SPA):
1. Run `npm run build`.
2. Upload the contents of the `dist/` folder to your provider.
3. **Note:** Ensure your provider is configured for SPA routing (redirect all 404s to `index.html`).

## Technical Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4 (Dark Mode Default)
- **Icons:** Lucide-React
- **Animations:** Motion (Framer Motion)
- **Performance:** Dynamic filtering, lazy loading thumbnails, small bundle size.
