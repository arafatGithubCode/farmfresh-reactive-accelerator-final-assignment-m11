import { User } from "@/models/userModel";
import { IUserDB } from "@/types";
import { replaceUserIdInObj } from "@/utils/replaceUserIdInObj";
import { Types } from "mongoose";

// Create a user
export const createUser = async (payload: IUserDB) => {
  return await User.create(payload);
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  const user: (IUserDB & { _id: Types.ObjectId }) | null = await User.findOne({
    email,
  }).lean();
  return user ? replaceUserIdInObj(user) : null;
};
