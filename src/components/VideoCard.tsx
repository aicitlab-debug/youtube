import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/services/youtubeApi";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  video: YouTubeVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setShowPreview(true), 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setShowPreview(false);
  };

  const handleClick = () => {
    navigate(`/watch?v=${video.id}`);
  };

  return (
    <div
      className="video-card cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail / Preview */}
      <div className="relative mb-3 rounded-xl overflow-hidden bg-black">
        {showPreview ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${video.id}`}
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="video-thumbnail w-full"
          />
        )}
        {!showPreview && (
          <span className="absolute bottom-2 right-2 bg-background/90 text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src={video.channel.avatar} />
          <AvatarFallback>{video.channel.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-1">
            {video.title}
          </h3>
          <p className="text-muted-foreground text-sm hover:text-foreground cursor-pointer">
            {video.channel.name}
          </p>
          <p className="text-muted-foreground text-sm">
            {video.views} views • {video.uploadedAt}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCard;
