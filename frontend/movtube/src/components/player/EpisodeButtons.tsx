import React from "react";
import type { MoviePlayerData } from "./PlayerTypes";
import EpisodeSelector from "../movies/EpisodeSelector";

interface EpisodeButtonsProps {
  movieData: MoviePlayerData | null;
}

const EpisodeButtons: React.FC<EpisodeButtonsProps> = ({ movieData }) => {
  if (!movieData || (!movieData.prevEpisodeId && !movieData.nextEpisodeId)) {
    return null;
  }

  const navigateToEpisode = (episodeId: string) => {
    window.location.href = `/movies/watch/${episodeId}`;
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 px-4">
      <div className="flex justify-between items-center">
        {/* Previous Episode - Left corner */}
        <div className="flex-shrink-0">
          {movieData.prevEpisodeId ? (
            <button
              onClick={() => navigateToEpisode(movieData.prevEpisodeId!)}
              className="group px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-red-500/30 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="font-medium">Tập trước</span>
            </button>
          ) : (
            <div className="w-[100px]">
              {/* Spacer when no previous episode */}
            </div>
          )}
        </div>

        {/* Center button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="group px-5 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-gray-500/30 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            <span className="font-medium">Chọn tập</span>
          </button>
        </div>

        {/* Next Episode - Right corner */}
        <div className="flex-shrink-0">
          {movieData.nextEpisodeId ? (
            <button
              onClick={() => navigateToEpisode(movieData.nextEpisodeId!)}
              className="group px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-red-500/30 flex items-center"
            >
              <span className="font-medium">Tập sau</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          ) : (
            <div className="w-[100px]">{/* Spacer when no next episode */}</div>
          )}
        </div>
      </div>
      <EpisodeSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        episodes={movieData.episodes || []}
        currentEpisode={movieData.id}
        onSelectEpisode={(episodeId: string) => {
          setIsOpen(false);
          navigateToEpisode(episodeId);
        }}
      />
    </div>
  );
};

export default EpisodeButtons;
