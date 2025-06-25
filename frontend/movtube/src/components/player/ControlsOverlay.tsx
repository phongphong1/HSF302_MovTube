import React from "react";
import VideoTitle from "./VideoTitle";
import ProgressBar from "./ProgressBar";
import PlayerControls from "./PlayerControls";
import type { MoviePlayerData } from "./PlayerTypes";

interface ControlsOverlayProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isControlsVisible: boolean;
  movieData: MoviePlayerData | null;
  formatTime: (timeInSeconds: number) => string;
  togglePlay: (e?: React.MouseEvent) => void;
  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFullscreen: () => void;
  navigateToEpisode: (episodeId: string) => void;
}

const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  isPlaying,
  isMuted,
  volume,
  currentTime,
  duration,
  isFullscreen,
  isControlsVisible,
  movieData,
  formatTime,
  togglePlay,
  toggleMute,
  handleVolumeChange,
  handleSeek,
  toggleFullscreen,
  navigateToEpisode,
}) => {
  if (!isControlsVisible) {
    return null;
  }

  return (
    <>
      {/* Play/Pause Overlay - Big button in center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <button
          className="bg-white bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(e);
          }}
        >
          {isPlaying ? (
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        {/* Title & Episode */}
        {movieData && (
          <VideoTitle
            title={movieData.title}
            episode={movieData.episode}
            episodeTitle={movieData.episodeTitle}
          />
        )}

        {/* Progress Bar */}
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
          handleSeek={handleSeek}
        />

        {/* Control Buttons */}
        <PlayerControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          isFullscreen={isFullscreen}
          movieData={movieData || undefined}
          togglePlay={togglePlay}
          toggleMute={toggleMute}
          handleVolumeChange={handleVolumeChange}
          toggleFullscreen={toggleFullscreen}
          navigateToEpisode={navigateToEpisode}
        />
      </div>
    </>
  );
};

export default ControlsOverlay;
