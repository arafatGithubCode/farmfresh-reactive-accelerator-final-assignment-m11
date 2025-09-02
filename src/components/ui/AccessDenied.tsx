// components/ui/AccessDenied.tsx
import Link from "next/link";

type Props = {
  allowedRole: string;
  path: string;
};

const AccessDenied = ({ allowedRole, path }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h3 className="text-2xl font-bold text-red-600 mb-2">🚫 Access Denied</h3>
      <p className="mb-6">
        Only{" "}
        <span className="font-semibold text-primary-600">{allowedRole}</span>{" "}
        can access {path}.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded-xl bg-primary-600 text-white font-medium shadow-md hover:bg-primary-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default AccessDenied;
