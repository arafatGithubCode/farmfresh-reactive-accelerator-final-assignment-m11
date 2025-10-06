import { connectDB } from "@/libs/connectDB";
import { Cart } from "@/models/CartModel";
import { ICartFrontend } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

// ====== Get Cart By Customer ID ====== //
export const getCartByCustomerId = async (
  customerId: string
): Promise<ICartFrontend | null> => {
  await connectDB();
  const cart = await Cart.findOne({ customer: customerId })
    .populate("customer")
    .populate({
      path: "items.product",
      model: "Product",
      populate: {
        path: "farmer",
        model: "User",
      },
    })
    .lean<ICartFrontend>();

  return cart ? transformMongoDoc(cart) : null;
};
