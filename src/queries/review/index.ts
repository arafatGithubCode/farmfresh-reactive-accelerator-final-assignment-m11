import { connectDB } from "@/libs/connectDB";
import { Review } from "@/models/reviewModel";
import { IReviewFronted } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

export const getReviewByCustomerId = async (customerId: string) => {
  await connectDB();

  const reviews = await Review.find({ customer: customerId })
    .populate("customer")
    .populate("product")
    .lean<IReviewFronted>();

  return transformMongoDoc(reviews);
};
