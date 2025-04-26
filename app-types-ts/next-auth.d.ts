import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    name?: string;
    email?: string;
  }
}