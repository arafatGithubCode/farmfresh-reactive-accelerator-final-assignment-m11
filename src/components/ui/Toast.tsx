"use client";

import { ToastMode } from "@/types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdClose, MdError, MdWarning } from "react-icons/md";

const Toast = ({
  mode,
  message,
  duration = 5000,
}: {
  mode: ToastMode;
  message?: string;
  duration?: number;
}) => {
  const [showToast, setShowToast] = useState<boolean>(true);
  const [remaining, setRemaining] = useState<number>(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  //   start time
  const startTimer = (time: number) => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => setShowToast(false), time);
  };

  // clear time
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // handle pause on hover
  const handleMouseEnter = () => {
    if (timerRef.current && startTimeRef.current) {
      clearTimer();
      const elapsed = Date.now() - startTimeRef.current;
      setRemaining((prev) => prev - elapsed);
    }
  };

  // resume when mouse end
  const handleMouseLeave = () => {
    if (remaining > 0) {
      startTimer(remaining);
    }
  };

  const baseStyle =
    "px-3 py-2 w-fit rounded font-medium text-sm shadow text-black flex items-center justify-between gap-2 transition-opacity animate-bounce-skew duration-300";

  const modeStyle: Record<ToastMode, string> = {
    SUCCESS: "bg-green-200",
    ERROR: "bg-red-200",
    WARNING: "bg-yellow-200 text-black",
  };

  useEffect(() => {
    startTimer(duration);
    return clearTimer;
  }, [duration]);

  if (!showToast) return null;

  return createPortal(
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="alert"
        aria-live="polite"
        className={`${baseStyle} ${modeStyle[mode]}`}
      >
        {mode === "SUCCESS" ? (
          <FaCheckCircle className="text-xl" />
        ) : mode === "WARNING" ? (
          <MdWarning className="text-xl" />
        ) : (
          <MdError className="text-xl" />
        )}
        <span>{message}</span>
        <MdClose
          className="text-xl cursor-pointer"
          onClick={() => setShowToast(false)}
        />
      </div>
    </div>,
    document.body
  );
};

export default Toast;
