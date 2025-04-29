import { auth } from "@/auth";

import { userRoles } from "../constants";

export const checkAuthentication = async () => {
  const session = await auth();
  if (!session?.user) throw new Error("User is not authenticated!");

  return session.user;
};

export const isAdminCheck = async () => {
  const user = await checkAuthentication();

  if (user.role !== userRoles.ADMIN) {
    throw new Error("User is not authorized.");
  }
};
