"use server";

import { RegisterFormDataType } from "@/types";

// Action: Perform registration
export const doRegistration = async (userData: RegisterFormDataType) => {
  console.log(userData, "userData__________");
  try {
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, errors: { general: "Something went wrong." } };
  }
};
