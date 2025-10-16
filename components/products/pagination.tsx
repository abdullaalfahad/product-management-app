import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { generatePageNumbers } from "@/utils/helpers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 mx-2">
          {visiblePages.map((page) =>
            page === "..." ? (
              <span
                key={`dots-${page}`}
                className="px-2 text-gray-400 select-none"
              >
                •••
              </span>
            ) : (
              <button
                type="button"
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`inline-flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      <div className="ml-4 text-sm text-gray-600 hidden sm:block">
        Page <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-gray-900">{totalPages}</span>
      </div>
    </div>
  );
}
