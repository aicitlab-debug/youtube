import { YOUTUBE_API_KEY, YOUTUBE_API_BASE_URL } from "@/config/youtube";

export interface YouTubeVideo {
  id: string;
  thumbnail: string;
  title: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
  };
  views: string;
  uploadedAt: string;
  duration: string;
}

export interface PaginatedResult {
  videos: YouTubeVideo[];
  nextPageToken?: string;
}

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
    };
  };
}

interface YouTubeVideoDetails {
  id: string;
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

interface YouTubeChannelDetails {
  id: string;
  snippet: {
    thumbnails: {
      default: { url: string };
    };
  };
}

const formatViewCount = (count: string | undefined): string => {
  if (!count) return "0";
  const num = parseInt(count, 10);
  if (isNaN(num)) return "0";
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return count;
};

const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  
  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formatUploadDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const searchYouTubeVideos = async (
  query: string = "",
  maxResults: number = 12,
  pageToken?: string
): Promise<PaginatedResult> => {
  try {
    let searchUrl = `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
      query || "trending"
    )}&key=${YOUTUBE_API_KEY}`;
    if (pageToken) searchUrl += `&pageToken=${pageToken}`;
    
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) throw new Error("Failed to fetch videos");
    
    const searchData = await searchResponse.json();
    const items: YouTubeSearchItem[] = searchData.items || [];
    const nextPageToken = searchData.nextPageToken;
    
    if (items.length === 0) return { videos: [], nextPageToken: undefined };
    
    // Get video details (duration, view count)
    const videoIds = items.map((item) => item.id.videoId).join(",");
    const videoDetailsUrl = `${YOUTUBE_API_BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    
    const videoDetailsResponse = await fetch(videoDetailsUrl);
    const videoDetailsData = await videoDetailsResponse.json();
    const videoDetails: YouTubeVideoDetails[] = videoDetailsData.items || [];
    
    // Get channel avatars
    const channelIds = [...new Set(items.map((item) => item.snippet.channelId))].join(",");
    const channelDetailsUrl = `${YOUTUBE_API_BASE_URL}/channels?part=snippet&id=${channelIds}&key=${YOUTUBE_API_KEY}`;
    
    const channelDetailsResponse = await fetch(channelDetailsUrl);
    const channelDetailsData = await channelDetailsResponse.json();
    const channelDetails: YouTubeChannelDetails[] = channelDetailsData.items || [];
    
    const channelAvatarMap = new Map(
      channelDetails.map((channel) => [
        channel.id,
        channel.snippet.thumbnails.default.url,
      ])
    );
    
    const videoDetailsMap = new Map(
      videoDetails.map((video) => [video.id, video])
    );
    
    const videos = items.map((item) => {
      const details = videoDetailsMap.get(item.id.videoId);
      return {
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        channel: {
          id: item.snippet.channelId,
          name: item.snippet.channelTitle,
          avatar: channelAvatarMap.get(item.snippet.channelId) || "",
        },
        views: details ? formatViewCount(details.statistics.viewCount) : "0",
        uploadedAt: formatUploadDate(item.snippet.publishedAt),
        duration: details ? formatDuration(details.contentDetails.duration) : "0:00",
      };
    });
    return { videos, nextPageToken };
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return { videos: [], nextPageToken: undefined };
  }
};

export const getPopularVideos = async (maxResults: number = 12, pageToken?: string): Promise<PaginatedResult> => {
  try {
    let url = `${YOUTUBE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    if (pageToken) url += `&pageToken=${pageToken}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch popular videos");
    
    const data = await response.json();
    const items = data.items || [];
    const nextPageToken = data.nextPageToken;
    
    if (items.length === 0) return { videos: [], nextPageToken: undefined };
    
    const channelIds = [...new Set(items.map((item: any) => item.snippet.channelId))].join(",");
    const channelDetailsUrl = `${YOUTUBE_API_BASE_URL}/channels?part=snippet&id=${channelIds}&key=${YOUTUBE_API_KEY}`;
    
    const channelDetailsResponse = await fetch(channelDetailsUrl);
    const channelDetailsData = await channelDetailsResponse.json();
    const channelDetails: YouTubeChannelDetails[] = channelDetailsData.items || [];
    
    const channelAvatarMap = new Map(
      channelDetails.map((channel) => [
        channel.id,
        channel.snippet.thumbnails.default.url,
      ])
    );
    
    const videos = items.map((item: any) => ({
      id: item.id,
      thumbnail: item.snippet.thumbnails.high.url,
      title: item.snippet.title,
      channel: {
        id: item.snippet.channelId,
        name: item.snippet.channelTitle,
        avatar: channelAvatarMap.get(item.snippet.channelId) || "",
      },
      views: formatViewCount(item.statistics?.viewCount),
      uploadedAt: formatUploadDate(item.snippet.publishedAt),
      duration: formatDuration(item.contentDetails.duration),
    }));
    return { videos, nextPageToken };
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    return { videos: [], nextPageToken: undefined };
  }
};

export const getVideoDetails = async (videoId: string): Promise<YouTubeVideo | null> => {
  try {
    const url = `${YOUTUBE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch video details");
    
    const data = await response.json();
    const item = data.items?.[0];
    if (!item) return null;

    const channelUrl = `${YOUTUBE_API_BASE_URL}/channels?part=snippet&id=${item.snippet.channelId}&key=${YOUTUBE_API_KEY}`;
    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();
    const channelAvatar = channelData.items?.[0]?.snippet?.thumbnails?.default?.url || "";

    return {
      id: item.id,
      thumbnail: item.snippet.thumbnails.high.url,
      title: item.snippet.title,
      channel: {
        id: item.snippet.channelId,
        name: item.snippet.channelTitle,
        avatar: channelAvatar,
      },
      views: formatViewCount(item.statistics?.viewCount),
      uploadedAt: formatUploadDate(item.snippet.publishedAt),
      duration: formatDuration(item.contentDetails.duration),
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
};
