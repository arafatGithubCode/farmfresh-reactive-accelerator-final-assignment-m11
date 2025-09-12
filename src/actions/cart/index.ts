"use server";

import { Cart } from "@/models/CartModel";
import { catchErr } from "@/utils/catchErr";
import { Types } from "mongoose";

// ===== Add to Cart ===== //
export const doAddingCart = async (productId: string, customerId: string) => {
  try {
    let cart = await Cart.findOne({ customer: customerId });
    if (!cart) {
      // create a cart
      cart = await Cart.create({
        customer: new Types.ObjectId(customerId),
        items: [{ product: new Types.ObjectId(productId), quantity: 1 }],
      });

      return;
    }

    // check if already in product
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: new Types.ObjectId(productId),
        quantity: 1,
      });
    }
    await cart.save();
    return;
  } catch (err) {
    catchErr(err);
  }
};
