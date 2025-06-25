import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { FilterOptions, Movie } from "../types";
import MovieGrid from "../components/movies/MovieGrid";
import MovieFilters from "../components/movies/MovieFilters";
import Pagination from "../components/ui/Pagination";
import LoadingState from "../components/ui/LoadingState";
import { useMovies } from "../hooks/useMovies";

const Movies: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy tham số từ URL nếu có
  const queryParams = new URLSearchParams(location.search);
  const genreIdFromUrl = queryParams.get("genreId");
  const pageFromUrl = queryParams.get("page");
  const pageNumber = pageFromUrl ? parseInt(pageFromUrl, 10) : 0;

  const { genres } = useMovies();

  const [isLoading, setIsLoading] = useState(false);
  const [showDetailMode, setShowDetailMode] = useState(true);

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
      currentPage: 0,
      itemsPerPage: 15,
    },
  });

  const API_URL = `${import.meta.env.VITE_API_URL}/movies`;

  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    minRating: 0,
    yearFrom: 1900,
    yearTo: currentYear,
    selectedGenre: genreIdFromUrl || "",
    sortBy: "",
    sortDirection: "desc",
    itemsPerPage: 15,
    currentPage: pageNumber,
  });

  const fetchMovies = useCallback(
    async (filterOptions: FilterOptions) => {
      setIsLoading(true);

      try {
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
  // Theo dõi thay đổi trong URL để cập nhật bộ lọc
  useEffect(() => {
    // Nếu không phải lần đầu mount và URL chứa tham số
    if (!isInitialMount.current && (genreIdFromUrl || pageFromUrl)) {
      // Cập nhật bộ lọc dựa trên URL
      const updatedFilters = {
        ...filters,
        selectedGenre: genreIdFromUrl || filters.selectedGenre,
        currentPage: pageNumber,
      };
      setFilters(updatedFilters);
      fetchMovies(updatedFilters);
    }
  }, [location.search]); // Chỉ chạy lại khi URL thay đổi

  useEffect(() => {
    // Chỉ fetch data khi component được mount lần đầu
    if (isInitialMount.current) {
      fetchMovies(filters);
      isInitialMount.current = false;
    }
  }, [fetchMovies, filters]);

  // Hàm xử lý khi người dùng submit bộ lọc
  const handleFilterSubmit = useCallback(
    (submittedFilters: FilterOptions) => {
      submittedFilters.currentPage = 0;
      setFilters(submittedFilters);
      fetchMovies(submittedFilters);
      if (submittedFilters.selectedGenre) {
        navigate(`/movies?genreId=${submittedFilters.selectedGenre}`, {
          replace: true,
        });
      } else {
        navigate("/movies", { replace: true });
      }
    },
    [fetchMovies, navigate]
  );

  // Hàm xử lý khi người dùng thay đổi trang
  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, currentPage: page };
    setFilters(updatedFilters);
    fetchMovies(updatedFilters);
    if (updatedFilters.selectedGenre) {
      navigate(`/movies?genreId=${updatedFilters.selectedGenre}&page=${page}`, {
        replace: true,
      });
    } else if (page > 0) {
      navigate(`/movies?page=${page}`, { replace: true });
    } else {
      navigate("/movies", { replace: true });
    }
  };

  // Lấy danh sách phim đã lọc và phân trang
  const paginatedMovies = filteredMoviesData.movies;
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
          genres={genres}
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

            <button
              className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition text-sm font-medium flex items-center gap-2"
              onClick={() => setShowDetailMode((prev) => !prev)}
            >
              {showDetailMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                  <path d="M14 4h7" />
                  <path d="M14 9h7" />
                  <path d="M14 15h7" />
                  <path d="M14 20h7" />
                </svg>
              )}
            </button>
          </div>
          {isLoading ? (
            <LoadingState message="Đang tìm kiếm phim..." />
          ) : (
            <MovieGrid
              movies={paginatedMovies}
              showDetailMode={showDetailMode}
              emptyTitle="Không tìm thấy phim nào"
              emptyMessage="Hãy thử điều chỉnh các bộ lọc của bạn"
            />
          )}{" "}
          {totalPages > 1 && !isLoading && (
            <Pagination
              currentPage={filters.currentPage} // This is 0-based, Pagination component will handle the display conversion
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
