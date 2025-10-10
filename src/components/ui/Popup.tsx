import { ReactNode } from "react";
import ReactDOM from "react-dom";

const Popup = ({ children }: { children: ReactNode }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl animate-zoom-in">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
