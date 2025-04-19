"use server";

import { cookies } from "next/headers";

import { T_CartItem } from "@/app-types-ts";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

import { convertToPlainObject, formatErorr } from "../utils";
import { cartItemSchema } from "../validators";

export const addItemToCart = async (data: T_CartItem) => {
  try {
    // check for the cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session has not been found.");

    // Get session & userID
    const session = await auth();
    const userId = session?.user?.id;

    // get cart
    const cart = await getMyCart();

    // parse & validate item
    const item = cartItemSchema.parse(data);

    // find product in db
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    console.log({ userId, cart, itemRequested: item, foundProduct: product });

    return { success: true, message: "Item has been added to the cart." };
  } catch (error) {
    return { success: false, message: formatErorr(error) };
  }
};

export const getMyCart = async () => {
  // check for the cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) throw new Error("Cart session has not been found.");

  // Get session & userID
  const session = await auth();
  const userId = session?.user?.id;

  // get userCart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  // convert decimals & return
  return convertToPlainObject({
    ...cart,
    items: cart.items as T_CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
};
