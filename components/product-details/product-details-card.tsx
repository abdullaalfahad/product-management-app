"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, Tag, DollarSign, X } from "lucide-react";
import { useGetProductByIdQuery } from "@/redux/services/product-api";
import { ProductActions } from "../common/product-actions";
import { ProductDetailsSkeleton } from "./loading-skeleton";
import { ProductNotFound } from "./empty-state";

export default function ProductDetailsCard() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { data: product, error, isLoading } = useGetProductByIdQuery(slug);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (!product || error) return <ProductNotFound />;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative w-full h-[400px] lg:h-[600px] bg-gray-100">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-8 lg:p-12 flex flex-col">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200">
                    <Tag className="w-3.5 h-3.5" />
                    {product.category?.name || "Uncategorized"}
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                  SKU:{" "}
                  <span className="font-mono">
                    {product.id.toString().slice(0, 8).toUpperCase()}
                  </span>
                </p>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      Price
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="mb-8 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>

                <ProductActions product={product} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Status</p>
                  <p className="text-sm font-semibold text-gray-900">
                    In Stock
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📦</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Category</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {product.category?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🏷️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">
                    Product ID
                  </p>
                  <p className="text-sm font-semibold text-gray-900 font-mono">
                    {product.id.toString().slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
