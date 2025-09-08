import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { IMongoProduct, IProductModel } from "@/types";
import { replaceMongoIdInArray } from "@/utils/replaceMongoIdInArray";

// Create a product
export const createProduct = async (payload: IProductModel) => {
  await connectDB();
  const createdProduct = await Product.create(payload);
  return createdProduct;
};

// Get all product
export const getProducts = async (): Promise<IProductModel[]> => {
  await connectDB();

  const products = await Product.find().lean<IMongoProduct[]>();
  return replaceMongoIdInArray(products);
};
