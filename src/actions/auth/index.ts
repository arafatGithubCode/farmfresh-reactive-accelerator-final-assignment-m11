"use server";

import { signIn, signOut } from "@/auth";
import { connectDB } from "@/libs/connectDB";
import { User } from "@/models/userModel";
import { createUser, getUserByEmail } from "@/queries/user";
import { uploadImage } from "@/services/UploadImag";
import { IUserDB, IUserRegistrationForm } from "@/types";
import { catchErr } from "@/utils/catchErr";
import { transformMongoDoc } from "@/utils/transformMongoDoc";
import { validateRegistrationForm } from "@/validations/validateRegistrationForm";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

// Perform registration
export const doRegistration = async (formData: FormData) => {
  await connectDB();
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
      farmDistrict: formData.get("farmDistrict"),
      farmAddress: formData.get("farmAddress"),
    } as IUserRegistrationForm;

    // run validation
    const validationErrors = validateRegistrationForm(formValues);
    if (
      validationErrors &&
      Object.values(validationErrors).some((field) => field)
    ) {
      throw new Error(Object.values(validationErrors)[0]!); // return first err
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
      farmDistrict,
      farmAddress,
    } = formValues;

    // Reject duplicate
    const exist = await getUserByEmail(email);
    if (exist) throw new Error("This email already exists.");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // build the payload (no farms fields for the customer)
    const payload: Omit<IUserDB, "id"> = {
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
      if (farmDistrict) payload.farmDistrict = farmDistrict;
      if (farmAddress) payload.farmAddress = farmAddress;
    }

    // upload avatar
    if (avatar) {
      const upload = await uploadImage(avatar, "avatar");
      if (!upload.success) throw new Error(upload.error);
      payload.image = upload.secure_url;
    } else {
      payload.image = undefined;
    }

    // create user
    const created = await createUser(payload);
    return { success: true, userId: created._id.toString() };
  } catch (err: unknown) {
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

// Perform update profile
export const doUpdateProfile = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    if (typeof email !== "string") {
      throw new Error("Email is required and must be string.");
    }
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error("Email does not exist.");
    }

    const userDataForUpdate: Record<string, unknown> = {};

    // upload avatar
    const avatar = formData.get("avatar");
    if (avatar && avatar instanceof File) {
      const upload = await uploadImage(avatar, "avatar");
      if (!upload.success) throw new Error(upload.error);
      userDataForUpdate.image = upload.secure_url;
    } else {
      userDataForUpdate.image = undefined;
    }

    for (const [key, value] of Object.entries(
      Object.fromEntries(formData.entries())
    )) {
      if (
        typeof value === "string" &&
        existingUser[key as keyof typeof existingUser] !== value
      ) {
        userDataForUpdate[key] = value;
      }
    }

    delete userDataForUpdate["email"];

    const updatedUserWithMetaData = await User.findByIdAndUpdate(
      { _id: new Types.ObjectId(existingUser?.id) },
      userDataForUpdate,
      { new: true }
    ).lean();

    const updatedUserWithoutMetaData = transformMongoDoc(
      updatedUserWithMetaData
    );

    console.log(updatedUserWithoutMetaData);

    return { success: true, updatedUser: updatedUserWithoutMetaData };
  } catch (error) {
    const errMsg = catchErr(error);
    return { success: false, err: errMsg };
  }
};
