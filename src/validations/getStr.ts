export const getStr = (
  fd: FormData,
  key: string,
  required: boolean
): string | undefined => {
  const v = fd.get(key);
  const s = typeof v === "string" ? v.trim() : undefined;
  if (required && !s) throw new Error(`${key} is required.`);
  return s;
};
