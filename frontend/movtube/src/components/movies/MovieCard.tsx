import React from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../types";
import {
  getMovieRating,
  getMoviePosterUrl,
  formatDuration,
} from "../../utils/movieUtils";

interface MovieCardProps {
  movie: Movie;
  variant?: "detailed" | "simple";
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = "detailed",
}) => {
  // Handle possible undefined values safely using utility functions
  const rating = getMovieRating(movie);
  const imageUrl = getMoviePosterUrl(movie);
  const genres = movie.genres || [];

  if (variant === "simple") {
    return (
      <Link
        to={`/movies/${movie.id}`}
        className="flex items-center gap-6 p-4 bg-gray-800 rounded-xl shadow hover:bg-gray-700 transition min-h-[120px]"
      >
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-28 h-40 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div className="flex items-baseline gap-2">
            <h3 className="text-white font-bold text-lg truncate">
              {movie.title}
            </h3>
            {movie.originalName && (
              <span className="text-gray-400 text-sm truncate">
                ({movie.originalName})
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-yellow-400 text-base font-semibold">
              ★ {rating.toFixed(1)}
            </span>
            <span className="text-gray-300 text-sm">{movie.year}</span>
            {movie.totalEpisodes && movie.totalEpisodes > 1 && (
              <span className="text-gray-300 text-sm">
                {movie.totalEpisodes} tập
              </span>
            )}
          </div>
          {Array.isArray(genres) && genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {genres.slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded"
                >
                  {typeof genre === "string" ? genre : genre?.name}
                </span>
              ))}
              {genres.length > 2 && (
                <span className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded">
                  +{genres.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group"
      title={
        movie.title + (movie.originalName ? ` (${movie.originalName})` : "")
      }
    >
      <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl bg-gray-800">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-black bg-opacity-70 text-yellow-400 text-sm font-bold px-2 py-1 rounded-md">
            ★ {rating.toFixed(1)}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
            {movie.title}
          </h3>
          {movie.originalName && (
            <p className="text-gray-400 text-sm mb-2 line-clamp-1">
              {movie.originalName}
            </p>
          )}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">{movie.year}</span>
            <span className="text-gray-300">
              {movie.duration ||
                (movie.durationMinutes
                  ? formatDuration(movie.durationMinutes)
                  : "")}
            </span>
          </div>
          {Array.isArray(genres) && genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded"
                >
                  {typeof genre === "string" ? genre : genre?.name}
                </span>
              ))}
              {genres.length > 2 && (
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                  +{genres.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
