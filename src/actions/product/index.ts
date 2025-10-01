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
      images:
        (formData.getAll("images") as File[]).filter(
          (file) => file instanceof File && file.size > 0
        ) ?? [],
      price: Number(formData.get("price")) || 0,
      discountRate: Number(formData.get("discountRate")) || 0,
      features: formData.getAll("features") as string[],
      stock: Number(formData.get("stock") || 0),
      unit: (formData.get("unit") as string) ?? "",
      deliveryMethod:
        (formData.get("deliveryMethod") as "SAME_DAY" | "REGULAR" | "") ?? "",
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

    const imagesUrl = uploaded.map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
    }));

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

    const createdProduct: Omit<IProductBase, "id"> = await createProduct(
      payload
    );

    return {
      success: true,
      message: `${createdProduct.name} has been added successfully.`,
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

    const parseIsActive: boolean =
      formData.get("isActive") === "true" ? true : false;

    const formValues: IProductForm<File[]> = {
      name: (formData.get("name") as string) ?? "",
      category: (formData.get("category") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      harvestDate: (formData.get("harvestDate") as string) ?? "",
      images:
        (formData.getAll("images") as File[]).filter(
          (file) => file instanceof File && file.size > 0
        ) ?? [],
      price: Number(formData.get("price")) || 0,
      discountRate: Number(formData.get("discountRate")) || 0,
      features: formData.getAll("features") as string[],
      stock: Number(formData.get("stock") || 0),
      unit: (formData.get("unit") as string) ?? "",
      deliveryMethod: formData.get("deliveryMethod") as "",
      baseDeliveryFee: Number(formData.get("baseDeliveryFee")) || 0,
      perUnitDeliveryFee: Number(formData.get("perUnitDeliveryFee")) || 0,
      serviceFee: Number(formData.get("serviceFee")) || 0,
      isActive: parseIsActive,
    };

    // run validation
    const validationErrors = validateAddProductForm(formValues);
    if (
      validationErrors &&
      Object.values(validationErrors).some((field) => field)
    ) {
      throw new Error(Object.values(validationErrors)[0]!);
    }

    const originalProductData: Omit<
      IProductForm<File[]>,
      "isActive" | "images"
    > = {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      harvestDate: product.harvestDate,
      discountRate: product.discountRate,
      features: product.features,
      stock: product.stock,
      unit: product.unit,
      deliveryMethod: product.deliveryMethod,
      baseDeliveryFee: product.baseDeliveryFee,
      perUnitDeliveryFee: product.perUnitDeliveryFee,
      serviceFee: product.serviceFee,
    };

    const productDataForUpdate: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(formValues)) {
      if (key === "features" && Array.isArray(value)) {
        const originalFeatures = originalProductData.features ?? [];
        if (
          value.length !== originalFeatures.length ||
          !value.every((v, i) => v === originalFeatures[i])
        ) {
          productDataForUpdate["features"] = value;
        }
      } else if (key === "images" && Array.isArray(value)) {
        if (value.some((file) => file instanceof File)) {
          productDataForUpdate["images"] = value;
        }
      } else if (key !== "images" && key !== "features") {
        if (
          value !== originalProductData[key as keyof typeof originalProductData]
        ) {
          productDataForUpdate[key] = value;
        }
      }
    }

    if (Object.keys(productDataForUpdate).includes("isActive")) {
      delete productDataForUpdate["isActive"];
    }

    if (
      !productDataForUpdate ||
      Object.keys(productDataForUpdate).length === 0
    ) {
      throw new Error("No change made to update this product.");
    }

    // upload updated image
    let imagesUrl: { url: string; public_id: string }[] = [];

    if (
      Array.isArray(productDataForUpdate.images) &&
      productDataForUpdate.images.length > 0
    ) {
      const images = productDataForUpdate.images as File[];

      const uploadResult = await Promise.all(
        images.map((file) => uploadImage(file, "product"))
      );

      const uploaded = uploadResult.filter((r) => r.success);
      const failed = uploadResult.filter((r) => !r.success);

      if (failed.length > 0) {
        throw new Error(failed[0].error);
      }

      imagesUrl = uploaded.map((r) => ({
        url: r.secure_url,
        public_id: r.public_id,
      }));
      if (imagesUrl.length > 0) {
        productDataForUpdate["imagesUrl"] = [
          ...product.imagesUrl,
          ...imagesUrl,
        ];
      }

      // remove raw File objects before DB update
      delete productDataForUpdate.images;
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
