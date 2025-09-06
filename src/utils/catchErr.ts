export const catchErr = (
  err: unknown,
  defaultMsg = "Unknown Error!"
): { success: false; error: string } => {
  if (err instanceof Error) {
    return { success: false, error: err.message };
  }
  if (typeof err === "string") {
    return { success: false, error: err };
  }
  return { success: false, error: defaultMsg };
};
