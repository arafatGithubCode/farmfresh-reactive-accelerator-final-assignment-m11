import { User } from "@/models/userModel";
import { IUserDB } from "@/types";
import { replaceUserIdInObj } from "@/utils/replaceUserIdInObj";

// Create a user
export const createUser = async (payload: IUserDB) => {
  return await User.create(payload);
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email,
  }).lean();
  return user ? replaceUserIdInObj(user) : null;
};
