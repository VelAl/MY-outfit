"use server";
import { prisma } from "@/db/prisma";

import { LATEST_PRODS_LIMIT } from "../constants";

// GET LATEST PRODUCTS
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return data;
}

// GET SINGLE PRODUCT by slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug },
  });

  return product;
}
