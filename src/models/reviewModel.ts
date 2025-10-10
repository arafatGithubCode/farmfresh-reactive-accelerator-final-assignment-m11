import { IReplyDB, IReviewDB } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const replaySchema = new Schema<IReplyDB>(
  {
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

const reviewSchema = new Schema<IReviewDB>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    comment: {
      type: String,
      required: [true, "Comment is required."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
    },
    reply: [replaySchema],
  },
  { timestamps: true }
);

export const Review: Model<IReplyDB> =
  mongoose.models.Review ?? mongoose.model("Review", reviewSchema);
