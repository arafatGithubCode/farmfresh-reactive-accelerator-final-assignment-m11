"use client";

import { useEffect } from "react";
import { FaRegSadTear } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className="text-center">
        {/* Big Icon */}
        <FaRegSadTear className="mx-auto text-6xl text-primary-500 mb-6" />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">Oops!</h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Something went wrong!
        </p>

        {/* Action Button */}
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary-500 text-white font-medium rounded-2xl shadow-md hover:bg-primary-600 transition-colors"
        >
          Try Again!
        </button>
      </div>
    </div>
  );
}
