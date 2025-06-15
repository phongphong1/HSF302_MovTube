import React from "react";
import { Link } from "react-router-dom";
import type { MovieCardProps } from "../../types";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="group">
      <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl bg-gray-800">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-black bg-opacity-70 text-yellow-400 text-sm font-bold px-2 py-1 rounded-md">
            ★ {movie.rating}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">{movie.year}</span>
            <span className="text-gray-300">{movie.duration}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
            {movie.genres.length > 2 && (
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                +{movie.genres.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
