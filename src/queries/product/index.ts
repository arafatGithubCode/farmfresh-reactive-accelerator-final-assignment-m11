import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { IProductModel } from "@/types";

// Create a product
export const createProduct = async (payload: IProductModel) => {
  await connectDB();
  const createdProduct = await Product.create(payload);
  return createdProduct;
};
