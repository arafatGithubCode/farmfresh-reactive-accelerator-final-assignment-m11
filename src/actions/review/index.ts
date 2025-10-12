"use server";

import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { Review } from "@/models/reviewModel";
import { getSingleOrderByProductId } from "@/queries/order";
import { getProduct } from "@/queries/product";
import { IReviewDB } from "@/types";
import { catchErr } from "@/utils/catchErr";

// ===== Make a review ===== //
export const doReview = async (
  review: IReviewDB
): Promise<{ success: boolean; message: string }> => {
  await connectDB();
  try {
    const { customer: customerId, product: productId } = review;

    const order = await getSingleOrderByProductId(productId as string);

    if (!order) {
      throw new Error("Please place an order to make a review.");
    }

    if (order.status !== "DELIVERED") {
      throw new Error("You can make review for DELIVERED order.");
    }

    const product = await getProduct(productId as string);

    if (!product) {
      throw new Error("This product does not exist.");
    }

    const hasReview = product.reviews.some(
      (review) => review.customer.id === customerId
    );

    if (hasReview) {
      throw new Error("You can only make one review for a product.");
    }

    const newReview = await Review.create(review);
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: newReview._id },
    });

    return { success: true, message: "Review placed successfully." };
  } catch (error) {
    const errMsg = catchErr(error);
    return { success: false, message: errMsg.error };
  }
};
