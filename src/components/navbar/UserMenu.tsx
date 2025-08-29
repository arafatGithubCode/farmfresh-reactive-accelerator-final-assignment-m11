import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/user";
import Image from "next/image";
import Link from "next/link";

const UserMenu = async () => {
  const session = await auth();

  let avatar: string | undefined;
  let name: string | undefined;

  if (session?.user?.email && !session?.user?.image) {
    const user = await getUserByEmail(session.user.email);
    avatar = user?.avatar_url;
    name = `${user?.firstName} ${user?.lastName}`;
  }

  return (
    <div className="relative">
      {session?.user ? (
        <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
          <Image
            src={
              session.user.image ||
              avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            }
            alt="User"
            className="w-8 h-8 rounded-full"
            width={50}
            height={50}
          />
          <span className="hidden sm:block">{session.user.name || name}</span>
          <i className="fas fa-chevron-down text-sm"></i>
        </button>
      ) : (
        <Link href="/register">Sign In</Link>
      )}
    </div>
  );
};

export default UserMenu;
