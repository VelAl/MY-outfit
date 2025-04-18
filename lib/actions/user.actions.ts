"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";

import { signInFormSchema, signUpFormSchema } from "../validators";

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

// Sign up user
export const signUpUser = async (prevState: unknown, formData: FormData) => {
  const password = formData.get("password") as string;

  try {
    const data = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password,
      confirmPassword: formData.get("confirmPassword"),
    });

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashSync(password, 10),
      },
    });

    await signIn("credentials", { email: data.email, password });

    return { success: true, message: "User registed successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
};
