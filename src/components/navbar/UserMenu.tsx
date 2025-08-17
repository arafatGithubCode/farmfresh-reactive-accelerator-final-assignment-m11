// import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const UserMenu = async () => {
  const session = {
    user: false,
  };
  return (
    <div className="relative">
      {session?.user ? (
        <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="User"
            className="w-8 h-8 rounded-full"
            width={50}
            height={50}
          />
          <span className="hidden sm:block">John Doe</span>
          <i className="fas fa-chevron-down text-sm"></i>
        </button>
      ) : (
        <Link href="/register">Sign In</Link>
      )}
    </div>
  );
};

export default UserMenu;
