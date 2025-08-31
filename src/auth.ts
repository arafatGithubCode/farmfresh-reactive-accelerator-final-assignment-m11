import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "./libs/mongoClient";
import { getUserByEmail } from "./queries/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ): Promise<User | null> {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error("Missing email or password.");
        }

        try {
          const exist = await getUserByEmail(email);
          if (!exist) {
            throw new Error("Invalid email or password.");
          }
          const isMatch = await bcrypt.compare(password, exist.password);

          if (!isMatch) {
            throw new Error("Invalid email or password.");
          }
          return exist;
        } catch (err) {
          console.log(err, "auth.ts");
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          if (typeof err === "string") {
            throw new Error(err);
          }
          throw new Error("Fail to login.");
        }
      },
    }),
  ],
});
