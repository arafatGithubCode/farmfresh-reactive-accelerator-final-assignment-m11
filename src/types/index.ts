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

export type UserFormMode = "register" | "login" | "profile";

export interface UserInput {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  address?: string;
  bio?: string;
  farmName?: string;
  farmSize?: string;
  farmSizeUnit?: string;
  specialization?: string;
  farmDistrict?: string;
  farmAddress?: string;
  terms?: boolean;
  avatar?: File | null;
}

export type TUserValidationErrors = Partial<Record<keyof UserInput, string>>;

export interface TBaseUser {
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
  image: string;
  updatedAt: string;
}

export interface IUserDB extends TBaseUser {
  _id: Types.ObjectId;
  name?: string;
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

export interface IUserLoginForm {
  email: string;
  password: string;
}
//===== User Types End =====//

//===== Product Types Start =====//
export interface IProductBase {
  _id: Types.ObjectId;
  farmer?: Types.ObjectId;
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
  discountRate: number;
  createdAt?: string;
  updatedAt?: string;
}

export type IProductWithFarmer = Omit<IProductBase, "farmer"> & {
  farmer: TBaseUser;
};

export interface IProductFrontend
  extends Omit<IProductWithFarmer, "_id" | "farmer"> {
  id: string;
  farmer: Omit<TBaseUser, "_id"> & { id: string };
}

export interface IProductForm
  extends Omit<
    IProductBase,
    "imagesUrl" | "farmer" | "_id" | "ratings" | "createdAt" | "updatedAt"
  > {
  images: File[];
}

export type TAddProductValidationError = Partial<
  Record<keyof IProductForm, string>
>;

//===== Product Types End =====//

//===== Cart Types Start =====//
export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface ICartItemFronted {
  product: IProductFrontend;
  quantity: number;
  id?: string;
}
export interface ICart {
  customer: Types.ObjectId;
  items: ICartItem[];
}

export interface ICartFrontend {
  id: string | null;
  customer: string | TBaseUser | null;
  items: {
    product: IProductFrontend;
    quantity: number;
    id?: string;
  }[];
}

export type TCartActionType =
  | "ADD_ITEM"
  | "INCREMENT"
  | "DECREMENT"
  | "REMOVE_ITEM";

export interface CartContextType {
  cart: ICartFrontend;
  loading: boolean;
  error: string | null;
  updateCart: {
    (action: "ADD_ITEM", product: IProductFrontend): Promise<void>;
    (
      action: Exclude<TCartActionType, "ADD_ITEM">,
      productId: string
    ): Promise<void>;
  };
}

//===== Cart Types End =====//

//===== Favorite Types Start =====//

export interface IFavorite {
  customerId: string;
  items: string[];
}
//===== Favorite Types End =====//

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
