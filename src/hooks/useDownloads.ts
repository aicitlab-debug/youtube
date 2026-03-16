import { YouTubeVideo } from "@/services/youtubeApi";

const DOWNLOADS_KEY = "yt_downloads";

export const addToDownloads = (video: YouTubeVideo) => {
  const existing: YouTubeVideo[] = getDownloads();
  if (existing.find((v) => v.id === video.id)) return; // no duplicates
  const updated = [video, ...existing];
  localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(updated));
};

export const getDownloads = (): YouTubeVideo[] => {
  try {
    const raw = localStorage.getItem(DOWNLOADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const removeFromDownloads = (videoId: string) => {
  const updated = getDownloads().filter((v) => v.id !== videoId);
  localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(updated));
};
