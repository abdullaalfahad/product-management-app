"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { ProductActions } from "../product-upsert/product-actions";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => router.push(`/products/${p.slug}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 flex-shrink-0">
                        <Image
                          src={(p.images?.[0] as string) || "/placeholder.png"}
                          alt={p.name}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-xl object-cover shadow-sm ring-2 ring-gray-100"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 truncate text-base">
                          {p.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          SKU: {p.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200">
                      {p.category?.name || "Uncategorized"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xl font-bold text-gray-900">
                      ${p.price.toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <ProductActions product={p} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
