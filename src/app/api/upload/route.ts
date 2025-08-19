import cloudinary from "@/libs/cloudinary";
import { getErrorMessage } from "@/libs/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "avatar" or "product"

    if (!file || !type) {
      return new NextResponse("File and type are required.", { status: 400 });
    }

    // convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // choose folder dynamically
    let folder = "farmfresh";
    if (type === "avatar") folder += "/avatars";
    if (type === "product") folder += "/product_images";

    // upload
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse(getErrorMessage(error), { status: 500 });
  }
};
