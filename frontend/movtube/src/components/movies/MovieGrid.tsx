import React from "react";
import type { Movie } from "../../types";
import MovieCard from "./MovieCard";
import EmptyState from "../ui/EmptyState";

interface MovieGridProps {
  movies: Movie[];
  emptyTitle?: string;
  emptyMessage?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  emptyTitle = "No movies found",
  emptyMessage = "Try adjusting your search or filter criteria",
}) => {
  if (!movies.length) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
