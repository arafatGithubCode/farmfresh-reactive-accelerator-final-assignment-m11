import { IUserModel } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const userSchema = new Schema<IUserModel>(
  {
    role: {
      type: String,
      required: [true, "User role is required."],
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required."],
    },
    name: {
      type: String,
      required: [true, "User name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    bio: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be 6 characters or longer"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
    },
  },
  { timestamps: true }
);

export const User: Model<IUserModel> =
  mongoose.models?.User ?? mongoose.model<IUserModel>("User", userSchema);
