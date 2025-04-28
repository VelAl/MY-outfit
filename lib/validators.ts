import { z } from "zod";

import { PAYMENT_METHODS } from "./constants";
import { fomatNumWithDecimals } from "./utils";

const price = z
  .string()
  .refine(
    (v) => /^\d+(\.\d{2})?$/.test(fomatNumWithDecimals(+v)),
    "Invalid price"
  );

//_______PRODUCT_________________________________________________________
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

export const updateProductSchema = insertProductsSchema.extend({
  id: z.string().nonempty(),
});

//_______USER________________________________________________________________
export const signInFormSchema = z.object({
  email: z.string().email("Ivalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

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

export const updUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Ivalid email"),
});

//_______CART________________________________________________________________
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

//_______SHIPPING_ADDRESS____________________________________________________
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 charecters"),
  streetAddress: z.string().min(3, "Address must be at least 3 charecters"),
  city: z.string().min(3, "City must be at least 3 charecters"),
  postalCode: z.string().min(3, "Code must be at least 3 charecters"),
  country: z.string().min(3, "Country must be at least 3 charecters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

//_______PAYMENT_METHOD______________________________________________________
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine(({ type }) => PAYMENT_METHODS.includes(type), {
    path: ["type"],
    message: "Unknown payment method",
  });

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string().email(),
  pricePaid: z.string(),
});

//_______ORDER_______________________________________________________________
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  itemsPrice: price,
  shippingPrice: price,
  taxPrice: price,
  totalPrice: price,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAddress: shippingAddressSchema,
});

// order item
export const insertOrderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  qty: z.number().min(1, "Quantity of product must be at least 1"),
  price,
  name: z.string().min(1, "Product name must be at least 1 character"),
  slug: z.string().min(1, "Product slug item is required"),
  image: z.string().min(1, "Product image is required"),
});
