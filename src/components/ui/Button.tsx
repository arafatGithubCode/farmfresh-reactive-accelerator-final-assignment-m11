"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import MiniSpinner from "./MiniSpinner";

type ButtonProps = {
  label: string;
  loading: boolean;
  hasSpinner?: boolean;
  loadingText?: string;
  isDanger?: boolean;
};

const Button = ({
  label,
  loading,
  hasSpinner = false,
  loadingText = "Loading...",
  isDanger = false,
}: ButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;

  return (
    <button
      type="submit"
      disabled={isLoading}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      className={`w-full text-white py-3 ${
        isDanger
          ? "bg-red-600 hover:bg-red-700"
          : "bg-primary-600 hover:bg-primary-700"
      } hover:scale-105 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center`}
    >
      {isLoading ? (
        hasSpinner ? (
          <div className="flex items-center gap-3">
            <MiniSpinner /> <span>{loadingText ?? label}</span>
          </div>
        ) : (
          <span>{loadingText}</span>
        )
      ) : (
        label
      )}
    </button>
  );
};

export default React.memo(Button);
