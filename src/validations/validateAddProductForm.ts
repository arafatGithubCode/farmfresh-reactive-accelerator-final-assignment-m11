import { IProductForm, TAddProductValidationError } from "@/types";
import { validateFile } from "./validateFile";

export const validateAddProductForm = (input: IProductForm) => {
  const errors: TAddProductValidationError = {};

  // validate product name
  if (!input.name) {
    errors.name = "Name is required.";
  } else if (input.name.length < 5) {
    errors.name = "Name length must be 5 characters longer.";
  }

  // validate category
  if (!input.category) {
    errors.category = "Category is required.";
  }

  // validate product description
  if (!input.description) {
    errors.description = "Description is required.";
  } else if (input.description.length < 20) {
    errors.description = "Description length must be 20 characters longer.";
  } else if (input.description.length > 1000) {
    errors.description = "Description must be 1000 characters shorter.";
  }

  // validate price
  if (!input.price) {
    errors.price = "Product price is required.";
  } else if (input.price < 0) {
    errors.price = "Price cannot be negative.";
  } else if (input.price < 2) {
    errors.price = "Minimum amount of price per unit is 2tk upper.";
  }

  // validate product unit
  if (!input.unit) {
    errors.unit = "Unit is required.";
  }

  //   stock validation
  if (!input.stock) {
    errors.stock = "Stock is required.";
  } else if (Number(input.stock) < 1) {
    errors.stock = "Stock must be greater then 1.";
  }

  // validate harvest date
  if (!input.harvestDate) {
    errors.harvestDate = "Harvest date is required.";
  }

  // validate product feature
  if (input.features.length === 0) {
    errors.features = "Please select at least one feature.";
  }

  //   validate file
  const { error } = validateFile({ file: input.images, isRequired: true });
  if (error) {
    errors.images = error;
  }

  return errors;
};
