import { isValidatePhoneNumber } from "@/utils/isValidatePhoneNumber";
import { isValidEmail } from "@/utils/isValidEmail";

export const required = (value?: string, msg = "This field is required.") =>
  !value ? msg : undefined;

export const minLength = (value?: string, len = 2, msg?: string) =>
  value && value.length < len
    ? msg ?? `Must be at least ${len} characters.`
    : undefined;

export const minValue = (value?: number | string, min = 1, msg?: string) =>
  value && Number(value) < min
    ? msg ?? `Value must be at least ${min}`
    : undefined;

export const maxLength = (value?: string, len = 20, msg?: string) =>
  value && value.length > len
    ? msg ?? `Maximum allowed length is ${len} characters`
    : undefined;

export const emailValidate = (value?: string) =>
  !value
    ? "Email is required."
    : !isValidEmail(value)
    ? "Please enter a valid email address."
    : undefined;

export const phoneValidate = (value?: string) =>
  !value
    ? "Phone is required."
    : !isValidatePhoneNumber(value)
    ? "Please enter a valid phone number."
    : undefined;
