import { Types } from "mongoose";

//===== User Types Start =====//
export type TUserRole = "Farmer" | "Customer";

export interface ICredentialInput {
  email: string;
  password: string;
}

export interface IUserSession {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
}
interface TBaseUser {
  role: TUserRole;
  firstName: string;
  email: string;
  address: string;
  password: string;
  lastName: string;
  phone: string;
  farmAddress?: string;
  bio?: string;
  farmName?: string;
  specialization?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  farmDistrict?: string;
  terms: boolean;
}

export interface IUserDB extends TBaseUser {
  _id: Types.ObjectId;
  image?: string;
}
export interface IUserRegistrationForm
  extends Omit<
    TBaseUser,
    | "bio"
    | "farmName"
    | "specialization"
    | "farmSize"
    | "farmSizeUnit"
    | "farmAddress"
    | "farmDistrict"
  > {
  avatar: File | null;
  confirmPassword: string;
  bio: string;
  farmName: string;
  specialization: string;
  farmSize: string;
  farmSizeUnit: string;
  farmDistrict: string;
  farmAddress: string;
}

export type TRegistrationFormValidationError = Partial<
  Record<keyof IUserRegistrationForm, string>
>;
//===== User Types End =====//

//===== Product Types Start =====//
export interface IProductBase {
  _id: Types.ObjectId;
  farmer: Types.ObjectId;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  harvestDate: string;
  features: string[];
  imagesUrl: string[];
  ratings?: number;
}
export interface IFarmerPopulated {
  _id: Types.ObjectId;
  firstName: string;
  farmName: string;
  farmDistrict: string;
}

export type IProductWithFarmer = Omit<IProductBase, "farmer"> & {
  farmer: IFarmerPopulated;
};

export interface IProductFrontend
  extends Omit<IProductWithFarmer, "_id" | "farmer"> {
  id: string;
  farmer: Omit<IFarmerPopulated, "_id"> & { id: string };
}

export interface IProductForm
  extends Omit<IProductBase, "imagesUrl" | "farmer" | "_id" | "ratings"> {
  images: File[];
}

export type TAddProductValidationError = Partial<
  Record<keyof IProductForm, string>
>;

//===== Product Types End =====//

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

// Server action response
export type TActionResponse =
  | { success: true; message: string }
  | { success: false; error: string };
