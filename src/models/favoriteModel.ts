import { IFavorite } from "@/types";
import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema<IFavorite>(
  {
    customerId: {
      type: String,
      required: [true, "Customer id is required."],
    },
    items: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Favorite =
  mongoose.models.Favorite ?? mongoose.model("Favorite", favoriteSchema);
