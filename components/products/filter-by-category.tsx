import { Filter, Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetCategoriesQuery } from "@/redux/services/category-api";
import {
  setCategory,
  setSearchText,
} from "@/redux/slices/product-filter-slice";

export function ProductFilters() {
  const dispatch = useAppDispatch();
  const { categoryId, searchText } = useAppSelector(
    (state) => state.productFilter,
  );
  const { data: categories = [] } = useGetCategoriesQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchText(value));
  };

  const clearSearch = () => {
    dispatch(setSearchText(""));
  };

  const clearCategory = () => {
    dispatch(setCategory(null));
  };

  const hasActiveFilters = categoryId || searchText;

  return (
    <div className="space-y-4 mt-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search products by name..."
            className="w-full pl-12 pr-12 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
          />
          {searchText && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="relative md:w-64">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={categoryId || ""}
            onChange={(e) =>
              dispatch(
                setCategory(e.target.value === "" ? null : e.target.value),
              )
            }
            className="w-full pl-12 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">
            Active Filters:
          </span>

          {searchText && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">
              <span>Search: "{searchText}"</span>
              <button
                type="button"
                onClick={clearSearch}
                className="hover:bg-blue-100 cursor-pointer rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {categoryId && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg text-sm">
              <span>
                Category: {categories.find((c) => c.id === categoryId)?.name}
              </span>
              <button
                type="button"
                onClick={clearCategory}
                className="hover:bg-purple-100 cursor-pointer rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              clearSearch();
              clearCategory();
            }}
            className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 font-medium underline transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
