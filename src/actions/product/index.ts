"use server";

import { Product } from "@/models/productModel";
import { createProduct, getProduct } from "@/queries/product";
import { uploadImage } from "@/services/UploadImag";
import { IProductBase, IProductForm, TActionResponse } from "@/types";
import { catchErr } from "@/utils/catchErr";
import { getUserSession } from "@/utils/getUserSession";
import { transformMongoDoc } from "@/utils/transformMongoDoc";
import { validateAddProductForm } from "@/validations/validateAddProductForm";
import mongoose, { Types } from "mongoose";

// ===== Add Product ===== //
export const doAddingProduct = async (
  formData: FormData
): Promise<TActionResponse> => {
  try {
    // Only allow if the role is Farmer
    const session = await getUserSession();
    if (session?.role !== "Farmer") {
      throw new Error("Only farmer can add product.");
    }

    const formValues: IProductForm<File[]> = {
      name: (formData.get("name") as string) ?? "",
      category: (formData.get("category") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      harvestDate: (formData.get("harvestDate") as string) ?? "",
      images: formData.getAll("images") as File[],
      price: Number(formData.get("price")) || 0,
      discountRate: Number(formData.get("discountRate")) || 0,
      features: formData.getAll("features") as string[],
      stock: Number(formData.get("stock") || 0),
      unit: (formData.get("unit") as string) ?? "",
      deliveryMethod: formData.get("deliveryMethod") as "",
      baseDeliveryFee: Number(formData.get("baseDeliveryFee")) || 0,
      perUnitDeliveryFee: Number(formData.get("perUnitDeliveryFee")) || 0,
      serviceFee: Number(formData.get("serviceFee")) || 0,
      isActive: true,
    };

    // run validation
    const validationErrors = validateAddProductForm(formValues);
    if (
      validationErrors &&
      Object.values(validationErrors).some((field) => field)
    ) {
      throw new Error(Object.values(validationErrors)[0]!);
    }

    const {
      name,
      category,
      description,
      harvestDate,
      images,
      price,
      features,
      stock,
      unit,
      discountRate,
      baseDeliveryFee,
      deliveryMethod,
      perUnitDeliveryFee,
      serviceFee,
      isActive,
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

    const payload: Omit<IProductBase, "id"> = {
      name,
      category,
      description,
      harvestDate,
      imagesUrl,
      price,
      features,
      stock,
      unit,
      discountRate,
      baseDeliveryFee,
      deliveryMethod,
      perUnitDeliveryFee,
      serviceFee,
      isActive,
    };

    if (session?.id) {
      payload.farmer = new mongoose.Types.ObjectId(session.id);
    }

    const createdProduct = await createProduct(payload);

    return {
      success: true,
      message: `${createdProduct.name} has been added successfully.`,
      data: createdProduct,
    };
  } catch (err) {
    const errMsg = catchErr(err, "Failed to Add product!");
    return { success: errMsg.success, error: errMsg.error };
  }
};

// ===== Edit Product ===== //
export const doEditingProduct = async (
  formData: FormData,
  editProductId: string
): Promise<TActionResponse> => {
  try {
    const user = await getUserSession();
    const userId = user?.id;
    const product = await getProduct(editProductId);

    if (!product) {
      throw new Error("This product does not exist.");
    }

    if (userId !== product.farmer.id) {
      throw new Error("You are not allowed to edit this product.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { farmer, ...originalProduct } = product;

    const productDataForUpdate: Record<string, unknown> = {};

    console.log(originalProduct);
    console.log(formData);

    for (const [key, value] of Object.entries(
      Object.fromEntries(formData.entries())
    )) {
      const originalValue =
        originalProduct[key as keyof typeof originalProduct];
      const parsedValue =
        typeof originalValue === "number" ? Number(value) : value;

      if (originalValue !== parsedValue) {
        productDataForUpdate[key] = parsedValue;
      }
    }

    if (
      !productDataForUpdate ||
      Object.keys(productDataForUpdate).length === 0
    ) {
      throw new Error("No changes to update");
    }

    const updatedProductWithMetaData = await Product.findByIdAndUpdate(
      { _id: new Types.ObjectId(editProductId) },
      productDataForUpdate,
      { new: true }
    ).lean<IProductBase>();

    const updatedProductWithoutMetaData = transformMongoDoc(
      updatedProductWithMetaData
    );

    if (!updatedProductWithoutMetaData) {
      throw new Error(`${product.name} failed to update.`);
    }

    return {
      success: true,
      data: updatedProductWithoutMetaData!,
      message: `${updatedProductWithoutMetaData.name} has been updated successfully.`,
    };
  } catch (error) {
    const errMsg = catchErr(error, "Failed to Edit product!");
    return { success: errMsg.success, error: errMsg.error };
  }
};
