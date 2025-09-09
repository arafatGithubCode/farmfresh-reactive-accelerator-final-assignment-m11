import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { IProductModel } from "@/types";
import { replaceMongoIdInArray } from "@/utils/replaceMongoIdInArray";

// Create a product
export const createProduct = async (payload: Omit<IProductModel, "_id">) => {
  await connectDB();
  const createdProduct = await Product.create(payload);
  return createdProduct;
};

// Get all product
export const getProducts = async () => {
  await connectDB();

  const products = await Product.find().lean<IProductModel[]>();
  return replaceMongoIdInArray<IProductModel>(products);
};

// Get products by farmerId
export const getProductsByFarmerId = async (farmerId: string) => {
  await connectDB();
  const products = await Product.find({ farmerId: farmerId }).lean<
    IProductModel[]
  >();
  return replaceMongoIdInArray<IProductModel>(products);
};
