import { connectDB } from "@/libs/connectDB";
import { Cart } from "@/models/CartModel";
import { getCartByCustomerId } from "@/queries/cart";
import { getProduct } from "@/queries/product";
import { catchErr } from "@/utils/catchErr";
import { NextRequest, NextResponse } from "next/server";

// ===== Create/Add cart ==== //
export const POST = async (request: NextRequest) => {
  await connectDB();

  try {
    const body = await request.json();
    const { customerId, productId, action } = body;

    const product = await getProduct(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 400 }
      );
    }

    let actionType: "ADD_ITEM" | "INCREMENT" | "DECREMENT" | "REMOVE_ITEM" =
      action;
    let cart = await Cart.findOne({ customer: customerId });
    let updatedQuantity: number = 0;

    //    if cart is not exist and action is add
    if (!cart) {
      if (action === "ADD_ITEM") {
        if (product.stock < 1) {
          return NextResponse.json(
            { success: false, message: "Out of stock." },
            { status: 404 }
          );
        }

        cart = await Cart.create({
          customer: customerId,
          items: [{ product: productId, quantity: 1 }],
        });
        updatedQuantity = 1;
        actionType = "ADD_ITEM";
        return NextResponse.json(
          { success: true, actionType, quantity: updatedQuantity, productId },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Cart not found || Invalid Action" },
          { status: 400 }
        );
      }
    }

    // check if it is exist
    const existingItem = cart?.items?.find(
      (item) => item.product.toString() === productId
    );

    // increment
    if (action === "INCREMENT") {
      if (existingItem) {
        if (existingItem.quantity + 1 > product.stock) {
          return NextResponse.json(
            { success: false, message: "Not enough stock" },
            { status: 400 }
          );
        }

        existingItem.quantity += 1;
        updatedQuantity = existingItem.quantity;
      } else {
        if (product.stock < 1) {
          return NextResponse.json(
            { success: false, message: "Out of stock." },
            { status: 404 }
          );
        }

        cart.items.push({ product: productId, quantity: 1 });
        updatedQuantity = 1;
      }
      actionType = "INCREMENT";
    }

    // decrement
    if (action === "DECREMENT") {
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        updatedQuantity = existingItem.quantity;
      }
      actionType = "DECREMENT";
    }

    // remove
    if (action === "REMOVE_ITEM") {
      if (existingItem) {
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== productId
        );
        updatedQuantity = 0;
      }
    }

    if (action === "ADD_ITEM" && !existingItem) {
      if (product.stock < 1) {
        return NextResponse.json(
          { success: false, message: "Out of stock." },
          { status: 404 }
        );
      }
      cart.items.push({ product: productId, quantity: 1 });
      actionType = "ADD_ITEM";
      updatedQuantity = 1;
    }

    await cart.save();

    return NextResponse.json(
      { success: true, actionType, quantity: updatedQuantity, productId },
      { status: 201 }
    );
  } catch (error) {
    const errMsg = catchErr(error);
    return NextResponse.json({ success: false, errMsg }, { status: 400 });
  }
};

// ===== Get Cart by customerId ===== //
export const GET = async (request: NextRequest) => {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: "Missing customerID" },
        { status: 400 }
      );
    }

    const cart = await getCartByCustomerId(customerId);

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, err: error }, { status: 400 });
  }
};
