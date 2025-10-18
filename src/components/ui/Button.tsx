"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import MiniSpinner from "./MiniSpinner";

type ButtonVariant = "primary" | "danger" | "warning" | "outline";

type ButtonProps = {
  label: string;
  loading?: boolean;
  hasSpinner?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
  type?: "submit" | "button";
  handleClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  label,
  loading,
  hasSpinner = false,
  loadingText = "Loading...",
  variant = "primary",
  icon,
  fullWidth = true,
  type = "submit",
  onClick,
}: ButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white hover:scale-105",
    danger:
      "border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900",
    warning:
      "border border-yellow-300 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      className={`${
        fullWidth ? "w-full" : "px-5"
      } py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2 ${
        variantClasses[variant]
      }`}
    >
      {isLoading ? (
        hasSpinner ? (
          <div className="flex items-center gap-3">
            <MiniSpinner /> <span>{loadingText ?? label}</span>
          </div>
        ) : (
          <>
            {icon && icon}
            <span>{loadingText}</span>
          </>
        )
      ) : (
        <>
          {icon && icon}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default React.memo(Button);
