import { connectDB } from "@/libs/connectDB";
import { User } from "@/models/userModel";
import { IUserDB } from "@/types";
import { replaceUserIdInObj } from "@/utils/replaceUserIdInObj";

// Create a user
export const createUser = async (payload: IUserDB) => {
  await connectDB();
  return await User.create(payload);
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  await connectDB();
  const user = await User.findOne({
    email,
  }).lean();
  return user ? replaceUserIdInObj(user) : null;
};
