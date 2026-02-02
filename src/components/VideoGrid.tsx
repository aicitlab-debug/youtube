import VideoCard from "./VideoCard";
import { Video } from "@/data/videos";
import { SearchX } from "lucide-react";

interface VideoGridProps {
  videos: Video[];
  searchQuery: string;
}

const VideoGrid = ({ videos, searchQuery }: VideoGridProps) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <SearchX className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-sm">
          No videos match "{searchQuery}". Try different keywords.
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
