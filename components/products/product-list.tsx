"use client";

import { Package, Plus } from "lucide-react";
import { useState } from "react";
import { useGetProductsQuery } from "@/redux/services/product-api";
import { EmptyState } from "./empty-state";
import { LoadingSkeleton } from "./loading-skeleton";
import { Pagination } from "./pagination";
import { ProductSearch } from "./product-search";
import { ProductTable } from "./product-table";

export default function ProductList() {
  const [page, setPage] = useState(1);

  const limit = 5;
  const totalPages = 5;

  const offset = (page - 1) * limit;

  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery({ offset: offset, limit: limit });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Product Inventory
              </h1>
              <p className="text-gray-600">
                Manage your product catalog and inventory
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {products.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {new Set(products.map((p) => p.category?.name)).size}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
          </div>

          <ProductSearch />
        </div>

        {isLoading || isFetching ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ProductTable products={products} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
