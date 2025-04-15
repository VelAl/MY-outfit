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
