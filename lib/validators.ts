import { z } from "zod";

import { fomatNumWithDecimals } from "./utils";

const price = z
  .string()
  .refine(
    (v) => /^\d+(\.\d{2})?$/.test(fomatNumWithDecimals(+v)),
    "Invalid price"
  );

//_______CREATE_PRODUCT____________________________________________________
export const insertProductsSchema = z.object({
  name: z.string().min(3, "Name has to be at least 3 characters"),
  slug: z.string().min(3, "Slug has to be at least 3 characters"),
  category: z.string().min(3, "Category has to be at least 3 characters"),
  brand: z.string().min(3, "Brand has to be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description has to be at least 3 characters")
    .max(30, "Max 30 characters"),
  stock: z.coerce.number(),
  images: z
    .array(z.string())
    .min(1, "The product mast have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price,
});

//_______USER_SIGN_IN____________________________________________________________
export const signInFormSchema = z.object({
  email: z.string().email("Ivalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//_______USER_SIGN_UP____________________________________________________________
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Ivalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirmed password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

//_______CART_____________________________________________________________________
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  name: z.string().min(1, "Name is required."),
  slug: z.string().min(1, "Slug is required."),
  qty: z.number().int().nonnegative("Quantity must be a positive number."),
  image: z.string().min(1, "Image is required."),
  price,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: price,
  totalPrice: price,
  shippingPrice: price,
  taxPrice: price,
  sessionCartId: z.string().min(1, "Session cart ID is required."),
  userId: z.string().optional().nullable(),
});
