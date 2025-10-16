import { Search } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchText } from "@/redux/slices/product-filter-slice";

export function ProductSearch() {
  const dispatch = useAppDispatch();

  return (
    <div className="mt-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder-gray-300 text-gray-700"
        />
      </div>
    </div>
  );
}
