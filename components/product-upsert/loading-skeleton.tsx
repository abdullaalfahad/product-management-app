"use client";

export default function ProductUpsertSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 animate-pulse space-y-6">
      {/* 🔹 Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-48 bg-gray-200 rounded-md" />
          <div className="h-3.5 w-64 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* 🔹 Image Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="h-5 w-40 bg-gray-200 rounded-md mb-4" />
        <div className="w-full h-60 bg-gray-200 rounded-xl border border-gray-100" />
        <div className="flex justify-center mt-4">
          <div className="h-8 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* 🔹 Product Form Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Section title */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded-md" />
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded-md" />
          <div className="h-10 w-full bg-gray-200 rounded-md" />
        </div>

        {/* Price + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((_) => (
            <div key={_} className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded-md" />
              <div className="h-10 w-full bg-gray-200 rounded-md" />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded-md" />
          <div className="h-24 w-full bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* 🔹 Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-end gap-3">
        <div className="h-10 w-24 bg-gray-200 rounded-md" />
        <div className="h-10 w-32 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}
