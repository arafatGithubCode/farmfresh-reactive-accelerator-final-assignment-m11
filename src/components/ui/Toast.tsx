"use client";

import { ToastMode } from "@/types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

const Toast = ({
  mode,
  message,
}: {
  mode: ToastMode;
  message: string | undefined;
}) => {
  const [showToast, setShowToast] = useState(true);

  const baseStyle =
    "px-2 py-1 w-fit rounded font-medium text-sm shadow text-white flex items-center justify-between gap-2 animate-bounce";

  const modeStyle: Record<ToastMode, string> = {
    SUCCESS: "bg-green-500",
    ERROR: "bg-red-500",
    WARNING: "bg-yellow-500 text-black",
  };

  return createPortal(
    <div
      className={`${
        showToast ? "fixed" : "flex-none"
      } bottom-6 left-1/2 transform -translate-x-1/2 z-50`}
    >
      <div className={`${baseStyle} ${modeStyle[mode]}`}>
        <span>{message}</span>
        <MdClose
          className="text-xl cursor-pointer"
          onClick={() => setShowToast((prev) => !prev)}
        />
      </div>
    </div>,
    document.body
  );
};

export default Toast;
