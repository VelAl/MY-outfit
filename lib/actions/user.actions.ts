"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn, signOut } from "@/auth";

import { signInFormSchema } from "../validators";

// Sign in the user with credentials
export const signInWithCreds = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const creds = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", creds);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
};

// Sign the user out
export const signOutUser = async () => {
  await signOut();
};
