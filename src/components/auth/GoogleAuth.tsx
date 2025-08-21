import { FaGoogle } from "react-icons/fa6";

const GoogleAuth = () => {
  return (
    <button
      type="button"
      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200 flex items-center justify-center space-x-2"
    >
      <FaGoogle className="text-red-500" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleAuth;
