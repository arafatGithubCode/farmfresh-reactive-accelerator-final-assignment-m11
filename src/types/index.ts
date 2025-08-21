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
}

// Registration form type
export interface RegisterFormDataType {
  role: "Farmer" | "Customer" | string;
  type: string;
  file: File | null;
  firstName: string;
  email: string;
  address: string;
  password: string;
  lastName: string;
  phone: string;
  bio: string;
  confirmPassword: string;
  farmName?: string;
  specialization?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  terms: boolean;
  general?: string;
}

// Error type for registration form
export type RegistrationFormValidationError = Partial<
  Record<keyof RegisterFormDataType, string>
>;
