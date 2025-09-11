import { auth } from "@/auth";
import { IUserSession } from "@/types";

export const getUserSession = async (): Promise<IUserSession | null> => {
  const session = await auth();

  if (!session) return null;

  const name =
    session?.user?.name ??
    session?.user?.firstName + " " + session?.user?.lastName;

  return {
    id: session.user.id,
    name,
    email: session.user.email!,
    image: session.user.image!,
    role: session.user.role,
  };
};
