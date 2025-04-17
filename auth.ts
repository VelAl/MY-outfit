import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts-edge";

import { prisma } from "./db/prisma";

export const config = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProviders({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(creds) {
        if (creds === null) return null;

        // find USER in db
        const user = await prisma.user.findFirst({
          where: {
            email: creds.email as string,
          },
        });

        // if USER exists & password matches
        if (user && user.password) {
          const isMatch = compareSync(creds.password as string, user.password);

          if (isMatch) {
            const { id, name, email, role } = user;
            return { id, name, email, role };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      // Set the user ID from the token
      session.user.id = token.sub as string;

      // if the an upd? set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
