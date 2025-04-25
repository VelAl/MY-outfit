"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import {
  T_Message,
  T_Order,
  T_PaymentResult,
  T_ShippingAddress,
} from "@/app-types-ts";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

import { paypal } from "../paypal";
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
export const getOrderById = async (id: string): Promise<T_Order | null> => {
  const order = await prisma.order.findFirst({
    where: { id },
    include: {
      OrderItem: true,
      user: { select: { name: true, email: true } },
    },
  });
  if (!order) return null;

  const { OrderItem, ...converted } = convertToPlainObject(order);

  return {
    ...converted,
    shippingAddress: converted.shippingAddress as T_ShippingAddress,
    orderItems: OrderItem,
  };
};

// create new PayPal order
export const createPayPalOrder = async (orderId: string) => {
  try {
    // get order from DB
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) throw new Error("Order not found");

    // create new PayPal order
    const paypalOrder = await paypal.createOrder(+order.totalPrice);

    // update order with paypal order id
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentResult: {
          id: paypalOrder.id,
          email_address: "",
          status: "",
          pricePaid: 0,
        },
      },
    });

    return {
      ...createSuccessMsg("PayPal order created successfully"),
      data: paypalOrder.id as string,
    };
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};

// aprove paypal order and update order to paid
export const approvePayPalOrder = async (
  orderId: string, // MY-store order ID
  data: { orderID: string } // PayPal order ID
) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!order) throw new Error("Order not found");

    const captureData = await paypal.capturePayment(data.orderID);
    if (
      !captureData ||
      captureData.id !== (order.paymentResult as T_PaymentResult)?.id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error in PayPal payment");
    }

    // update order to be paid
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_addres,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    });

    revalidatePath(`/order/${orderId}`);

    return createSuccessMsg("The Order has been payd successfully!");
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};

async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: T_PaymentResult;
}) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: { OrderItem: true },
  });
  if (!order) throw new Error("Order not found");
  if (order.isPaid) throw new Error("Order is already paid");

  // transaction - upd order and its products stock quantity
  await prisma.$transaction(async (tx) => {
    // iterate over the order products updating stock
    for (const item of order.OrderItem) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    // set the order to paid
    await tx.order.update({
      where: { id: order.id },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  // get updated order after the transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      OrderItem: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!updatedOrder) throw new Error("Order not found");
}
