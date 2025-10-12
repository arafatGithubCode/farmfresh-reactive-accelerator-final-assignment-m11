// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { TUserRole } from ".";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: TUserRole | string;
    firstName?: string;
    lastName?: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken?: string;
    error?: string;
  }
}
