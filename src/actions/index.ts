"use server";

import { RegisterFormDataType, RegistrationFormValidationError } from "@/types";
import { validateRegistrationForm } from "@/validations";

// Action: Perform registration
export const doRegistration = async (
  formData: FormData
): Promise<{ success: boolean; errors?: RegistrationFormValidationError }> => {
  try {
    console.log(formData, "form__data");
    const userData: RegisterFormDataType = {
      role: formData.get("role") as string,
      type: formData.get("type") as string,
      file: formData.get("file") as File | null,
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      email: (formData.get("email") as string) || "",
      address: (formData.get("address") as string) || "",
      password: (formData.get("password") as string) || "",
      confirmPassword: (formData.get("confirmPassword") as string) || "",
      phone: (formData.get("phone") as string) || "",
      bio: (formData.get("bio") as string) || "",
      farmName: (formData.get("farmName") as string) || "",
      farmSize: (formData.get("farmSize") as string) || "",
      farmSizeUnit: (formData.get("farmSizeUnit") as string) || "",
      specialization: (formData.get("specification") as string) || "",
      terms: (formData.get("terms") as string) || "",
    };
    const errors = validateRegistrationForm(userData);
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }
    // save user to DB
    const res = await fetch(`${process.env.BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Registration failed.");
    }
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, errors: { general: "Something went wrong." } };
  }
};
