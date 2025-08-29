"use server";

import { createUser, getUserByEmail } from "@/queries/user";
import { uploadImage } from "@/services/UploadImag";
import { IUserDB, UserRole } from "@/types";
import { getBool } from "@/validations/getBool";
import { getFile } from "@/validations/getFile";
import { getStr } from "@/validations/getStr";
import bcrypt from "bcryptjs";

export const doRegistration = async (formData: FormData) => {
  try {
    // Extract and validate base field
    const role = getStr(formData, "role", true) as UserRole;
    if (role !== "Customer" && role !== "Farmer")
      throw new Error("Invalid role");

    const firstName = getStr(formData, "firstName", true)!;
    const lastName = getStr(formData, "lastName", true)!;
    const email = getStr(formData, "email", true)!;
    const phone = getStr(formData, "phone", true)!;
    const bio = getStr(formData, "bio", false) ?? "";
    const address = getStr(formData, "address", true)!;
    const password = getStr(formData, "password", true)!;
    const terms = getBool(formData, "terms", true);

    if (terms !== true) throw new Error("You must accept terms & conditions.");

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
      const farmName = getStr(formData, "farmName", false) ?? undefined;
      const specialization =
        getStr(formData, "specialization", false) ?? undefined;
      const farmSize = getStr(formData, "farmSize", false) ?? undefined;
      const farmSizeUnit = getStr(formData, "farmSizeUnit", false) ?? undefined;

      if (farmName) payload.farmName = farmName;
      if (specialization) payload.specialization = specialization;
      if (farmSize) payload.farmSize = farmSize;
      if (farmSizeUnit) payload.farmSizeUnit = farmSizeUnit;
    }

    // upload avatar
    const avatarFile = getFile(formData, "file")!;
    if (avatarFile) {
      const upload = await uploadImage(avatarFile, "avatar");

      if (!upload.success) throw new Error(upload.error);
      payload.avatar_url = upload.success_url;
    } else {
      payload.avatar_url = undefined;
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
