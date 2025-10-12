import { ILikesDB, IReplyDB, IReviewDB } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const replaySchema = new Schema<IReplyDB>(
  {
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

const likesSchema = new Schema<ILikesDB>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isLike: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
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
    likes: [likesSchema],
  },
  { timestamps: true }
);

export const Review: Model<IReplyDB> =
  mongoose.models.Review ?? mongoose.model("Review", reviewSchema);
