import VideoCard, { Video } from "./VideoCard";

const videos: Video[] = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=640&h=360&fit=crop",
    title: "How to Build a YouTube Clone with React and TypeScript - Full Tutorial",
    channel: {
      name: "Code Academy",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
    },
    views: "1.2M",
    uploadedAt: "2 weeks ago",
    duration: "32:15",
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=360&fit=crop",
    title: "10 JavaScript Tips Every Developer Should Know",
    channel: {
      name: "Dev Tips",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    views: "856K",
    uploadedAt: "5 days ago",
    duration: "18:42",
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&h=360&fit=crop",
    title: "Building the Future of Gaming: Next-Gen Graphics Explained",
    channel: {
      name: "Tech Insider",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    views: "2.1M",
    uploadedAt: "1 month ago",
    duration: "24:08",
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f7e24?w=640&h=360&fit=crop",
    title: "Morning Routine for Maximum Productivity - Life Changing Habits",
    channel: {
      name: "Life Mastery",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    views: "3.4M",
    uploadedAt: "3 weeks ago",
    duration: "15:30",
  },
  {
    id: "5",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=640&h=360&fit=crop",
    title: "Learn Piano in 30 Days - Complete Beginner's Guide",
    channel: {
      name: "Music Masters",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    },
    views: "987K",
    uploadedAt: "1 week ago",
    duration: "45:22",
  },
  {
    id: "6",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop",
    title: "Gordon Ramsay's Ultimate Cooking Masterclass",
    channel: {
      name: "Culinary Arts",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    },
    views: "5.6M",
    uploadedAt: "2 months ago",
    duration: "1:02:45",
  },
  {
    id: "7",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=360&fit=crop",
    title: "AI Revolution: How Machine Learning is Changing Everything",
    channel: {
      name: "Future Tech",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    views: "1.8M",
    uploadedAt: "4 days ago",
    duration: "28:15",
  },
  {
    id: "8",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=360&fit=crop",
    title: "CSS Grid vs Flexbox - When to Use What",
    channel: {
      name: "Web Dev Simplified",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    },
    views: "425K",
    uploadedAt: "6 days ago",
    duration: "12:33",
  },
  {
    id: "9",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&h=360&fit=crop",
    title: "Cybersecurity 101: Protect Yourself Online",
    channel: {
      name: "Security Now",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    views: "678K",
    uploadedAt: "2 weeks ago",
    duration: "21:08",
  },
  {
    id: "10",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=360&fit=crop",
    title: "Remote Work Setup Tour - My Minimal Home Office",
    channel: {
      name: "Setup Tours",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    views: "1.1M",
    uploadedAt: "1 month ago",
    duration: "16:45",
  },
  {
    id: "11",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&h=360&fit=crop",
    title: "30 Minute Full Body Workout - No Equipment Needed",
    channel: {
      name: "Fitness Pro",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    views: "4.2M",
    uploadedAt: "3 days ago",
    duration: "31:22",
  },
  {
    id: "12",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&h=360&fit=crop",
    title: "Space Exploration: Journey to Mars Documentary",
    channel: {
      name: "Space Channel",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop",
    },
    views: "7.8M",
    uploadedAt: "2 months ago",
    duration: "58:30",
  },
];

const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
