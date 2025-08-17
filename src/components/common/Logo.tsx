import Link from "next/link";
import { FaSeedling } from "react-icons/fa6";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-3">
        <div className="bg-primary-500 p-2 rounded-lg">
          <FaSeedling className="text-white text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            FarmFresh
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Local Farmer Booking
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
