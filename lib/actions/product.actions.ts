"use server";
import { LATEST_PRODS_LIMIT } from "../constants";
import { PrismaClient } from "../generated/prisma";
import { convertoToJSObj } from "../utils";

// Get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertoToJSObj(data);
}
