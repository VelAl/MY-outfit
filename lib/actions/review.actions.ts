"use server";

import { revalidatePath } from "next/cache";

import { T_InsertReview } from "@/app-types-ts";
import { prisma } from "@/db/prisma";

import { createErrMsg, createSuccessMsg, formatErorr } from "../utils";
import { insertReviewSchema } from "../validators";

import { checkAuthentication } from "./helpers";
import { getProductByID } from "./product.actions";

// create & update Review
export const manageReview = async (data: T_InsertReview) => {
  try {
    await checkAuthentication();

    const review = insertReviewSchema.parse(data);

    const product = await getProductByID(review.productId);
    if (!product) {
      throw new Error(`There is no product with ID: ${review.productId}`);
    }

    //check if user have already reviewed the product
    const reviewExists = await prisma.rview.findFirst({
      where: { productId: review.productId, userId: review.userId },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        // Update the review
        await tx.rview.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        // Create the review
        await tx.rview.create({
          data: review,
        });
      }

      // get avarage rating
      const avarageRating = await tx.rview.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      // get number of reviews
      const numReviews = await tx.rview.count({
        where: { productId: review.productId },
      });

      // upd the rating and numReview in product table
      await tx.product.update({
        where: { id: review.productId },
        data: {
          numReviews,
          rating: avarageRating._avg.rating || 0,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return createSuccessMsg(
      `the Review has been ${
        reviewExists ? "updated" : "created"
      } successfully!`
    );
  } catch (error) {
    return createErrMsg(formatErorr(error));
  }
};
