export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  tags: string[];
  views: number;
  duration: string;
  uploadDate: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  /** Unique token for the restricted share link (#/t/TOKEN). */
  token?: string;
}
