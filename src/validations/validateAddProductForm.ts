import { IProductForm, TAddProductValidationError } from "@/types";
import { maxLength, minLength, minValue, required } from ".";
import { validateFile } from "./validateFile";

export const validateAddProductForm = <T extends string[] | File[]>(
  input: IProductForm<T>
): TAddProductValidationError<T> => {
  const {
    name,
    category,
    description,
    features,
    harvestDate,
    images,
    price,
    stock,
    unit,
    deliveryMethod,
    baseDeliveryFee,
    perUnitDeliveryFee,
    serviceFee,
  } = input;

  //   validate file
  let fileErr;
  if (images instanceof File) {
    const { error } = validateFile({ file: images, isRequired: true });
    fileErr = error;
  }

  return {
    name: required(name) ?? minLength(name, 5) ?? maxLength(name, 50),
    category: required(category),
    description:
      required(description) ??
      minLength(description, 20) ??
      maxLength(description, 1000),
    price: minValue(price, 1),
    baseDeliveryFee: minValue(baseDeliveryFee, 1),
    perUnitDeliveryFee: minValue(perUnitDeliveryFee, 1),
    serviceFee: minValue(serviceFee, 1),
    unit: required(unit),
    stock: minValue(stock, 1),
    harvestDate: required(harvestDate),
    features:
      features?.length === 0
        ? "Please select at least one feature."
        : undefined,
    images: fileErr ? fileErr : undefined,
    deliveryMethod: required(deliveryMethod),
  };
};
