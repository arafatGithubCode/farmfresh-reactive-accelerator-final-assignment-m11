import { IUserLoginForm } from "@/types";
import { emailValidate, required } from ".";

export const validateLoginForm = (
  input: IUserLoginForm
): Partial<Record<string, unknown>> => {
  const { email, password } = input;

  return {
    email: emailValidate(email) ?? undefined,
    password: required(password),
  };
};
