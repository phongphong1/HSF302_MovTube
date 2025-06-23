import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import type { FilterOptions, Movie } from "../types";
import { allGenres } from "../data/moviesData";
import MovieGrid from "../components/movies/MovieGrid";
import MovieFilters from "../components/movies/MovieFilters";
import Pagination from "../components/ui/Pagination";
import LoadingState from "../components/ui/LoadingState";

const Movies: React.FC = () => {
  // Current year for range defaults
  const currentYear = new Date().getFullYear();
  // Create genres array in the format expected by the new component
  // Use useMemo to prevent recreation of this array on each render
  const genresFormatted = useMemo(
    () =>
      allGenres
        .filter((genre) => genre) // Filter out any undefined values
        .map((genre, index) => ({
          id: index + 1,
          name: String(genre), // Convert to string safely
        })),
    [] // Empty dependency array means this only runs once
  );

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

  const API_URL = `${import.meta.env.VITE_API_URL}/movies`;

  // State for all filters
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    minRating: 0,
    yearFrom: 1900,
    yearTo: currentYear,
    selectedGenre: "",
    sortBy: "",
    sortDirection: "desc",
    itemsPerPage: 12,
    currentPage: 1,
  });
  // Function to fetch movies from API with pagination handled by the backend
  const fetchMovies = useCallback(
    async (filterOptions: FilterOptions) => {
      setIsLoading(true);

      try {
        // Simulate API call with filters and pagination
        const response = await fetch(
          `${API_URL}/search?query=${encodeURIComponent(
            filterOptions.searchTerm
          )}&minRating=${filterOptions.minRating}&fromYear=${
            filterOptions.yearFrom
          }&toYear=${filterOptions.yearTo}&genreId=${
            filterOptions.selectedGenre
          }&sortBy=${filterOptions.sortBy}&sortDirection=${
            filterOptions.sortDirection
          }&size=${filterOptions.itemsPerPage}&page=${
            filterOptions.currentPage
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        console.log("Fetched movies:", data);
        // Update state with fetched movies and pagination info
        setFilteredMoviesData(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [] // Loại bỏ genresFormatted từ dependencies vì nó không được sử dụng trong hàm
  );
  // Initial fetch on component mount - sử dụng useRef để đảm bảo chỉ fetch một lần
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Chỉ fetch data khi component được mount lần đầu
    if (isInitialMount.current) {
      fetchMovies(filters);
      isInitialMount.current = false;
    }
  }, [fetchMovies, filters]);

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
