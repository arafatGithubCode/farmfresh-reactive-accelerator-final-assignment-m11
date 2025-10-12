import { connectDB } from "@/libs/connectDB";
import { Order } from "@/models/orderModel";
import { Product } from "@/models/productModel";
import { IOrderFronted } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";
import mongoose from "mongoose";

// Get order by id
export const getOrderById = async (orderId: string) => {
  await connectDB();

  const order = await Order.findById(orderId)
    .populate("customer")
    .populate({
      path: "items.product",
      model: "Product",
      populate: {
        path: "farmer",
        model: "User",
      },
    })
    .lean<IOrderFronted>();

  return order ? transformMongoDoc(order) : null;
};

// Get orders by customer id
export const getOrdersByCustomerId = async (customerId: string) => {
  await connectDB();

  const orders = await Order.find({
    customer: customerId,
  })
    .populate("customer")
    .populate({
      path: "items.product",
      model: "Product",
      populate: {
        path: "farmer",
        model: "User",
      },
    })
    .lean<IOrderFronted[]>();

  return orders ? transformMongoDoc(orders) : null;
};

// Get orders by farmer id
export const getOrdersByFarmerId = async (farmerId: string) => {
  await connectDB();

  // Get all products of this farmer
  const products = await Product.find({ farmer: farmerId }).select("_id");
  const productIds = products.map((p) => p._id);

  if (productIds.length === 0) return null;

  // Get only the orders that include those orders
  const orders = await Order.find({ "items.product": { $in: productIds } })
    .populate("customer")
    .populate({
      path: "items.product",
      model: "Product",
      populate: {
        path: "farmer",
        model: "User",
      },
    })
    .lean();

  return orders ? transformMongoDoc(orders) : null;
};

// Get orders by product id
export const getOrdersByProductId = async (productId: string) => {
  await connectDB();

  const orders = await Order.find({
    "items.product": new mongoose.Types.ObjectId(productId),
  })
    .populate("customer")
    .populate("items.product")
    .lean<IOrderFronted[]>();

  return transformMongoDoc(orders);
};
