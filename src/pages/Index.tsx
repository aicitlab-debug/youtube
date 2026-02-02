import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryChips from "@/components/CategoryChips";
import VideoGrid from "@/components/VideoGrid";
import { videos } from "@/data/videos";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    
    const query = searchQuery.toLowerCase();
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.channel.name.toLowerCase().includes(query)
    );
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
          <VideoGrid videos={filteredVideos} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
};

export default Index;
