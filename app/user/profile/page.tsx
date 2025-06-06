import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import ProfileForm from "./form";

export const metadata: Metadata = { title: "Profile" };

const ProfilePage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="h2-bold">Profile</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  );
};
export default ProfilePage;
