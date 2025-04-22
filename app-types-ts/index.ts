import { z } from "zod";

import {
  cartItemSchema,
  insertCartSchema,
  insertProductsSchema,
  paymentMethodSchema,
  shippingAddressSchema,
} from "@/lib/validators";

export enum E_AppThemes {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export type T_Product = z.infer<typeof insertProductsSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type T_CartItem = z.infer<typeof cartItemSchema>;

export type T_Cart = z.infer<typeof insertCartSchema> & {
  id: string;
  createdAt: Date;
};

export type T_ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type T_SuccessMessage = {
  success: true;
  message: string;
};
export type T_ErrMessage = {
  success: false;
  message: string;
};
export type T_Message = T_SuccessMessage | T_ErrMessage;

export type T_PaymentMethod = z.infer<typeof paymentMethodSchema>;
