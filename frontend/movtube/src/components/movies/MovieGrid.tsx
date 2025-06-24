import React from "react";
import type { Movie } from "../../types";
import MovieCard from "./MovieCard";
import EmptyState from "../ui/EmptyState";

interface MovieGridProps {
  movies: Movie[];
  showDetailMode?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  showDetailMode,
  emptyTitle = "No movies found",
  emptyMessage = "Try adjusting your search or filter criteria",
}) => {
  if (!movies.length) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  if (!showDetailMode) {
    return (
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            variant={showDetailMode ? "detailed" : "simple"}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          variant={showDetailMode ? "detailed" : "simple"}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
