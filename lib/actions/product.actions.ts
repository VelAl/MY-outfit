"use server";
import { T_Product } from "@/app-types-ts";

import { LATEST_PRODS_LIMIT } from "../constants";
import { PrismaClient, Product } from "../generated/prisma";
import { converЕoToJSObj } from "../utils";

export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return converЕoToJSObj<T_Product[], Product[]>(data);
}
