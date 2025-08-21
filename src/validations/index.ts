// validations.ts
import { RegisterFormDataType, RegistrationFormValidationError } from "@/types";
import { isValidatePhoneNumber } from "@/utils/isValidatePhoneNumber";
import { isValidEmail } from "@/utils/isValidEmail";

export const validateRegistrationForm = (
  input: RegisterFormDataType
): RegistrationFormValidationError => {
  const errors: RegistrationFormValidationError = {};

  if (!input.role) {
    errors.role = "Role is required.";
  }

  if (!input.firstName) {
    errors.firstName = "First name is required.";
  } else if (input.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters long.";
  }

  if (!input.lastName) {
    errors.lastName = "Last name is required.";
  } else if (input.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters long.";
  }

  if (!input.email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Invalid email.";
  }

  if (!input.password) {
    errors.password = "Password is required.";
  } else if (input.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Confirm password does not match password.";
  }

  if (!input.phone) {
    errors.phone = "Phone is required.";
  } else if (!isValidatePhoneNumber(input.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!input.file) {
    errors.file = "Profile picture is required.";
  } else if (input.file.size > 2 * 1024 * 1024) {
    errors.file = "Max file size is 2MB.";
  }

  if (!input.address) {
    errors.address = "Address is required.";
  } else if (input.address.length < 20) {
    errors.address = "Address must be 20 characters longer";
  }

  if (input.role.toLowerCase() === "farmer") {
    if (!input.farmName) errors.farmName = "Farm name is required.";
    if (!input.farmSize) errors.farmSize = "Farm size is required.";
    if (!input.farmSizeUnit)
      errors.farmSizeUnit = "Farm size unit is required.";
    if (!input.specialization)
      errors.specialization = "Specialization is required";
  }

  if (input.terms !== true) {
    errors.terms =
      "To continue with us, please accept our terms and conditions.";
  }

  return errors;
};
