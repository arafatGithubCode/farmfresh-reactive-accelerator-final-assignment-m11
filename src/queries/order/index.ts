import { connectDB } from "@/libs/connectDB";
import { Order } from "@/models/orderModel";
import { IOrderFronted } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

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

  const orders = await Order.find()
    .populate({
      path: "items.product",
      model: "Product",
      match: { farmer: farmerId },
    })
    .lean<IOrderFronted[]>();

  return orders ? transformMongoDoc(orders) : null;
};
