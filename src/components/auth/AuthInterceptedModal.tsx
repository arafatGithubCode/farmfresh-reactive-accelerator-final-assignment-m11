"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";

const AuthInterceptedModal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const overlay = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const onDismiss = useCallback(async () => {
    await router.back();
    router.refresh();
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onDismiss]);

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
