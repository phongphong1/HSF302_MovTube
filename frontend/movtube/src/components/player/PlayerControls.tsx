import React from "react";
import type { ControlButtonsProps } from "./PlayerTypes";
import { EpisodeControlButtons } from "./EpisodeNavigation";

const PlayerControls: React.FC<ControlButtonsProps> = ({
  isPlaying,
  isMuted,
  volume,
  isFullscreen,
  movieData,
  togglePlay,
  toggleMute,
  handleVolumeChange,
  toggleFullscreen,
  navigateToEpisode,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Left Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          className="text-white hover:text-red-500 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(e);
          }}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button
            className="text-white hover:text-red-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : volume <= 0.5 ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            className="w-16 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${
                volume * 100
              }%, #4B5563 ${volume * 100}%, #4B5563 100%)`,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Episode Navigation */}
        {(movieData?.prevEpisodeId || movieData?.nextEpisodeId) && (
          <EpisodeControlButtons
            prevEpisodeId={movieData?.prevEpisodeId}
            nextEpisodeId={movieData?.nextEpisodeId}
            navigateToEpisode={navigateToEpisode}
          />
        )}

        {/* Fullscreen Button */}
        <button
          className="text-white hover:text-red-500 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
        >
          {isFullscreen ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
