"use server";

import { signIn, signOut } from "@/auth";
import { connectDB } from "@/libs/connectDB";
import { createUser, getUserByEmail } from "@/queries/user";
import { uploadImage } from "@/services/UploadImag";
import { IUserDB, IUserRegistrationForm } from "@/types";
import { validateRegistrationForm } from "@/validations/validateRegistrationForm";
import bcrypt from "bcryptjs";

// Perform registration
export const doRegistration = async (formData: FormData) => {
  await connectDB();
  console.log(formData);
  try {
    const formValues = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
      bio: formData.get("bio"),
      avatar: formData.get("avatar"),
      farmName: formData.get("farmName"),
      farmSize: formData.get("farmSize"),
      farmSizeUnit: formData.get("farmSizeUnit"),
      specialization: formData.get("specialization"),
      terms: formData.get("terms") === "true" || formData.get("terms") === "on",
    } as IUserRegistrationForm;

    // run validation
    const errors = validateRegistrationForm(formValues);
    console.log("server-side-validation-err", errors);
    if (Object.keys(errors).length > 0) {
      throw new Error(Object.values(errors)[0]!); // return first err
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      role,
      bio,
      avatar,
      farmName,
      farmSize,
      farmSizeUnit,
      specialization,
    } = formValues;

    // Reject duplicate
    const exist = await getUserByEmail(email);
    if (exist) throw new Error("This email already exists.");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // build the payload (no farms fields for the customer)
    const payload: IUserDB = {
      role,
      firstName,
      lastName,
      email,
      phone,
      bio,
      address,
      password: hashedPassword,
      terms: true,
    };

    if (role === "Farmer") {
      if (farmName) payload.farmName = farmName;
      if (specialization) payload.specialization = specialization;
      if (farmSize) payload.farmSize = farmSize;
      if (farmSizeUnit) payload.farmSizeUnit = farmSizeUnit;
    }

    // upload avatar
    if (avatar) {
      const upload = await uploadImage(avatar, "avatar");
      if (!upload.success) throw new Error(upload.error);
      payload.avatar_url = upload.secure_url;
    } else {
      payload.avatar_url = undefined;
    }

    // create user
    const created = await createUser(payload);
    return { success: true, userId: created._id.toString() };
  } catch (err: unknown) {
    console.log(err, "server-side-err");
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    if (typeof err === "string") {
      return { success: false, error: err };
    }
    return { success: false, error: "Unknown registration error" };
  }
};

// Perform credential login
export const doCredentialLogIn = async (formData: FormData) => {
  await connectDB();
  const result = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
  });

  return result;
};

// Perform sing out
export const doSignOut = async () => {
  await connectDB();
  await signOut();
};

// Perform google auth
export const doSignIn = async () => {
  await connectDB();
  await signIn("google", { redirectTo: "/products" });
};
