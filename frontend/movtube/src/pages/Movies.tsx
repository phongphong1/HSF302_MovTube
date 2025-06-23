import React, { useState, useEffect, useCallback } from "react";
import type { FilterOptions, Movie } from "../types";
import { allMovies, allGenres } from "../data/moviesData";
import MovieGrid from "../components/movies/MovieGrid";
import MovieFilters from "../components/movies/MovieFilters";
import Pagination from "../components/ui/Pagination";
import LoadingState from "../components/ui/LoadingState";

const Movies: React.FC = () => {
  // Current year for range defaults
  const currentYear = new Date().getFullYear();

  // Create genres array in the format expected by the new component
  const genresFormatted = allGenres
    .filter((genre) => genre) // Filter out any undefined values
    .map((genre, index) => ({
      id: index + 1,
      name: String(genre), // Convert to string safely
    }));

  // State for loading and filtered movies
  const [isLoading, setIsLoading] = useState(false);
  // Định nghĩa kiểu dữ liệu mới để lưu thông tin phân trang từ backend
  const [filteredMoviesData, setFilteredMoviesData] = useState<{
    movies: Movie[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }>({
    movies: [],
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 12,
    },
  });

  // State for all filters
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    minRating: 0,
    yearFrom: 1900,
    yearTo: currentYear,
    selectedGenre: "",
    sortBy: null,
    sortDirection: null,
    itemsPerPage: 12,
    currentPage: 1,
  });

  // Function to fetch movies from API with pagination handled by the backend
  const fetchMovies = useCallback(
    async (filterOptions: FilterOptions) => {
      setIsLoading(true);

      try {
        // This would be an API call in a real implementation
        // For now, we'll simulate a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mô phỏng API call với phân trang ở backend
        // Trong thực tế, đây sẽ là một fetch/axios call đến API của bạn
        // API sẽ trả về cả dữ liệu phim đã phân trang và metadata phân trang
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Trong thực tế, bạn có thể muốn set một state error
      } finally {
        setIsLoading(false);
      }
    },
    [genresFormatted]
  );

  // Initial fetch on component mount
  useEffect(() => {
    fetchMovies(filters);
  }, [fetchMovies]);

  // Handle form submission - this is where we would call the API
  const handleFilterSubmit = useCallback(
    (submittedFilters: FilterOptions) => {
      // Cập nhật state filter và gọi API
      setFilters(submittedFilters);
      fetchMovies(submittedFilters);
    },
    [fetchMovies]
  ); // Handle page change - gọi API mới từ backend với trang đã thay đổi
  const handlePageChange = (page: number) => {
    // Cập nhật state filter và gọi API với trang mới
    const updatedFilters = { ...filters, currentPage: page };
    setFilters(updatedFilters);
    fetchMovies(updatedFilters);
  };
  // Lấy danh sách phim đã được phân trang từ backend
  const paginatedMovies = filteredMoviesData.movies;

  // Lấy thông tin phân trang từ backend
  const totalMovies = filteredMoviesData.pagination.totalItems;
  const totalPages = filteredMoviesData.pagination.totalPages;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Khám phá những bộ phim thú vị
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tìm kiếm và khám phá bộ sưu tập phim đa dạng của chúng tôi. Dễ dàng
            tìm thấy những bộ phim yêu thích, thể loại mới và các bộ phim hot
            nhất hiện nay.
          </p>
        </div>{" "}
        {/* Search and Filter Section */}
        <MovieFilters
          filters={filters}
          onFilterSubmit={handleFilterSubmit}
          genres={genresFormatted}
          totalMovies={totalMovies}
          isLoading={isLoading}
        />
        {/* Movie Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Tìm thấy {totalMovies} phim
              {filters.searchTerm && (
                <span className="ml-1 text-gray-400">
                  cho "{filters.searchTerm}"
                </span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <LoadingState message="Đang tìm kiếm phim..." />
          ) : (
            <MovieGrid
              movies={paginatedMovies}
              emptyTitle="Không tìm thấy phim nào"
              emptyMessage="Hãy thử điều chỉnh các bộ lọc của bạn"
            />
          )}

          {totalPages > 1 && !isLoading && (
            <Pagination
              currentPage={filters.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
