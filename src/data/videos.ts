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
}

export const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Cinematic Drone Tour of the Swiss Alps | 4K Ultra HD",
    description: "Experience the breathtaking beauty of the Swiss Alps from above. This cinematic journey takes you through snow-capped peaks, crystal clear lakes, and lush valleys. Perfect for relaxation and wanderlust seekers looking for the ultimate high-quality nature footage.",
    thumbnailUrl: "https://picsum.photos/seed/alps/1280/720",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Travel",
    tags: ["nature", "drone", "4k", "mountains", "alps", "cinematic"],
    views: 1250430,
    duration: "9:56",
    uploadDate: "2024-03-15",
    isTrending: true,
    isFeatured: true
  },
  {
    id: "v2",
    title: "The Ultimate Street Food Guide | Japan's Hidden Gems",
    description: "Join us as we explore the bustling streets of Tokyo and Osaka to find the best hidden street food gems. From savory takoyaki to melt-in-your-mouth wagyu skewers, this guide is a must-watch for foodies and travel enthusiasts. Discover why Japanese street food is world-renowned.",
    thumbnailUrl: "https://picsum.photos/seed/food/1280/720",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Lifestyle",
    tags: ["food", "japan", "tokyo", "street food", "travel", "vlog"],
    views: 890210,
    duration: "15:20",
    uploadDate: "2024-04-10",
    isTrending: true
  },
  {
    id: "v3",
    title: "Mastering the Art of Modern Minimalist Interior Design",
    description: "Learn how to transform your living space into a serene minimalist sanctuary. In this video, we break down the core principles of modern interior design, focusing on light, space, and functional aesthetics. Elevate your home with these simple yet effective design tips.",
    thumbnailUrl: "https://picsum.photos/seed/interior/1280/720",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    category: "Design",
    tags: ["interior design", "minimalism", "home decor", "architecture", "lifestyle"],
    views: 450000,
    duration: "12:45",
    uploadDate: "2024-04-12"
  },
  {
    id: "v4",
    title: "Futuristic Urban Photography: Night Walk in Cyberpunk City",
    description: "Explore the neon-lit streets of Hong Kong at night. This visual masterpiece captures the essence of a cyberpunk future through stunning urban photography and long-exposure shots. Ideal for fans of sci-fi aesthetics and nighttime photography techniques.",
    thumbnailUrl: "https://picsum.photos/seed/cyberpunk/1280/720",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Art",
    tags: ["photography", "cyberpunk", "urban", "night", "neon", "hong kong"],
    views: 230500,
    duration: "8:30",
    uploadDate: "2024-04-15"
  }
];

export const CATEGORIES = [
  "All",
  "Travel",
  "Lifestyle",
  "Design",
  "Art",
  "Tech",
  "Gaming",
  "Education"
];
