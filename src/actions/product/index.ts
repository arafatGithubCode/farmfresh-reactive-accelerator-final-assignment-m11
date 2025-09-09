"use server";

import { createProduct } from "@/queries/product";
import { uploadImage } from "@/services/UploadImag";
import { IProductForm, IProductModel, TActionResponse } from "@/types";
import { catchErr } from "@/utils/catchErr";
import { getUserSession } from "@/utils/getUserSession";
import { validateAddProductForm } from "@/validations/validateAddProductForm";

export const doAddingProduct = async (
  formData: FormData
): Promise<TActionResponse> => {
  try {
    // Only allow if the role is Farmer
    const session = await getUserSession();
    if (session?.role !== "Farmer") {
      throw new Error("Only farmer can add product.");
    }

    const formValues: IProductForm = {
      name: (formData.get("name") as string) ?? "",
      category: (formData.get("category") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      farmLocation: (formData.get("farmLocation") as string) ?? "",
      harvestDate: (formData.get("harvestDate") as string) ?? "",
      images: formData.getAll("images") as File[],
      price: Number(formData.get("price")) || 0,
      features: formData.getAll("features") as string[],
      stock: Number(formData.get("stock") || 0),
      unit: (formData.get("unit") as string) ?? "",
    };

    // run validation
    const errors = validateAddProductForm(formValues);
    if (Object.keys(errors).length > 0) {
      throw new Error(Object.values(errors)[0]!);
    }

    const {
      name,
      category,
      description,
      farmLocation,
      harvestDate,
      images,
      price,
      features,
      stock,
      unit,
    } = formValues;

    // upload product's images
    const uploadResult = await Promise.all(
      images.map((file) => uploadImage(file, "product"))
    );
    const uploaded = uploadResult.filter((r) => r.success);
    const failed = uploadResult.filter((r) => !r.success);

    if (failed.length > 0) {
      throw new Error(failed[0].error);
    }

    const imagesUrl = uploaded.map((r) => r.secure_url);

    const payload: Omit<IProductModel, "_id"> = {
      name,
      category,
      description,
      farmLocation,
      harvestDate,
      imagesUrl,
      price,
      features,
      stock,
      unit,
    };

    if (session?.id) {
      console.log(session, "session");
      payload.farmerId = session.id;
      payload.ratings = 0;
      payload.farmerName = session.name;
      payload.district = session.district;
    }

    const createdProduct = await createProduct(payload);

    return {
      success: true,
      message: `${createdProduct.name} has been added successfully.`,
    };
  } catch (err) {
    return catchErr(err, "Failed to Add product!");
  }
};
