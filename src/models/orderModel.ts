import { IOrder, IOrderItem } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const orderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const orderSchema = new Schema<IOrder>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [orderItemSchema],
  status: {
    type: String,
    default: "PLACED",
  },
});

export const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
