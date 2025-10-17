"use client";

import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

const Popup = ({
  children,
  onClose,
  size = "small",
  isReorder = false,
}: {
  children: ReactNode;
  onClose: () => void;
  size?: "small" | "big";
  isReorder?: boolean;
}) => {
  const width = size === "big" ? "w-full max-w-3xl" : "w-full max-w-md";

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${width} bg-white dark:bg-gray-800 rounded-lg py-4 ${
          isReorder ? "px-0" : "px-4"
        } shadow-xl animate-zoom-in relative`}
      >
        {children}
        <IoClose
          className="cursor-pointer hover:scale-105 duration-150 absolute top-4 right-4 text-red-500"
          onClick={onClose}
        />
      </div>
    </div>,
    document.body
  );
};

export default Popup;
