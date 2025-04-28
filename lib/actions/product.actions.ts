"use server";
import { revalidatePath } from "next/cache";

import { T_AddProduct, T_UpdProduct } from "@/app-types-ts";
import { prisma } from "@/db/prisma";

import { LATEST_PRODS_LIMIT, PAGE_SIZE } from "../constants";
import { createErrMsg, createSuccessMsg, formatErorr } from "../utils";
import { insertProductsSchema, updateProductSchema } from "../validators";

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

// DELETE PRODUCT
export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");

    return createSuccessMsg("The Product has been deleted successfully.");
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};

// CREATE PRODUCT
export const createProduct = async (data: T_AddProduct) => {
  try {
    const product = insertProductsSchema.parse(data);
    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return createSuccessMsg("New Product has been added successfully.");
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};

// UPDATE PRODUCT
export const updataProduct = async (data: T_UpdProduct) => {
  try {
    const product = updateProductSchema.parse(data);
    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return createSuccessMsg("The Product has been updated successfully.");
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};
