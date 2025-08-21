export const isValidatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^01\d{9}$/;
  return phoneRegex.test(phone);
};
