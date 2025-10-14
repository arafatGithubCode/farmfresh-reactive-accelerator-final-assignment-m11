"use server";
import "@/models/reviewModel";

import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { Review } from "@/models/reviewModel";
import { getSingleOrderByProductIdAndCustomerId } from "@/queries/order";
import { getProduct } from "@/queries/product";
import { getSingleReviewByProductIdAndCustomerId } from "@/queries/review";
import { IReview } from "@/types";
import { catchErr } from "@/utils/catchErr";

// ===== Make a review ===== //
export const doCreateReview = async (
  reviewData: IReview
): Promise<{ success: boolean; message: string }> => {
  await connectDB();
  try {
    const { customerId, product, comment, rating } = reviewData;

    // Verify the customer actually ordered and received this product
    const order = await getSingleOrderByProductIdAndCustomerId(
      customerId,
      product
    );

    if (!order) {
      throw new Error("Please place an order to make a review.");
    }

    if (order.status !== "DELIVERED") {
      throw new Error("You can only make a review for a delivered order.");
    }

    // Check if the product exists
    const productExists = await getProduct(product);
    if (!productExists) {
      throw new Error("This product does not exist.");
    }

    // Check if this user already reviewed the product
    const hasReview = await getSingleReviewByProductIdAndCustomerId(
      customerId,
      product
    );
    if (hasReview) {
      throw new Error("You already made a review for this product.");
    }

    // Create review
    const newReview = await Review.create({
      customer: customerId,
      product,
      comment,
      rating,
    });

    // Add to product's review list
    await Product.findByIdAndUpdate(product, {
      $push: { reviews: newReview._id },
    });

    return { success: true, message: "Review placed successfully." };
  } catch (error) {
    const errMsg = catchErr(error);
    return { success: false, message: errMsg.error };
  }
};

// ===== Update a review ===== //
export const doUpdateReview = async (
  reviewData: IReview
): Promise<{ success: boolean; message: string }> => {
  try {
    const { id, comment, rating } = reviewData;

    if (!id) {
      throw new Error("This review does not exist.");
    }

    await Review.findByIdAndUpdate({ _id: id }, { rating, comment });

    return { success: true, message: "Review updated successfully." };
  } catch (error) {
    const errMsg = catchErr(error);
    return { success: false, message: errMsg.error };
  }
};

// ===== Like toggling ===== //
export const doLike = async (
  reviewId: string,
  customerId: string
): Promise<{ success: boolean; message: string }> => {
  await connectDB();
  try {
    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      throw new Error("This review does not exist.");
    }

    // Ensure likes is initialized
    if (!existingReview.likes) {
      existingReview.likes = [];
    }

    const likeIndex = existingReview.likes.findIndex(
      (like) => like.customer.toString() === customerId
    );

    let message = "";

    if (likeIndex === -1) {
      // New like
      existingReview.likes.push({ customer: customerId, isLike: true });
      message = "You liked this review.";
    } else {
      // Toggle existing like
      const currentLike = existingReview.likes[likeIndex];
      existingReview.likes[likeIndex].isLike = !currentLike.isLike;

      message = currentLike.isLike
        ? "You unliked this review."
        : "You liked this review.";
    }

    await existingReview.save();

    return { success: true, message };
  } catch (error) {
    const errMsg = catchErr(error);
    return { success: false, message: errMsg.error };
  }
};

// ===== Delete a review ===== //
export const doDeleteReviewById = async (
  reviewId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await Review.findByIdAndDelete(reviewId);
    return { success: true, message: "This review deleted successfully." };
  } catch (error) {
    const errMsg = catchErr(error);
    return { success: false, message: errMsg.error };
  }
};
