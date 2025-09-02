import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  error: string | undefined | boolean;
};

const Field = ({ children, error }: Props) => {
  return (
    <div>
      {children}
      {error && <p className="text-red-400 text-xs my-1">{error}</p>}
    </div>
  );
};

export default Field;
