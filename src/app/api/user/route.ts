import { connectDB } from "@/libs/connectDB";
import { getErrorMessage } from "@/libs/errorHandler";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Create a user
export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const { role, avatar, name, email, phone, address, bio, password } =
      await req.json();

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      role,
      avatar,
      name,
      email,
      phone,
      address,
      bio,
      password: hashedPassword,
    };

    await User.create(payload);
    return new NextResponse("A user has been created", { status: 201 });
  } catch (error: unknown) {
    return new NextResponse(getErrorMessage(error), { status: 500 });
  }
};
