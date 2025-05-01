"use server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import { T_AddProduct, T_UpdProduct } from "@/app-types-ts";
import { prisma } from "@/db/prisma";

import { LATEST_PRODS_LIMIT, PAGE_SIZE } from "../constants";
import {
  convertToPlainObject,
  createErrMsg,
  createSuccessMsg,
  formatErorr,
} from "../utils";
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

// GET SINGLE PRODUCT by ID
export async function getProductByID(id: string) {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  return convertToPlainObject(product);
}

// GET ALL PRODUCTS
type T_Prop = {
  category?: string;
  limit?: number;
  page: number | string;
  query: string;
  price?: string;
  rating?: string;
  sort?: string;
};

export async function getAllProducts({
  category,
  limit = PAGE_SIZE,
  page,
  price,
  rating,
  query,
}: T_Prop) {
  // QUERY FILTER
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          },
        }
      : {};

  // CATEGORY FILTER
  const categoryFilter: Prisma.ProductWhereInput =
    category && category !== "all"
      ? {
          category: {
            contains: category,
            mode: "insensitive",
          },
        }
      : {};

  // PRICE FILTER
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  // RATING FILTER
  const ratingFilter: Prisma.ProductWhereInput =
    rating && rating !== "all"
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  const total = await prisma.product.count({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
  });

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    take: limit,
    skip: (Number(page) - 1) * limit,
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
export const updateProduct = async (data: T_UpdProduct) => {
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

// GET CATEGORIES
export const getAllCategories = async () => {
  const data = await prisma.product.groupBy({
    by: "category",
    _count: true,
  });

  return data;
};

// GET FEATURED PRODUCTS
export const getFeaturedProducts = async (limit?: number) => {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: limit || 5,
  });

  return convertToPlainObject(data);
};
