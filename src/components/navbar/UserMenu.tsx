import { getUserByEmail } from "@/queries/user";
import { getUserSession } from "@/utils/getUserSession";
import Link from "next/link";
import Dropdown from "../ui/Dropdown";

const UserMenu = async () => {
  const user = await getUserSession();
  let avatar;
  if (user?.email) {
    const userFromDB = await getUserByEmail(user.email);
    avatar = userFromDB?.image;
  }

  return (
    <div className="relative">
      {user ? (
        <Dropdown image={avatar!} name={user.name!} />
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </div>
  );
};

export default UserMenu;
