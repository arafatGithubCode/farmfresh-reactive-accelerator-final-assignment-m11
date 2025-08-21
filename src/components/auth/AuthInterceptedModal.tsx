"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";

const AuthInterceptedModal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const overlay = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) return onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();

      document.removeEventListener("keydown", onKeyDown);
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 bg-black/50 z-50"
      onClick={handleClick}
    >
      <div
        ref={wrapper}
        className="h-screen flex justify-center items-center overflow-hidden overflow-y-scroll relative"
      >
        {children}
      </div>
    </div>
  );
};

export default AuthInterceptedModal;
