import { connectDB } from "@/libs/connectDB";
import { Favorite } from "@/models/favoriteModel";
import { IFavorite } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

export const getFavoriteByCustomerId = async (customerId: string) => {
  await connectDB();
  const data = await Favorite.findOne({ customerId }).lean<IFavorite>();

  return data ? transformMongoDoc(data) : null;
};
