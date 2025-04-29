import { ReactNode } from "react";
import { z } from "zod";

import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductsSchema,
  paymentMethodSchema,
  paymentResultSchema,
  shippingAddressSchema,
  updateProductSchema,
} from "@/lib/validators";

export enum E_AppThemes {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export type T_AddProduct = z.infer<typeof insertProductsSchema>;
export type T_Product = T_AddProduct & {
  id: string;
  rating: string;
  createdAt: Date;
  numReviews: number;
};
export type T_UpdProduct = z.infer<typeof updateProductSchema>;

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
export type T_PaymentResult = z.infer<typeof paymentResultSchema>;

export type T_InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type T_InsertOrder = z.infer<typeof insertOrderSchema>;
export type T_Order = T_InsertOrder & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: T_InsertOrderItem[];
  user: { name: string; email: string };
};

export type T_Columns<T> = {
  title: string;
  getCell: (entity: T) => ReactNode;
  classNameHeader?: string;
  classNameCell?: string;
}[];
