import { initialCartState } from "@/reducers/cartReducer";
import { ICartFrontend, IProductFrontend, TCartActionType } from "@/types";
import { createContext } from "react";

interface CartContextType {
  cart: ICartFrontend;
  updateCart: {
    (action: "ADD_ITEM", product: IProductFrontend): Promise<void>;
    (
      action: Exclude<TCartActionType, "ADD_ITEM">,
      productId: string
    ): Promise<void>;
  };
  loading: Record<string, boolean>;
  error: null | string;
}

export const CartContext = createContext<CartContextType>({
  cart: initialCartState,
  error: null,
  loading: {},
  updateCart: async () => {
    throw new Error("Cart context not initialized");
  },
});
