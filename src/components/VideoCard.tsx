import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: {
    name: string;
    avatar: string;
  };
  views: string;
  uploadedAt: string;
  duration: string;
}

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="video-card cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumbnail"
        />
        <span className="absolute bottom-2 right-2 bg-background/90 text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src={video.channel.avatar} />
          <AvatarFallback>{video.channel.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-1 group-hover:text-primary-foreground">
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
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCard;
