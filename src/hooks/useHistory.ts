import { YouTubeVideo } from "@/services/youtubeApi";

const HISTORY_KEY = "yt_watch_history";
const MAX_HISTORY = 50;

export const addToHistory = (video: YouTubeVideo) => {
  const existing: YouTubeVideo[] = getHistory();
  const filtered = existing.filter((v) => v.id !== video.id);
  const updated = [video, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getHistory = (): YouTubeVideo[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const removeFromHistory = (videoId: string) => {
  const updated = getHistory().filter((v) => v.id !== videoId);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};
