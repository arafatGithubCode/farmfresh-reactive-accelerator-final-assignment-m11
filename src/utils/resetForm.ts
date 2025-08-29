import { IUserRegistrationForm } from "@/types";

export const resetForm = (): IUserRegistrationForm => ({
  farmName: "",
  lastName: "",
  address: "",
  bio: "",
  confirmPassword: "",
  email: "",
  file: null,
  firstName: "",
  password: "",
  phone: "",
  role: "Customer",
  terms: false,
  farmSize: "",
  farmSizeUnit: "",
  specialization: "",
});
