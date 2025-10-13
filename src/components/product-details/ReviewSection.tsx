"use client";

import { IReview, IReviewFronted } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReviewItem from "../common/ReviewItem";
import WriteReview from "../common/WriteReview";
import Popup from "../ui/Popup";

const ReviewSection = ({
  reviews,
  productId,
}: {
  reviews: IReviewFronted[];
  productId: string;
}) => {
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);

  const session = useSession();
  const userId = session?.data?.user?.id;

  const totalReviews = reviews.length;

  const totalAverageRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / totalReviews;

  const fullStarts = Math.trunc(totalAverageRating);
  const halfStar = totalAverageRating - fullStarts >= 0.5;
  const emptyStarts = 5 - fullStarts - (halfStar ? 1 : 0);

  // Rating counts:
  const ratingCount = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = reviews.filter(
      (review) => Math.round(review.rating) === star
    ).length;
    return acc;
  }, {} as Record<number, number>);

  // Get rating percentage:
  const getRatingPercentage = (count: number) => {
    return totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);
  };

  const loggedInUserReviews = reviews.filter(
    (review) => review.customer.id === userId
  );

  const otherReviews = reviews.filter((review) => review.product === productId);

  const addNewReview: IReview = {
    customerId: userId!,
    product: productId,
    comment: "",
    rating: 0,
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h2>
        {showWriteReview && (
          <Popup onClose={() => setShowWriteReview(false)}>
            <WriteReview
              onClose={() => setShowWriteReview(false)}
              review={addNewReview}
              mood="CREATE"
            />
          </Popup>
        )}
        <button
          onClick={() => setShowWriteReview(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Write a Review
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {totalAverageRating.toFixed(1)}
              </span>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(fullStarts)].map((_, index) => (
                    <FaStar key={`full-${index}`} />
                  ))}
                  {halfStar && <FaStarHalfAlt key="half" />}
                  {[...Array(emptyStarts)].map((_, index) => (
                    <FaRegStar key={`empty-${index}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on {reviews.length} review
                  {reviews.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCount[star];
              const percentage = getRatingPercentage(count);

              return (
                <div key={star} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{star}★</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <!-- Individual Reviews --> */}
      <div className="space-y-6">
        {loggedInUserReviews.length > 0 &&
          loggedInUserReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        {otherReviews.length > 1 &&
          otherReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
