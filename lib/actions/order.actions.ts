"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { T_Message } from "@/app-types-ts";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

import {
  convertToPlainObject,
  createErrMsg,
  createSuccessMsg,
  formatErorr,
} from "../utils";
import { insertOrderSchema } from "../validators";

import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";

// create order with items
export const createOrder = async (): Promise<
  T_Message & { redirectTo?: string }
> => {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated.");

    const cart = await getMyCart();
    const userId = session.user?.id;
    if (!userId) throw new Error("User not found.");

    const user = await getUserById(userId);

    if (!cart?.items.length) {
      return { ...createErrMsg("Your cart is empty"), redirectTo: "/cart" };
    }
    if (!user.address) {
      return {
        ...createErrMsg("Users addres is empty"),
        redirectTo: "/shipping-address",
      };
    }
    if (!user.paymentMethod) {
      return {
        ...createErrMsg("No payment method"),
        redirectTo: "/payment-method",
      };
    }

    // create order
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // create a transaction to create order and its items in DB
    const newOrderId = await prisma.$transaction(async (tx) => {
      //Create order
      const newOrder = await tx.order.create({ data: order });
      //Create order items from cart items
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: { ...item, orderId: newOrder.id },
        });
      }

      //clear current cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      });

      return newOrder.id;
    });

    if (!newOrderId) throw new Error("OrderCreationFailed");

    return {
      ...createSuccessMsg("Order created!"),
      redirectTo: `/order/${newOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return createErrMsg(formatErorr(error));
  }
};

// get ORDER by ID
export const getOrderById = async (id: string) => {
  const order = await prisma.order.findFirst({
    where: { id },
    include: {
      OrderItem: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(order);
};
