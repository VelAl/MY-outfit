"use server";
import { prisma } from "@/db/prisma";

import { LATEST_PRODS_LIMIT } from "../constants";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return data;
}
