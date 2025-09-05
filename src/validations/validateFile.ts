import { IFileValidateOptions, IFileValidationResult } from "@/types";

export const validateFile = ({
  file,
  maxFile = 5,
  maxSize = 100 * 1024 * 1024,
  allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  isRequired = false,
}: IFileValidateOptions): IFileValidationResult => {
  let filesArray: File[] = [];

  if (!file || (Array.isArray(file) && file.length === 0)) {
    if (isRequired) {
      return {
        validFiles: [],
        error: "File is required.",
      };
    }
  }

  // normalize to array
  if (file instanceof File) {
    filesArray = [file];
  } else if (Array.isArray(file)) {
    filesArray = file;
  }

  //   check max file
  if (filesArray.length > maxFile) {
    return {
      validFiles: [],
      error: `You can upload a maximum of ${maxFile} file(s)`,
    };
  }

  // check file size and type
  for (const f of filesArray) {
    if (f.size > maxSize) {
      return {
        validFiles: [],
        error: `${f.name} exceeds the maximum size of ${(
          maxSize /
          (1024 * 1024)
        ).toFixed(0)}MB`,
      };
    }

    if (!allowedTypes.includes(f.type)) {
      return {
        validFiles: [],
        error: `${f.type} is not an allowed type | ${f.name.slice(0, 10)}`,
      };
    }
  }

  return { validFiles: filesArray, error: null };
};
