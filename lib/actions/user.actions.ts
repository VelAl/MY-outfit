"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";

import { T_Message, T_PaymentMethod, T_ShippingAddress } from "@/app-types-ts";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";

import { createErrMsg, createSuccessMsg, formatErorr } from "../utils";
import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "../validators";

// Sign in the user with credentials
export const signInWithCreds = async (
  prevState: unknown,
  formData: FormData
): Promise<T_Message> => {
  try {
    const creds = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", creds);

    return createSuccessMsg("Signed in successfully");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return createErrMsg("Invalid email or password");
  }
};

// Sign the user out
export const signOutUser = async () => {
  await signOut();
};

// Sign up user
export const signUpUser = async (
  prevState: unknown,
  formData: FormData
): Promise<T_Message> => {
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

    return createSuccessMsg("User registed successfully.");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return createErrMsg(formatErorr(error));
  }
};

// get user by ID
export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) throw new Error("User not found");

  return user;
};

// upd the user`s address
export const updUserAddress = async (
  data: T_ShippingAddress
): Promise<T_Message> => {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { address },
    });

    return createSuccessMsg("User`s address updated successfully!");
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};

//update user`s payment method
export const updUserPaymentMethod = async (data: T_PaymentMethod) => {
  try {
    const session = await auth();
    const curentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!curentUser) throw new Error("User not found.");

    const { type } = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: curentUser.id },
      data: { paymentMethod: type },
    });

    return createSuccessMsg("Payment method has been updated successfully!");
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};
