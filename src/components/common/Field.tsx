import { ReactNode } from "react";

const Field = ({
  children,
  error,
}: {
  children: ReactNode;
  error: string | undefined | boolean;
}) => {
  return (
    <div>
      {children}
      {error && <p className="text-red-400 text-xs my-1">{error}</p>}
    </div>
  );
};

export default Field;
