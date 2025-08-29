"use client";

import { useFormStatus } from "react-dom";
import MiniSpinner from "./MiniSpinner";

const SubmitBtn = ({ label, loading }: { label: string; loading: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || loading}
      type="submit"
      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 transform hover:scale-105 flex items-center justify-center"
    >
      {pending || loading ? <MiniSpinner /> : label}
    </button>
  );
};

export default SubmitBtn;
