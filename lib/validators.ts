import { z } from "zod";

import { fomatNumWithDecimals } from "./utils";

const price = z
  .string()
  .refine((v) => /^\d+(\.\d{2})?$/.test(fomatNumWithDecimals(+v)));

//Schema for inserting products
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

// schema for users sign in
export const signInFormSchema = z.object({
  email: z.string().email("Ivalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// schema for users sign up
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
