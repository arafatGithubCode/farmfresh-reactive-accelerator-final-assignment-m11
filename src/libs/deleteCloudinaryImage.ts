import cloudinary from "./cloudinary";

export const deleteCloudinaryImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
