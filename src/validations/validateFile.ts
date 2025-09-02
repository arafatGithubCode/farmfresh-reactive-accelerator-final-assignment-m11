import { IFileValidationResult } from "@/types";

export const validateFile = (
  files: FileList | File[],
  maxFile = 5,
  maxSize = 100 * 1024 * 1024
): IFileValidationResult => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const validFiles = Array.from(files).filter((file) =>
    allowedTypes.includes(file.type)
  );

  if (validFiles.length > maxFile) {
    return {
      validFiles: validFiles.slice(0, maxSize),
      error: `You can upload up to ${maxFile} files only.`,
    };
  } else {
    for (const file of validFiles) {
      if (file.size > maxSize) {
        return {
          validFiles: [],
          error: `File ${file.name.slice(0, 15)}... exceeds the ${(
            maxSize /
            (1024 * 1024)
          ).toFixed(0)}MB size limit.`,
        };
      }
    }
  }

  return {
    validFiles: validFiles,
    error: null,
  };
};
