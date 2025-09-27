"use client";

import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdError, MdWarning } from "react-icons/md";

// Custom close button
const CustomCloseButton = ({ closeToast }: { closeToast?: () => void }) => (
  <button
    onClick={closeToast}
    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
  >
    <IoClose size={18} />
  </button>
);

//  Base toast options
const baseOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: <CustomCloseButton />,
};

// Show toast with per-mode style
export const showToast = (
  message: string,
  mode: "SUCCESS" | "WARNING" | "ERROR" = "SUCCESS"
) => {
  const progressClass =
    mode === "SUCCESS"
      ? "progressSuccess"
      : mode === "ERROR"
      ? "progressError"
      : "progressWarning";

  toast(
    <div className="relative flex items-center gap-2 w-full">
      {mode === "SUCCESS" && <FaCheckCircle className="text-green-600" />}
      {mode === "ERROR" && <MdError className="text-red-600" />}
      {mode === "WARNING" && <MdWarning className="text-yellow-600" />}
      <span className="text-sm font-medium text-black dark:text-white">
        {message}
      </span>
    </div>,
    {
      ...baseOptions,
      progressClassName: progressClass,
      className: `relative rounded-lg shadow-md p-3 ${
        mode === "SUCCESS"
          ? "bg-green-100 dark:bg-green-900"
          : mode === "ERROR"
          ? "bg-red-100 dark:bg-red-900"
          : "bg-yellow-100 dark:bg-yellow-900"
      }`,
    }
  );
};

// Toast Provider
export const ToastProvider = () => {
  return <ToastContainer limit={3} />;
};
