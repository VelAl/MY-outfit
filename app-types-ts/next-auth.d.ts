import { DefaultSession } from "next-auth";

import { T_UserRole } from ".";

declare module "next-auth" {
  export interface Session {
    user: {
      role?: T_UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: T_UserRole;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: T_UserRole;
    name?: string;
    email?: string;
  }
}
