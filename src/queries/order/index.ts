import { connectDB } from "@/libs/connectDB";
import { Order } from "@/models/orderModel";
import { Product } from "@/models/productModel";
import { IOrderFronted, TOrderStatus } from "@/types";
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
export const getOrdersByCustomerId = async (
  customerId: string,
  orderStatus?: TOrderStatus
) => {
  await connectDB();

  const filter: Record<string, string> = { customer: customerId };

  if (orderStatus) {
    filter.status = orderStatus;
  }

  const orders = await Order.find(filter)
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
export const getOrdersByFarmerId = async (
  farmerId: string,
  orderStatus?: TOrderStatus
) => {
  await connectDB();

  // Get all products of this farmer
  const products = await Product.find({ farmer: farmerId }).select("_id");
  const productIds = products.map((p) => p._id);

  if (productIds.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = { "items.product": { $in: productIds } };

  if (orderStatus) {
    filter.status = orderStatus;
  }

  // Get only the orders that include those orders
  const orders = await Order.find(filter)
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
export const getSingleOrderByProductIdAndCustomerId = async (
  customerId: string,
  productId: string
) => {
  await connectDB();

  const orders = await Order.findOne({
    customer: customerId,
    "items.product": new mongoose.Types.ObjectId(productId),
  }).lean<IOrderFronted>();

  return transformMongoDoc(orders);
};
