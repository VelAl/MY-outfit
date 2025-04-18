"use server";

import { T_CartItem } from "@/app-types-ts";

export const addItemToCart = async (data: T_CartItem) => {
  return { success: true, message: "Item has been added to the cart." };
};
