"use client";

import { doReview } from "@/actions/product";
import { showToast } from "@/providers/ToastProvider";
import { IReviewDB } from "@/types";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Button from "../ui/Button";

const WriteReview = ({
  customerId,
  productId,
}: {
  customerId: string;
  productId: string;
}) => {
  const [review, setReview] = useState<IReviewDB>({
    customer: customerId,
    product: productId,
    rating: 0,
    comment: "",
  });
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (review.rating === 0) {
        showToast("Rating must be greater then 0.", "ERROR");
        return;
      }
      const response = await doReview(review);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStar = (index: number) => {
    const currentValue = index + 1;
    const activeValue = hoverRating || review.rating;

    if (activeValue >= currentValue) {
      return <FaStar className="text-yellow-500" />;
    } else if (activeValue >= currentValue - 0.5) {
      return <FaStarHalfAlt className="text-yellow-500" />;
    } else {
      return <FaStar className="text-gray-300 dark:text-gray-600" />;
    }
  };

  const getStarTitle = (index: number) => {
    switch (index + 1) {
      case 1:
        return "1 star - Poor";
      case 2:
        return "2 star - Fair";
      case 3:
        return "3 star - Good";
      case 4:
        return "4 star - Very Good";
      case 5:
        return "5 star - Excellent";
      default:
        break;
    }
  };
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4" id="reviewForm">
        <div>
          <label
            htmlFor="rating"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
          >
            Rate this product
          </label>
          <div
            onMouseLeave={() => setHoverRating(0)}
            className="star-rating flex items-center gap-1 mb-2"
            id="starRating"
          >
            {[...Array(5)].map((_, index) => (
              <Fragment key={index}>
                <button
                  type="button"
                  title={getStarTitle(index)}
                  onClick={(e) => {
                    // rating with fraction
                    const { left, width } =
                      e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - left;
                    const isHalf = x < width / 2;
                    const value = isHalf ? index + 0.5 : index + 1;
                    setReview((prev) => ({ ...prev, rating: value }));
                  }}
                  onMouseMove={(e) => {
                    // fractional star
                    const { left, width } =
                      e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - left;
                    const isHalf = x < width / 2;
                    const value = isHalf ? index + 0.5 : index + 1;
                    setHoverRating(value);
                  }}
                  className="cursor-pointer text-3xl transition-all duration-200 hover:scale-110"
                >
                  {renderStar(index)}
                </button>
              </Fragment>
            ))}
          </div>
          <p
            className="text-sm text-gray-600 dark:text-gray-400 mb-1"
            id="ratingText"
          >
            Click to rate this product
          </p>
          <p className="text-red-500 text-xs italic hidden" id="ratingError">
            Please select a rating.
          </p>
        </div>
        <div>
          <label htmlFor="comment" className="block mb-1 font-medium">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your review here..."
            required
            minLength={2}
            maxLength={500}
            value={review.comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setReview((prev) => ({ ...prev, comment: e.target.value }))
            }
          ></textarea>
          <p className="text-red-500 text-xs italic hidden" id="commentError">
            Please enter your comment.
          </p>
        </div>
        <Button
          label="Submit Review"
          loading={loading}
          loadingText="Submitting..."
          hasSpinner={true}
        />
      </form>
    </>
  );
};

export default WriteReview;
