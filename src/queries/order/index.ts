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
