import { IProduct, TAddProductValidationError } from "@/types";
import { validateFile } from "./validateFile";

export const validateAddProductForm = (input: IProduct) => {
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
  } else if (input.description.length < 5) {
    errors.description = "Description length must be 50 characters longer.";
  }

  // validate farmLocation
  if (!input.farmLocation) {
    errors.farmLocation = "Farm location is required.";
  } else if (input.farmLocation.length < 10) {
    errors.farmLocation = "Location length must be 10 characters longer.";
  }

  // validate price
  if (!input.price) {
    errors.price = "Product price is required.";
  } else if (input.price < 0) {
    errors.price = "Price cannot be negative.";
  }

  // validate product unit
  if (!input.unit) {
    errors.unit = "Unit is required.";
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
  if (input.files.length === 0) {
    errors.files = "Product image is required.";
  } else {
    const { error: fileErr } = validateFile(input.files);
    errors.files = fileErr ?? undefined;
  }

  return errors;
};
