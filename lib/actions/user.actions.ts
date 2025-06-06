"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt-ts-edge";

import {
  T_Message,
  T_PaymentMethod,
  T_ShippingAddress,
  T_UdateUser,
  T_User,
} from "@/app-types-ts";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";

import { PAGE_SIZE } from "../constants";
import { createErrMsg, createSuccessMsg, formatError } from "../utils";
import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "../validators";

import { checkAuthentication, isAdminCheck } from "./helpers";

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

    return createErrMsg(formatError(error));
  }
};

// get user by ID
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) throw new Error("User not found");

    const { password, address, ...safeUser } = user;
    return { ...safeUser, address: address as T_User["address"] };
  } catch (err) {
    console.error(formatError(err));
    return null;
  }
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
    return createErrMsg(formatError(error));
  }
};

// update user`s payment method
export const updUserPaymentMethod = async (
  data: T_PaymentMethod
): Promise<T_Message> => {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found.");

    const { type } = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: type },
    });

    return createSuccessMsg("Payment method has been updated successfully!");
  } catch (error) {
    return createErrMsg(formatError(error));
  }
};

// update user`s profile
type T_UpdUserProfileProp = { name: string; email: string };
export const updUserProfile = async (data: T_UpdUserProfileProp) => {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found.");

    await prisma.user.update({
      data,
      where: { id: currentUser.id },
    });

    return createSuccessMsg("Profile has been updated successfully!");
  } catch (error) {
    return createErrMsg(formatError(error));
  }
};

// update user`s info by Admin
export const updUserProfileByAdmin = async (data: T_UdateUser) => {
  try {
    await isAdminCheck();

    await prisma.user.update({
      data: { name: data.name, role: data.role },
      where: { id: data.id },
    });

    revalidatePath("/admin/users");

    return createSuccessMsg("The User`s info has been updated successfully!");
  } catch (error) {
    return createErrMsg(formatError(error));
  }
};

// get all the users
type T_GetAllUsers_Props = {
  page?: number;
  limit?: number;
  query?: string;
};
export const getAllUsers = async ({
  page = 1,
  limit = PAGE_SIZE,
  query,
}: T_GetAllUsers_Props) => {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          },
        }
      : {};

  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      _count: {
        select: {
          Order: {
            where: { isPaid: false },
          },
        },
      },
    },
  });
  const total = await prisma.user.count({ where: { ...queryFilter } });

  return {
    data: data.map(({ password, _count, ...user }) => ({
      ...user,
      address: user.address as T_ShippingAddress | null,
      unpaidOrdersCount: _count.Order,
    })),
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// DELETE USER
export const deleteUser = async (id: string) => {
  try {
    await isAdminCheck();
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        _count: {
          select: {
            Order: {
              where: { isPaid: false },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error(`There is no User to delete with ID ${id}`);
    }

    if (user._count.Order) {
      const message = `Forbidden! User has ${user?._count.Order} unpaid orders.`;
      throw new Error(message);
    }

    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/users");

    return createSuccessMsg("User has been deleted.");
  } catch (error) {
    return createErrMsg(formatError(error));
  }
};
