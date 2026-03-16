import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { YouTubeVideo } from "@/services/youtubeApi";
import { getDownloads, removeFromDownloads } from "@/hooks/useDownloads";
import { Download, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Downloads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [downloads, setDownloads] = useState<YouTubeVideo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDownloads(getDownloads());
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const handleRemove = (id: string) => {
    removeFromDownloads(id);
    setDownloads(getDownloads());
  };

  const handleDownload = (video: YouTubeVideo) => {
    window.open(`https://loader.to/api/button/?url=https://www.youtube.com/watch?v=${video.id}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} searchQuery={searchQuery} onSearchChange={handleSearch} />
      <Sidebar isOpen={sidebarOpen} />

      <main className={`pt-14 transition-all duration-200 ${sidebarOpen ? "md:ml-60" : "md:ml-[72px]"} ml-0 pb-16 md:pb-0`}>
        <div className="px-4 md:px-8 py-6 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <Download className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Downloads</h1>
          </div>

          {downloads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Download className="h-16 w-16 mb-4" />
              <h3 className="text-xl font-medium mb-2">No downloads yet</h3>
              <p className="text-sm">Videos you download will appear here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {downloads.map((video) => (
                <div key={video.id} className="flex gap-3 group items-center">
                  <Link to={`/watch?v=${video.id}`} className="flex gap-3 flex-1 min-w-0">
                    <div className="relative w-32 sm:w-40 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <span className="absolute bottom-1 right-1 bg-background/90 text-[10px] font-medium px-1 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2 leading-5">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{video.channel.name}</p>
                      <p className="text-xs text-muted-foreground">{video.views} views • {video.uploadedAt}</p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 rounded-full"
                      onClick={() => handleDownload(video)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-xs hidden sm:inline">Download</span>
                    </Button>
                    <button
                      onClick={() => handleRemove(video.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-accent"
                      aria-label="Remove"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Downloads;
