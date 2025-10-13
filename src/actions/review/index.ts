"use server";

import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { Review } from "@/models/reviewModel";
import { getSingleOrderByProductId } from "@/queries/order";
import { getProduct } from "@/queries/product";
import { IReview } from "@/types";
import { catchErr } from "@/utils/catchErr";

// ===== Make a review ===== //
export const doCreateReview = async (
  reviewData: IReview
): Promise<{ success: boolean; message: string }> => {
  await connectDB();
  try {
    const { customerId, comment, rating } = reviewData;

    const order = await getSingleOrderByProductId(reviewData.product as string);

    if (!order) {
      throw new Error("Please place an order to make a review.");
    }

    if (order.status !== "DELIVERED") {
      throw new Error("You can make review for DELIVERED order.");
    }

    const product = await getProduct(reviewData.product as string);

    if (!product) {
      throw new Error("This product does not exist.");
    }

    const hasReview = product.reviews.some(
      (review) => review.customer.id === customerId
    );

    if (hasReview) {
      throw new Error("You can only make one review for a product.");
    }

    const newReview = await Review.create({
      customer: customerId,
      product: reviewData.product,
      comment,
      rating,
    });
    await Product.findByIdAndUpdate(reviewData.product, {
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
