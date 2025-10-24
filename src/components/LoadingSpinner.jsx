"use client";

export default function LoadingSpinner({
  message = "Memuat...",
  size = "medium",
}) {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div
          className={`animate-spin rounded-full border-b-2 border-[#5a5a3d] mx-auto mb-4 ${
            sizeClasses[size] || sizeClasses.medium
          }`}
        ></div>
        {message && <p className="text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export function InlineLoader({ message, size = "small" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`animate-spin rounded-full border-b-2 border-[#5a5a3d] ${
          sizeClasses[size] || sizeClasses.small
        }`}
      ></div>
      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  );
}
