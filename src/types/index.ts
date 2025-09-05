// User Role
export type TUserRole = "Farmer" | "Customer";

// Base user type
type TBaseUser = {
  role: TUserRole;
  firstName: string;
  email: string;
  address: string;
  password: string;
  lastName: string;
  phone: string;
  bio?: string;
  farmName?: string;
  specialization?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  terms: boolean;
};

// User DB type
export interface IUserDB extends TBaseUser {
  avatar_url?: string;
}

// User registration form
export interface IUserRegistrationForm
  extends Omit<
    TBaseUser,
    "bil" | "farmName" | "specialization" | "farmSize" | "farmSizeUnit"
  > {
  avatar: File | null;
  confirmPassword: string;
  bio: string;
  farmName: string;
  specialization: string;
  farmSize: string;
  farmSizeUnit: string;
}

// Error type for registration form
export type TRegistrationFormValidationError = Partial<
  Record<keyof IUserRegistrationForm, string>
>;

// Upload Kind
export type TUploadKind = "avatar" | "product";

// Upload result type
export interface IUploadResult {
  success: true;
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

// Upload error type
export interface IUploadError {
  success: false;
  error: string;
}

// Upload response
export type UploadResponse = IUploadResult | IUploadError;

// Toast mode type
export type ToastMode = "SUCCESS" | "ERROR" | "WARNING";

// Credential Input type
export interface ICredentialInput {
  email: string;
  password: string;
}

// User session type
export interface IUserSession {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
}

// Add product form
export interface IProduct {
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  images: File[];
  farmLocation: string;
  harvestDate: string;
  features: string[];
}

export interface IProductModel extends IProduct {
  farmerId: string;
  imagesUrl: string[];
}

// error type for add product form
export type TAddProductValidationError = Partial<
  Record<keyof IProduct, string>
>;

// file validation options
export interface IFileValidateOptions {
  file: File | File[] | FileList | null | undefined;
  maxFile?: number;
  maxSize?: number;
  allowedTypes?: string[];
  isRequired?: boolean;
}
// file validation result
export interface IFileValidationResult {
  validFiles: File[];
  error: string | null;
}
