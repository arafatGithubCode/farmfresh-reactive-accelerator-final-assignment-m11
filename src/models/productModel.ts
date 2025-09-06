import { IProductModel } from "@/types";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<IProductModel>({
  farmerId: {
    type: String,
    required: [true, "Farmer ID is required"],
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
    maxLength: [500, "Location must be 500 characters shorter."],
  },
  farmLocation: {
    type: String,
    required: [true, "Farm location is required"],
    minLength: [20, "Location must be 20 characters longer"],
    maxLength: [100, "Location cannot be 100 characters upper."],
  },
  features: {
    type: ["String"],
    required: [true, "Please select at least one feature"],
  },
  imagesUrl: {
    type: ["String"],
    required: [true, "Please select at least one image"],
  },
  harvestDate: {
    type: String,
    required: [true, "Harvest date is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [50, "Minimum amount of price is 50 tk upper"],
    max: [50000, "Maximum amount of price is 50000 tk less"],
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
});

export const Product =
  mongoose.models?.Product ?? mongoose.model("Product", productSchema);
