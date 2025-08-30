import { getUserSession } from "@/utils/getUserSession";
import Link from "next/link";
import UserNestedNav from "./UserNestedNav";

const UserMenu = async () => {
  const user = await getUserSession();

  return (
    <div className="relative">
      {user ? (
        <UserNestedNav image={user.image!} name={user.name!} />
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </div>
  );
};

export default UserMenu;
