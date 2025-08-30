import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/user";
import { IUserSession } from "@/types";

export const getUserSession = async (): Promise<IUserSession | null> => {
  const session = await auth();

  if (!session?.user) return null;

  if (session?.user?.email && !session?.user?.image) {
    const user = await getUserByEmail(session.user.email);

    return {
      id: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      image: user?.avatar_url,
      role: user?.role,
    };
  }

  return {
    name: session.user.name!,
    email: session.user.email!,
    image: session.user.image!,
  };
};
