import { connectDB } from "@/libs/connectDB";
import { getErrorMessage } from "@/libs/errorHandler";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Create a user
export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const userData = await req.json();
    console.log("user-data", userData);
    // Delete farm related data if the role is Customer
    if (userData.role === "Customer") {
      delete userData.farmName;
      delete userData.specialization;
      delete userData.farmSize;
      delete userData.farmSizeUnit;
    }

    // delete file instead just save its url
    if (userData.file) {
      delete userData.file;
    }

    // delete confirm password
    delete userData.confirmPassword;

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData?.password, salt);

    const payload = {
      ...userData,
      password: hashedPassword,
    };

    await User.create(payload);
    return new NextResponse("A user has been created", { status: 201 });
  } catch (error: unknown) {
    return new NextResponse(getErrorMessage(error), { status: 500 });
  }
};
