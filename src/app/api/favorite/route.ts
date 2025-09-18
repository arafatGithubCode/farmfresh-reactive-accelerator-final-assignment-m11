import { connectDB } from "@/libs/connectDB";
import { Favorite } from "@/models/favoriteModel";
import { getFavoriteByCustomerId } from "@/queries/favorite";
import { catchErr } from "@/utils/catchErr";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json({
        success: false,
        err: "customerId is missing",
      });
    }

    const data = await getFavoriteByCustomerId(customerId!);

    return NextResponse.json(
      { success: true, favoriteList: data },
      { status: 200 }
    );
  } catch (err) {
    const errMsg = catchErr(err);
    return NextResponse.json({ success: false, err: errMsg });
  }
};

export const POST = async (request: NextRequest) => {
  await connectDB();
  try {
    const body = await request.json();
    const { customerId, productId } = body;

    if (!customerId || !productId) {
      throw new Error("customer/product id is missing.");
    }

    let favorite = await Favorite.findOne({ customerId });
    let message = "";

    if (!favorite) {
      favorite = await Favorite.create({
        customerId,
        items: [productId],
      });
      message = "ADDED";
    } else {
      const existingFavorite = favorite?.items?.includes(productId);
      if (existingFavorite) {
        // remove if already added
        favorite.items = favorite.items.filter(
          (id: string) => id !== productId
        );
        message = "REMOVE";
      } else {
        favorite.items.push(productId);
        message = "ADDED";
      }
    }
    await favorite.save();

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (err) {
    const errMsg = catchErr(err);
    return NextResponse.json({ success: false, error: errMsg });
  }
};
