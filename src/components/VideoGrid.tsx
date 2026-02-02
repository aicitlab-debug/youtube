import VideoCard from "./VideoCard";
import { YouTubeVideo } from "@/services/youtubeApi";
import { SearchX } from "lucide-react";

interface VideoGridProps {
  videos: YouTubeVideo[];
  searchQuery: string;
}

const VideoGrid = ({ videos, searchQuery }: VideoGridProps) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <SearchX className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-sm">
          {searchQuery ? `No videos match "${searchQuery}". Try different keywords.` : "No videos available."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
