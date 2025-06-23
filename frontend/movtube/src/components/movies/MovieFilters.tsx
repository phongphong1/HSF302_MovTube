import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import SearchInput from "../ui/SearchInput";
import SelectInput from "../ui/SelectInput";
import RangeSlider from "../ui/RangeSlider";
import type { SortOption, SortDirection, FilterOptions } from "../../types";

interface MovieFiltersProps {
  filters: FilterOptions;
  onFilterSubmit: (filters: FilterOptions) => void;
  genres: { id: number; name: string }[];
  totalMovies: number;
  isLoading?: boolean;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({
  filters,
  onFilterSubmit,
  genres,
  totalMovies,
  isLoading = false,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  // Update local state when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Get current year for range limits
  const currentYear = new Date().getFullYear();
  const oldestYear = 1900;

  const genreOptions = [
    { value: "", label: "Tất cả thể loại" },
    ...genres.map((genre) => ({
      value: genre.id.toString(),
      label: genre.name,
    })),
  ];

  const sortOptions = [
    { value: "", label: "Mặc định" },
    { value: "averageRating", label: "Đánh giá" },
    { value: "year", label: "Năm phát hành" },
    { value: "title", label: "Tiêu đề" },
  ];

  const sortDirectionOptions = [
    { value: "desc", label: "Giảm dần" },
    { value: "asc", label: "Tăng dần" },
  ];

  const itemsPerPageOptions = [
    { value: "15", label: "15 phim" },
    { value: "30", label: "30 phim" },
    { value: "45", label: "45 phim" },
    { value: "60", label: "60 phim" },
  ];

  // Handle local filter changes
  const handleLocalFilterChange = (changes: Partial<FilterOptions>) => {
    setLocalFilters((prev) => ({ ...prev, ...changes }));
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilterSubmit(localFilters);
  };
  // Reset filters to default values
  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      searchTerm: "",
      minRating: 0,
      yearFrom: oldestYear,
      yearTo: currentYear,
      selectedGenre: "",
      sortBy: "",
      sortDirection: "desc",
      itemsPerPage: 12,
      currentPage: 0,
    };
    setLocalFilters(defaultFilters);
    // Thực hiện submit luôn sau khi reset
    onFilterSubmit(defaultFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SearchInput
          value={localFilters.searchTerm}
          onChange={(value) => handleLocalFilterChange({ searchTerm: value })}
          label="Tìm kiếm phim"
          placeholder="Tìm theo tên phim..."
        />

        <SelectInput
          id="genre"
          value={localFilters.selectedGenre}
          onChange={(value) =>
            handleLocalFilterChange({ selectedGenre: value })
          }
          options={genreOptions}
          label="Lọc theo thể loại"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-sm text-red-400 hover:text-red-300 flex items-center"
        >
          {showAdvancedFilters
            ? "Ẩn bộ lọc nâng cao"
            : "Hiển thị bộ lọc nâng cao"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 transition-transform duration-200 ${
              showAdvancedFilters ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div className="text-sm text-gray-400">
          Tìm thấy: <span className="font-bold">{totalMovies}</span> phim
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="border-t border-gray-700 pt-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <RangeSlider
              id="rating"
              min={0}
              max={10}
              step={0.5}
              value={localFilters.minRating}
              onChange={(value) =>
                handleLocalFilterChange({ minRating: value })
              }
              label="Điểm đánh giá tối thiểu"
            />{" "}
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Năm phát hành
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min={oldestYear}
                    max={currentYear}
                    value={localFilters.yearFrom}
                    onChange={(e) =>
                      handleLocalFilterChange({
                        yearFrom: parseInt(e.target.value) || oldestYear,
                      })
                    }
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Từ năm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    min={oldestYear}
                    max={currentYear}
                    value={localFilters.yearTo}
                    onChange={(e) =>
                      handleLocalFilterChange({
                        yearTo: parseInt(e.target.value) || currentYear,
                      })
                    }
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Đến năm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectInput
              id="sort"
              value={localFilters.sortBy}
              onChange={(value) =>
                handleLocalFilterChange({ sortBy: value as SortOption })
              }
              options={sortOptions}
              label="Sắp xếp theo"
            />

            <SelectInput
              id="sortDirection"
              value={localFilters.sortDirection}
              onChange={(value) =>
                handleLocalFilterChange({
                  sortDirection: value as SortDirection,
                })
              }
              options={sortDirectionOptions}
              label="Hướng sắp xếp"
            />

            <SelectInput
              id="itemsPerPage"
              value={localFilters.itemsPerPage.toString()}
              onChange={(value) =>
                handleLocalFilterChange({ itemsPerPage: parseInt(value) })
              }
              options={itemsPerPageOptions}
              label="Số lượng phim mỗi trang"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6 gap-3">
        <button
          type="button"
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
        >
          Đặt lại
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Đang xử lý</span>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            "Tìm kiếm"
          )}
        </button>
      </div>
    </form>
  );
};

export default MovieFilters;
