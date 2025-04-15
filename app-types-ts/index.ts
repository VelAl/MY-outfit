import { z } from "zod";

import { insertProductsSchema } from "@/lib/validators";

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
