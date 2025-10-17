import { ArrowLeft } from "lucide-react";

export function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <ArrowLeft className="w-4 h-4 text-gray-300" />
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative w-full h-[400px] lg:h-[600px] bg-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-4">
                <div className="inline-flex h-7 w-32 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="h-9 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-9 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>

              <div className="h-4 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>

              <div className="mb-8 flex-1">
                <div className="h-4 bg-gray-200 rounded w-28 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
