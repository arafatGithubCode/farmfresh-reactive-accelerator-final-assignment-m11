import cloudinary from "@/libs/cloudinary";

export const uploadFile = async (file: File) => {
  // convert file to base64
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

  // upload to cloudinary
  const uploadResponse = await cloudinary.uploader.upload(base64String, {
    folder: "farmfresh/avatars",
    resource_type: "image",
  });

  return uploadResponse.secure_url;
};
