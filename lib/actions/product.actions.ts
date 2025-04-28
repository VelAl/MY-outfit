"use server";
import { prisma } from "@/db/prisma";

import { LATEST_PRODS_LIMIT, PAGE_SIZE } from "../constants";

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

// GET ALL PRODUCTS
type T_Prop = {
  category?: string;
  limit?: number;
  page: number;
  query: string;
};

export async function getAllProducts({ limit = PAGE_SIZE, page }: T_Prop) {
  const total = await prisma.product.count();

  const data = await prisma.product.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
