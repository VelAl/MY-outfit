"use client";

import { useState } from "react";
import Link from "next/link";

import { T_Review } from "@/app-types-ts";

import RevieForm from "./review-form";

type T_Props = Record<"productId" | "productSlug" | "userId", string>;

const ReviewList = ({ productId, productSlug, userId }: T_Props) => {
  const [reviews, setReviews] = useState<T_Review[]>([]);

  const _reload = () => {
    console.log('value ===>');
  };

  return (
    <div className="space-y-2">
      {!reviews.length && <div>No reviews yet</div>}
      {userId ? (
        <RevieForm
          productId={productId}
          userId={userId}
          onReviewSubmitted={_reload}
        />
      ) : (
        <div>
          Please
          <Link
            className="text-primary underline mx-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            Sign In
          </Link>
          to write in review
        </div>
      )}

      <div className="flex flex-col gap-3">{/* REVIEWS HERE */}</div>
    </div>
  );
};
export default ReviewList;
