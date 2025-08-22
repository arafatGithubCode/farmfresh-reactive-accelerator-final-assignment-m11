import { Document } from "mongoose";

// User model interface
export interface IUser extends Document {
  role: "Farmer" | "Customer" | string;
  avatar_url: string;
  firstName: string;
  email: string;
  address: string;
  password: string;
  lastName: string;
  phone: string;
  bio: string;
  farmName?: string;
  specialization?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  terms: boolean;
}

export interface IUserRegistrationForm {
  role: "Farmer" | "Customer";
  file: File | null;
  avatar_url: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
  phone: string;
  bio: string;
  farmName?: string;
  specialization?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  terms: boolean;
}

// Error type for registration form
export type RegistrationFormValidationError = Partial<
  Record<keyof IUserRegistrationForm, string>
>;
