import React, { useState } from "react";
import type { SortOption } from "../types";
import { allMovies, allGenres } from "../data/moviesData";
import MovieGrid from "../components/movies/MovieGrid";
import MovieFilters from "../components/movies/MovieFilters";

const Movies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  // Filter and sort movies based on search, genre, and sort criteria
  const filteredMovies = allMovies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === "" || movie.genres.includes(selectedGenre))
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Explore Movies</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our vast collection of movies across all genres. From
            blockbuster hits to indie gems, we have something for everyone.
          </p>
        </div>

        {/* Search and Filter Section */}
        <MovieFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          genres={allGenres}
        />

        {/* Movie Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "Movie" : "Movies"} Found
            </h2>
          </div>

          <MovieGrid
            movies={filteredMovies}
            emptyTitle="No movies found"
            emptyMessage="Try adjusting your search or filter criteria"
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
