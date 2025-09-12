import { ICart, ICartItem } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const cartItemSchema = new Schema<ICartItem>({
  product: Schema.Types.ObjectId,
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
});

const cartSchema = new Schema<ICart>(
  {
    customer: Schema.Types.ObjectId,
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema);
