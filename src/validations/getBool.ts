export const getBool = (
  fd: FormData,
  key: string,
  required: boolean
): boolean | undefined => {
  const v = fd.get(key);
  if (v === null) {
    if (required) throw new Error(`${key} is required.`);
    return undefined;
  }

  // supports "true/on/1"
  const s = String(v).toLowerCase();
  return s === "true" || s === "on" || s === "1";
};
