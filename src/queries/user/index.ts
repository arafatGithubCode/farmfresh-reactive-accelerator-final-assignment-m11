import { connectDB } from "@/libs/connectDB";
import { User } from "@/models/userModel";
import { IUserDB, TBaseUser } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

// Create a user
export const createUser = async (payload: Omit<IUserDB, "id">) => {
  await connectDB();
  return await User.create(payload);
};

// Get user by email
// after transformMongoDoc
export const getUserByEmail = async (email: string) => {
  await connectDB();
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return null;
  }

  const userWithoutMetaData = transformMongoDoc(user);

  return {
    ...userWithoutMetaData,
    role: userWithoutMetaData.role ?? "Customer",
    firstName:
      userWithoutMetaData.firstName ??
      userWithoutMetaData.name?.split(" ")[0] ??
      "",
    lastName:
      userWithoutMetaData.lastName ??
      userWithoutMetaData.name?.split(" ")[1] ??
      "",
  };
};
// Get all farmers
export const getAllFarmers = async () => {
  await connectDB();
  const farmers = await User.find({ role: "Farmer" }).lean();
  return transformMongoDoc(farmers);
};

// Get farmer by id
export const getFarmerById = async (farmerId: string) => {
  const farmer = await User.findById(farmerId).lean<TBaseUser>();
  return transformMongoDoc(farmer);
};
