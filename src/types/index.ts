import { Document } from "mongoose";

// User model interface
export interface IUserModel extends Document {
  role: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bio?: string;
  password: string;
  confirmPassword: string;
}
