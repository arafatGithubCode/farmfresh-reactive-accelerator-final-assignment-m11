import { getUserSession } from "@/utils/getUserSession";
import Link from "next/link";
import Dropdown from "../ui/Dropdown";

const UserMenu = async () => {
  const user = await getUserSession();

  return (
    <div className="relative">
      {user ? (
        <Dropdown image={user.image!} name={user.name!} />
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </div>
  );
};

export default UserMenu;
