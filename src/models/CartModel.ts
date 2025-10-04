import { ICart, ICartItem } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const cartItemsSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
});

const cartSchema = new Schema<ICart>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [cartItemsSchema],
  },
  { timestamps: true }
);

export const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema);
