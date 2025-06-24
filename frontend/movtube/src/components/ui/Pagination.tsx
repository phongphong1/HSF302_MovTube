import React from "react";

interface PaginationProps {
  currentPage: number; // This is expected to be 0-based (from the backend)
  totalPages: number;
  onPageChange: (page: number) => void; // This should receive 0-based page for the backend
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Convert 0-based currentPage to 1-based for UI display
  const displayPage = currentPage + 1;

  // Generate an array of page numbers to display (1-based for UI)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate the range of pages to show around current display page
      let startPage = Math.max(2, displayPage - 1);
      let endPage = Math.min(totalPages - 1, displayPage + 1);

      // Adjust if we're near the beginning
      if (displayPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (displayPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(null); // null represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(null); // null represents ellipsis
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 rounded-l-md border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &laquo; Trước
        </button>

        {pages.map((page, index) =>
          page === null ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1 border border-gray-700 bg-gray-800 text-gray-300"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange((page as number) - 1)} // Convert 1-based UI page to 0-based index for backend
              className={`px-3 py-1 border border-gray-700 ${
                displayPage === page
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() =>
            currentPage < totalPages - 1 && onPageChange(currentPage + 1)
          }
          disabled={currentPage >= totalPages - 1}
          className="px-3 py-1 rounded-r-md border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tiếp &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
