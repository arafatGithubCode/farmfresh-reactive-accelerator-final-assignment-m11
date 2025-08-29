export const getFile = (fd: FormData, key: string): File | null => {
  const v = fd.get(key);
  return v instanceof File ? v : null;
};
