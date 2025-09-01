import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import type { Account, Session, User } from "next-auth";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "./libs/mongoClient";
import { getUserByEmail } from "./queries/user";

// Extent JWT
interface ExtendedToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  user?: User;
  error?: string;
}

// Extended session
interface ExtendedSession extends Session {
  accessToken?: string;
  error?: string;
}

const refreshAccessToken = async (
  token: ExtendedToken
): Promise<ExtendedToken> => {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token as string,
      });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const refreshTokens: {
      access_token: string;
      expires_in: number;
      refresh_token?: string;
    } = await response.json();

    if (!response.ok) {
      throw refreshTokens;
    }

    return {
      ...token,
      accessToken: refreshTokens?.access_token,
      accessTokenExpires: Date.now() + refreshTokens?.expires_in * 1000,
      refreshToken: refreshTokens.refresh_token && refreshTokens.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

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
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: ExtendedToken;
      user?: User;
      account?: Account | null;
    }): Promise<ExtendedToken> {
      if (account && user) {
        return {
          accessToken: account?.access_token,
          accessTokenExpires: Date.now() + (account.expires_in ?? 0) * 1000,
          refreshToken: account?.refresh_token,
          user,
        };
      }

      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: ExtendedToken;
    }) {
      const extendedSession: ExtendedSession = {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
        error: token.error,
      };

      return extendedSession;
    },
  },
});
