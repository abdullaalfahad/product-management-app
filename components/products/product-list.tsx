"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetProductsQuery } from "@/redux/services/product-api";
import { EmptyState } from "./empty-state";
import { Header } from "./header";
import { LoadingSkeleton } from "./loading-skeleton";
import { Pagination } from "./pagination";
import { ProductSearch } from "./product-search";
import { ProductStats } from "./product-stats";
import { ProductTable } from "./product-table";

export default function ProductList() {
  const { currentPage, limit, searchText } = useAppSelector(
    (s) => s.productFilter,
  );

  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page: currentPage,
    limit: limit,
    search: searchText,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Header />

          <ProductStats products={products} />

          <ProductSearch />
        </div>

        {isLoading || isFetching ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ProductTable products={products} />
            {!searchText && <Pagination />}
          </>
        )}
      </div>
    </div>
  );
}
