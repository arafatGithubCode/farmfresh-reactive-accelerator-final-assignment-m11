import { TUserValidationErrors, UserInput } from "@/types";
import {
  emailValidate,
  maxLength,
  minLength,
  minValue,
  phoneValidate,
  required,
} from ".";
import { validateFile } from "./validateFile";

export const validateRegistrationForm = (
  input: UserInput
): TUserValidationErrors => {
  const {
    role,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    bio,
    address,
    farmAddress,
    farmDistrict,
    farmName,
    farmSize,
    farmSizeUnit,
    avatar,
    terms,
  } = input;

  const isFarmer = role?.toLowerCase() === "farmer";
  const { error: fileErr } = validateFile({
    file: Array.isArray(avatar) ? avatar[0] : avatar,
    maxSize: 5 * 1024 * 1024,
    maxFile: 1,
    isRequired: true,
  });

  return {
    role: required(role, "Role is required."),
    firstName:
      required(firstName) ??
      minLength(firstName, 2) ??
      maxLength(firstName, 20),
    lastName:
      required(lastName) ?? minLength(lastName, 2) ?? maxLength(lastName, 20),
    email: emailValidate(email),
    phone: phoneValidate(phone),
    password:
      required(password) ?? minLength(password, 6) ?? maxLength(password, 100),
    confirmPassword:
      required(confirmPassword) ??
      (password?.trim().toLowerCase() !== confirmPassword?.trim().toLowerCase()
        ? "Passwords do not match."
        : undefined),
    bio: maxLength(bio, 250),
    address:
      required(address) ?? minLength(address, 20) ?? maxLength(address, 100),
    avatar: fileErr ? fileErr : undefined,

    // Farmer-specific fields
    farmAddress: isFarmer
      ? required(farmAddress) ??
        minLength(farmAddress, 20) ??
        maxLength(farmAddress, 100)
      : undefined,
    farmDistrict: isFarmer ? required(farmDistrict) : undefined,
    farmName: isFarmer
      ? required(farmName) ?? minLength(farmName, 5) ?? maxLength(farmName, 20)
      : undefined,
    farmSize: isFarmer
      ? required(farmSize) ?? minValue(farmSize, 1)
      : undefined,
    farmSizeUnit: isFarmer ? required(farmSizeUnit) : undefined,
    terms: !terms
      ? "To continue with us, please accept our terms and conditions."
      : undefined,
  };
};
