import { useState } from "react";

export const useCatchErr = () => {
  const [err, setErr] = useState<string | null>(null);

  const catchErr = (error: unknown, fallbackMsg = "Something went wrong!") => {
    if (error instanceof Error) {
      setErr(error.message);
    }
    if (typeof error === "string") {
      setErr(error);
    }
    setErr(fallbackMsg);
  };

  return { err, setErr, catchErr };
};
