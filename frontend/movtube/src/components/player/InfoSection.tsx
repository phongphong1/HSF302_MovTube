import React from "react";
import { Link } from "react-router-dom";
import EpisodeNavigation from "./EpisodeNavigation";
import type { MoviePlayerData } from "./PlayerTypes";

interface InfoSectionProps {
  movieData: MoviePlayerData | null;
  navigateToEpisode: (episodeId: string) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  movieData,
  navigateToEpisode,
}) => {
  if (!movieData) return null;

  return (
    <div className="bg-gray-900 flex-grow p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {movieData?.title}
            </h1>
            {movieData?.originalName && (
              <p className="text-gray-400 text-sm md:text-base italic">
                {movieData.originalName}
              </p>
            )}
            {movieData?.episode && (
              <p className="text-gray-300 text-sm md:text-base mt-2">
                Episode {movieData.episode}: {movieData.episodeTitle}
              </p>
            )}
          </div>

          <Link
            to={`/movies/${movieData.id}`}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Details
          </Link>
        </div>

        {/* Episode Navigation Buttons (for mobile) */}
        <EpisodeNavigation
          prevEpisodeId={movieData.prevEpisodeId}
          nextEpisodeId={movieData.nextEpisodeId}
          navigateToEpisode={navigateToEpisode}
        />
      </div>
    </div>
  );
};

export default InfoSection;
