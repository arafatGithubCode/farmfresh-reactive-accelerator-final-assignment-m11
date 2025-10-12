import { IProductBase } from "@/types";
import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema<IProductBase>(
  {
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Product name is required."],
      minLength: [5, "Product name must be 5 characters longer."],
      maxLength: [60, "Product name must be 60 characters less"],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      minLength: [20, "Description must be 20 characters longer."],
      maxLength: [1000, "Description must be 1000 characters shorter."],
    },
    features: {
      type: ["String"],
      required: [true, "Please select at least one feature"],
    },
    imagesUrl: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    harvestDate: {
      type: String,
      required: [true, "Harvest date is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [1, "Minimum amount of price is 1 tk upper"],
      max: [1000, "Maximum amount of price is 1000 tk less"],
    },
    discountRate: {
      type: Number,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required."],
      min: [1, "Minimum amount of stock must be 1 upper"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
    },
    deliveryMethod: {
      type: String,
      required: [true, "Please select the delivery method."],
    },
    baseDeliveryFee: {
      type: Number,
      required: [true, "Base delivery fee is required"],
    },
    perUnitDeliveryFee: {
      type: Number,
      required: [true, "Per unit delivery fee is required"],
    },
    serviceFee: {
      type: Number,
      required: [true, "service fee is required"],
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models?.Product ?? mongoose.model("Product", productSchema);
