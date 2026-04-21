import { Video } from "../types/video";
import { allVideos } from "./contents/index";
import { CATEGORIES } from "./categories";

export type { Video };
export { CATEGORIES };

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

// Deterministic pseudo-random integer in [min, max] from a string seed.
const seededInt = (seed: string, min: number, max: number): number => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const n = (h >>> 0) % (max - min + 1);
  return min + n;
};

// Assign each video a stable random "thousands" view count (e.g. 12,000 - 987,000).
export const VIDEOS: Video[] = allVideos.map((v) => ({
  ...v,
  views: seededInt(v.id + "|" + v.title, 12, 987) * 1000,
}));

export const findVideoBySlug = (slug: string): Video | undefined =>
  VIDEOS.find((v) => slugify(v.title) === slug);

export const findVideoById = (id: string): Video | undefined =>
  VIDEOS.find((v) => v.id === id);
