import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { searchShorts, YouTubeVideo } from "@/services/youtubeApi";
import { ThumbsUp, ThumbsDown, Share2, MoreVertical, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Shorts = () => {
  const [shorts, setShorts] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { videos } = await searchShorts(10);
      setShorts(videos);
      setLoading(false);
    };
    load();
  }, []);

  // Use IntersectionObserver per item to detect which is fully visible
  useEffect(() => {
    if (shorts.length === 0) return;

    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.7 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [shorts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      <Header onMenuClick={() => {}} searchQuery={searchQuery} onSearchChange={handleSearch} />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      ) : (
        <div
          className="h-screen overflow-y-scroll snap-y snap-mandatory pt-14 pb-16 md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {shorts.map((short, i) => (
            <div
              key={short.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="snap-start flex items-center justify-center relative bg-black"
              style={{ height: "calc(100vh - 56px)", minHeight: 0 }}
            >
              <div className="relative w-full max-w-[400px] h-full mx-auto" style={{ aspectRatio: "9/16" }}>
                {activeIndex === i ? (
                  <iframe
                    key={`${short.id}-active`}
                    src={`https://www.youtube.com/embed/${short.id}?autoplay=1&loop=1&playlist=${short.id}&controls=1&modestbranding=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={short.thumbnail}
                    alt={short.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Channel + title */}
                <div className="absolute bottom-6 left-3 right-16 text-white pointer-events-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8 border border-white">
                      <AvatarImage src={short.channel.avatar} />
                      <AvatarFallback>{short.channel.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium drop-shadow">{short.channel.name}</span>
                  </div>
                  <p className="text-sm line-clamp-2 drop-shadow">{short.title}</p>
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-6 right-2 flex flex-col items-center gap-5 text-white">
                  <button className="flex flex-col items-center gap-1">
                    <ThumbsUp className="h-6 w-6 drop-shadow" />
                    <span className="text-xs">{short.views}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <ThumbsDown className="h-6 w-6 drop-shadow" />
                    <span className="text-xs">Dislike</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <Share2 className="h-6 w-6 drop-shadow" />
                    <span className="text-xs">Share</span>
                  </button>
                  <button>
                    <MoreVertical className="h-6 w-6 drop-shadow" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Shorts;
