import React from "react";
import SearchInput from "../ui/SearchInput";
import SelectInput from "../ui/SelectInput";
import type { SortOption } from "../../types";

interface MovieFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  genres: string[];
}

const MovieFilters: React.FC<MovieFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  genres,
}) => {
  const genreOptions = [
    { value: "", label: "All Genres" },
    ...genres.map((genre) => ({ value: genre, label: genre })),
  ];

  const sortOptions = [
    { value: "rating", label: "Rating (High to Low)" },
    { value: "year", label: "Year (Newest First)" },
    { value: "title", label: "Title (A-Z)" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          label="Search Movies"
          placeholder="Search by title..."
        />

        <SelectInput
          id="genre"
          value={selectedGenre}
          onChange={setSelectedGenre}
          options={genreOptions}
          label="Filter by Genre"
        />

        <SelectInput
          id="sort"
          value={sortBy}
          onChange={(value) => setSortBy(value as SortOption)}
          options={sortOptions}
          label="Sort By"
        />
      </div>
    </div>
  );
};

export default MovieFilters;
