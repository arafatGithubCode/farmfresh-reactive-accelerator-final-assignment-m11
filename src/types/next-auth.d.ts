// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: "Farmer" | "Customer";
    firstName?: string;
    lastName?: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken?: string;
    error?: string;
  }
}
