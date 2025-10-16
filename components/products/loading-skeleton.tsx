export function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        {[...Array(5)].map((_: number, i: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={i} className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
              <div className="flex gap-2">
                <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
                <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
