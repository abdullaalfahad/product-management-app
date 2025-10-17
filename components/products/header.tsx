import { Plus } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Product Inventory
        </h1>
        <p className="text-gray-600">
          Manage your product catalog and inventory
        </p>
      </div>
      <Link
        href="/products/new"
        type="button"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Plus className="w-5 h-5" />
        Add Product
      </Link>
    </div>
  );
}
