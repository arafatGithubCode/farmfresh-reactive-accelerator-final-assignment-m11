import "@/models/reviewModel";

import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { IProductBase, IProductFrontend } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

// Create a product
export const createProduct = async (payload: Omit<IProductBase, "id">) => {
  await connectDB();
  const createdProduct = await Product.create(payload);
  return createdProduct;
};

// Get all product
export const getProducts = async () => {
  await connectDB();

  const products = await Product.find()
    .populate("farmer")
    .populate("reviews")
    .lean<IProductFrontend[]>();

  return transformMongoDoc(products);
};

// Get products by farmerId
export const getProductsByFarmerId = async (farmerId: string) => {
  await connectDB();

  const products = await Product.find({ farmer: farmerId })
    .populate("farmer")
    .populate("reviews")
    .lean<IProductFrontend[]>();

  return transformMongoDoc(products);
};

// Get product by its id
export const getProduct = async (productId: string) => {
  await connectDB();

  const product = await Product.findById(productId)
    .populate("farmer")
    .populate({
      path: "reviews",
      model: "Review",
      populate: {
        path: "customer",
        model: "User",
      },
    })
    .lean<IProductFrontend>();
  return transformMongoDoc(product);
};
