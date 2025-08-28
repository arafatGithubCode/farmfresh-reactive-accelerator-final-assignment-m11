import cloudinary from "@/libs/cloudinary";

export const uploadFiles = async (file: File, type: string) => {
  try {
    if (!file || !type) {
      throw new Error("File and type are required.");
    }

    // convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // choose folder dynamically
    let folder = "farmfresh";
    if (type === "avatar") folder += "/avatars";
    if (type === "product") folder += "/product_images";

    // upload
    const result: any = await new Promise((resolve, reject) => {
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
    return result.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
