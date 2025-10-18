import { IResetForm } from "@/types";
import { emailValidate, maxLength, minLength, required } from ".";

export const validateResetForm = (input: IResetForm) => {
  const { email, resetKey, newPassword, confirmPassword } = input;

  return {
    email: emailValidate(email),
    resetKey: required(resetKey),
    newPassword:
      required(newPassword) ??
      minLength(newPassword, 6) ??
      maxLength(newPassword, 50),
    confirmPassword:
      required(confirmPassword) ?? newPassword.trim() !== confirmPassword.trim()
        ? "Password does not match"
        : undefined,
  };
};
