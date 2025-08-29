import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/user";
import Link from "next/link";
import UserNestedNav from "./UserNestedNav";

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
        <UserNestedNav user={session?.user} avatar={avatar} name={name} />
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </div>
  );
};

export default UserMenu;
