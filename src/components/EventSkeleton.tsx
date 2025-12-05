'use client';

export default function EventSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg p-4 border-2 border-gray-700/30 animate-pulse"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
              <div className="h-5 w-32 bg-gray-700 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

