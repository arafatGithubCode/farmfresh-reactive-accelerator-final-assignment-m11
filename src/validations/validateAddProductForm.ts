import { IProductForm, TAddProductValidationError } from "@/types";
import { maxLength, minLength, minValue, required } from ".";
import { validateFile } from "./validateFile";

export const validateAddProductForm = (
  input: IProductForm
): TAddProductValidationError => {
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
  } = input;

  //   validate file
  const { error } = validateFile({ file: images, isRequired: true });

  return {
    name: required(name) ?? minLength(name, 5) ?? maxLength(name, 50),
    category: required(category),
    description:
      required(description) ??
      minLength(description, 20) ??
      maxLength(description, 1000),
    price: minValue(price, 1),
    unit: required(unit),
    stock: minValue(stock, 1),
    harvestDate: required(harvestDate),
    features:
      features?.length === 0
        ? "Please select at least one feature."
        : undefined,
    images: error ? error : undefined,
  };
};
