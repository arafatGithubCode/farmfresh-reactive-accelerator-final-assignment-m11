import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { IProductBase, IProductWithFarmer } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

// Create a product
export const createProduct = async (payload: Omit<IProductBase, "_id">) => {
  await connectDB();
  const createdProduct = await Product.create(payload);
  return createdProduct;
};

// Get all product
export const getProducts = async () => {
  await connectDB();

  const products = await Product.find()
    .populate("farmer", "firstName farmDistrict farmName")
    .lean<IProductWithFarmer[]>();

  return transformMongoDoc(products);
};

// Get products by farmerId
export const getProductsByFarmerId = async (farmerId: string) => {
  await connectDB();
  const products = await Product.find({ farmer: farmerId }).lean<
    IProductBase[]
  >();

  return transformMongoDoc(products);
};
