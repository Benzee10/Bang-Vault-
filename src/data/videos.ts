import { Video } from "../types/video";
import { allVideos } from "./contents/index";
import { CATEGORIES } from "./categories";

export type { Video };
export const VIDEOS: Video[] = allVideos;
export { CATEGORIES };
