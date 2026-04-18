# BangVault - Project Overview & Instructions

BangVault is a high-performance, SEO-optimized video streaming platform designed for maximum engagement and ad monetization.

## Project Structure

- `src/data/videos.ts`: **The Source of Truth.** This file contains all the video data.
- `src/components/`: Reusable UI components (Player, AdSlots, Cards, etc.).
- `src/App.tsx`: Main logic handling search, categories, and page views.
- `src/index.css`: Global theme, fonts, and Tailwind configurations.

## 1. How to add more videos
To expand the library, open `src/data/videos.ts` and add a new object to the `VIDEOS` array:

```typescript
{
  id: "v5",
  title: "Your Clickbait SEO Title Here",
  description: "Highly optimized description for search engines...",
  thumbnailUrl: "https://your-image-url.com/thumb.jpg",
  videoUrl: "https://your-video-url.com/video.mp4",
  category: "Tech", // Must match one of the categories
  tags: ["keyword1", "keyword2"],
  views: 100000,
  duration: "10:00",
  uploadDate: "2024-04-18",
  isTrending: true, // Shows in the trending row
  isFeatured: false // Shows in the hero banner if true
}
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
