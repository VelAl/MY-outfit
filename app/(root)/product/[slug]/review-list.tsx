"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, UserIcon } from "lucide-react";
import { toast } from "sonner";

import { T_Review } from "@/app-types-ts";
import Rating from "@/components/shared/product/rating";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProductReviews } from "@/lib/actions/review.actions";
import { formatDateTime, formatError } from "@/lib/utils";

import ReviewForm from "./review-form";

type T_Props = Record<"productId" | "productSlug" | "userId", string>;

const ReviewList = ({ productId, productSlug, userId }: T_Props) => {
  const [reviews, setReviews] = useState<T_Review[]>([]);

  const fetchReviews = useCallback(async () => {
    try {
      const reviews = await getProductReviews(productId);

      setReviews(reviews);
    } catch (error) {
      toast.error(formatError(error));
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [productId, fetchReviews]);

  return (
    <div className="space-y-2">
      {!reviews.length && <div>No reviews yet</div>}
      {userId ? (
        <ReviewForm
          productId={productId}
          userId={userId}
          onReviewSubmitted={fetchReviews}
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
          to write a review
        </div>
      )}

      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Rating value={review.rating} />

                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4 text-primary" />
                  {review.user?.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3 text-primary" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ReviewList;
