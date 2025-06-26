import React from "react";
import type { MoviePlayerData } from "./PlayerTypes";

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

  return (
    <div className="flex justify-center gap-6 mt-6">
      {movieData.prevEpisodeId && (
        <button
          onClick={() => navigateToEpisode(movieData.prevEpisodeId!)}
          className="w-36 px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full hover:from-red-700 hover:to-red-600 transition duration-300 shadow-lg flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Tập trước
        </button>
      )}
      {movieData.nextEpisodeId && (
        <button
          onClick={() => navigateToEpisode(movieData.nextEpisodeId!)}
          className="w-36 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition duration-300 shadow-lg flex items-center justify-center"
        >
          Tập tiếp theo
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default EpisodeButtons;
