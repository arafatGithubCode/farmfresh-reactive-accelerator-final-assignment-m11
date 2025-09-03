// User Role
export type UserRole = "Farmer" | "Customer";

// User model interface
export interface IUserDB {
  role: UserRole;
  avatar_url?: string;
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
}

export interface IUserRegistrationForm {
  role: UserRole;
  file: File | null;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
  phone: string;
  bio: string;
  farmName?: string;
  specialization?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  terms: boolean;
}

// Error type for registration form
export type RegistrationFormValidationError = Partial<
  Record<keyof IUserRegistrationForm, string>
>;

// Upload Kind
export type UploadKind = "avatar" | "product";

// Upload result type
export interface UploadResult {
  success: true;
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

// Upload error type
export interface UploadError {
  success: false;
  error: string;
}

// Upload response
export type UploadResponse = UploadResult | UploadError;

// Toast mode type
export type ToastMode = "SUCCESS" | "ERROR" | "WARNING";

// Credential Input type
export interface CredentialInput {
  email: string;
  password: string;
}

// Session User type
export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
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

// file validation result
export interface IFileValidationResult {
  validFiles: File[];
  error: string | null;
}
