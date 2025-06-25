import React from "react";
import type { EpisodeNavigationProps } from "./PlayerTypes";

// Component for navigation buttons in the player controls
export const EpisodeControlButtons: React.FC<EpisodeNavigationProps> = ({
  prevEpisodeId,
  nextEpisodeId,
  navigateToEpisode,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {prevEpisodeId && (
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white text-xs rounded px-2 py-1"
          onClick={(e) => {
            e.stopPropagation();
            navigateToEpisode(prevEpisodeId);
          }}
        >
          Prev Episode
        </button>
      )}

      {nextEpisodeId && (
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white text-xs rounded px-2 py-1"
          onClick={(e) => {
            e.stopPropagation();
            navigateToEpisode(nextEpisodeId);
          }}
        >
          Next Episode
        </button>
      )}
    </div>
  );
};

// Component for navigation buttons below the player (mobile friendly)
const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({
  prevEpisodeId,
  nextEpisodeId,
  navigateToEpisode,
}) => {
  if (!prevEpisodeId && !nextEpisodeId) {
    return null;
  }

  return (
    <div className="flex justify-center gap-4 my-8">
      {prevEpisodeId && (
        <button
          onClick={() => navigateToEpisode(prevEpisodeId)}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
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
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous Episode
        </button>
      )}

      {nextEpisodeId && (
        <button
          onClick={() => navigateToEpisode(nextEpisodeId)}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          Next Episode
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default EpisodeNavigation;
