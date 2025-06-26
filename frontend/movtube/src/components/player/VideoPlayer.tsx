import React, { useRef } from "react";
import VideoElement from "./VideoElement";
import EpisodeButtons from "./EpisodeButtons";
import type { MoviePlayerData, VideoElementHandle } from "./PlayerTypes";

interface VideoPlayerProps {
  movieData: MoviePlayerData | null;
  isLoading: boolean;
  onError: (error: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  movieData,
  isLoading: _isLoading,
  onError,
}) => {
  const videoPlayerRef = useRef<VideoElementHandle | null>(null);

  return (
    <div className="flex flex-col items-center w-full py-4">
      {/* Video player container with improved styling */}
      <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,0,0,0.3)]">
        {/* Video Element with browser controls */}
        {movieData && (
          <VideoElement
            ref={videoPlayerRef}
            videoUrl={movieData.videoUrl}
            posterUrl={movieData.posterUrl}
            onLoadingChange={() => {}}
            onError={onError}
          />
        )}
      </div>

      {/* Episode navigation buttons */}
      <EpisodeButtons movieData={movieData} />
    </div>
  );
};

export default VideoPlayer;
