"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { T_Cart, T_CartItem, T_Message } from "@/app-types-ts";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

import {
  convertToPlainObject,
  createErrMsg,
  createSuccessMsg,
  formatError,
  round2,
} from "../utils";
import { cartItemSchema, insertCartSchema } from "../validators";

// Calculate cart prices
const calcPrices = (items: T_CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, el) => acc + Number(el.price) + el.qty, 0)
  );
  const shippingPrice = itemsPrice < 100 ? 10 : 0;
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// Update cart in the DB
const _updCartInDB = async (cart: T_Cart) => {
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items,
      ...calcPrices(cart.items),
    },
  });
};

export const addItemToCart = async (data: T_CartItem): Promise<T_Message> => {
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
    if (!product) throw new Error("Product not found");

    if (!cart) {
      // vreate new cart obj
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calcPrices([item]),
      });

      // save to DB
      await prisma.cart.create({ data: newCart });

      // revalidate product page
      revalidatePath(`/product/${product.slug}`);

      return createSuccessMsg("Item has been added to the cart.");
    } else {
      // index of curent item in cart or -1
      const prodIndInCart = cart.items.findIndex(
        ({ productId }) => productId === product.id
      );

      if (prodIndInCart !== -1) {
        // check stock
        if (product.stock < cart.items[prodIndInCart].qty + 1) {
          throw new Error("Not enough stock");
        }

        // incrase the qty
        cart.items[prodIndInCart].qty++;
      } else {
        cart.items.push(item);
      }

      // save updated cart to db
      await _updCartInDB(cart);

      revalidatePath(`/product/${product.slug}`);

      return createSuccessMsg(
        `${product.name} - ${
          prodIndInCart >= 0 ? "updated in the cart" : "added to the cart"
        }`
      );
    }
  } catch (error) {
    return createErrMsg(formatError(error));
  }
};

export const getMyCart = async (): Promise<T_Cart | undefined> => {
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

export const removeItemFromCart = async (
  productId: string
): Promise<T_Message> => {
  try {
    //check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session has not been found.");

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product has not been found.");

    //Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart has not been found.");

    //Check for item in the cart
    const itmInd = cart.items.findIndex((pr) => pr.productId === productId);
    if (itmInd === -1) throw new Error("There is no such product in the cart.");

    //Check qnty of the itm in the cart
    if (cart.items[itmInd].qty === 1) {
      // remove from the cart
      cart.items.splice(itmInd, 1);
    } else {
      // decrease qnt
      cart.items[itmInd].qty--;
    }

    // save updated cart to db
    await _updCartInDB(cart);

    revalidatePath(`/product/${product.slug}`);

    return createSuccessMsg(`${product.name} removed from the cart`);
  } catch (error) {
    return createErrMsg(formatError(error));
  }
};
