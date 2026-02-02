import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryChips from "@/components/CategoryChips";
import VideoGrid from "@/components/VideoGrid";
import { getPopularVideos, searchYouTubeVideos, YouTubeVideo } from "@/services/youtubeApi";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Load popular videos on mount
  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const popularVideos = await getPopularVideos(16);
      setVideos(popularVideos);
      setLoading(false);
    };
    loadVideos();
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (!searchQuery.trim()) {
      // Reset to popular videos when search is cleared
      const loadPopular = async () => {
        setLoading(true);
        const popularVideos = await getPopularVideos(16);
        setVideos(popularVideos);
        setLoading(false);
      };
      loadPopular();
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const results = await searchYouTubeVideos(searchQuery, 16);
      setVideos(results);
      setLoading(false);
    }, 500);

    setSearchTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Sidebar isOpen={sidebarOpen} />
      
      <main
        className={`pt-14 transition-all duration-200 ${
          sidebarOpen ? "ml-60" : "ml-[72px]"
        }`}
      >
        <div className="px-6">
          <CategoryChips />
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <VideoGrid videos={videos} searchQuery={searchQuery} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
