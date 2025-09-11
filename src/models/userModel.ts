import { IUserDB } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

// User role enum
enum UserRole {
  farmer = "Farmer",
  customer = "Customer",
}

const userSchema = new Schema<IUserDB>(
  {
    role: {
      type: String,
      required: [true, "User role is required."],
      enum: Object.values(UserRole),
      default: UserRole.customer,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Profile picture is required"],
    },
    firstName: {
      type: String,
      required: [true, "first name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required."],
      trim: true,
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
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be 6 characters or longer"],
      trim: true,
    },
    terms: {
      type: Boolean,
      required: [
        true,
        "To continue with us, please accept our terms and conditions.",
      ],
    },
    farmName: {
      type: String,
    },
    farmSize: {
      type: String,
    },
    farmSizeUnit: {
      type: String,
    },
    specialization: {
      type: String,
    },
    farmDistrict: {
      type: String,
    },
    farmAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User: Model<IUserDB> =
  mongoose.models?.User ?? mongoose.model<IUserDB>("User", userSchema);
