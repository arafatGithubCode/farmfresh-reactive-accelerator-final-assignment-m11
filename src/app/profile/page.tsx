import ProfileForm from "@/components/profile/ProfileForm";
import Divider from "@/components/ui/Divider";
import { getUserByEmail } from "@/queries/user";
import { getUserSession } from "@/utils/getUserSession";
import { RiProfileLine } from "react-icons/ri";

const ProfilePage = async () => {
  const userSession = await getUserSession();
  const email = userSession?.email;
  if (!email) return null;

  const user = await getUserByEmail(email!);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full max-w-5xl">
        <div className="flex items-center gap-2">
          <p className="text-md font-semibold">My Profile</p>
          <RiProfileLine className="text-xl text-primary-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-semibold text-xs mt-1">
          {email}
        </p>
        <Divider />
        <ProfileForm user={user!} />
      </div>
    </div>
  );
};

export default ProfilePage;
