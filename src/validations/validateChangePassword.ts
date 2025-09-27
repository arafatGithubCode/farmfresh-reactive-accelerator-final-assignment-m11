import { minLength, required } from "./index";
interface IInput {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}
export const validateChangePassword = (
  input: IInput
): Partial<Record<string, unknown>> => {
  return {
    currentPassword: required(input.currentPassword),
    newPassword: required(input.newPassword) ?? minLength(input.newPassword, 6),
    newConfirmPassword:
      required(input.newConfirmPassword) ??
      (input.newConfirmPassword?.trim().toLowerCase() !==
      input.newConfirmPassword?.trim().toLowerCase()
        ? "Passwords do not match."
        : undefined),
  };
};
