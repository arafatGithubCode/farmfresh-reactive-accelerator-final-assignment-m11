import { ICartFrontend, IProductFrontend } from "@/types";

type cartAction =
  | { type: "SET_CART"; payload: ICartFrontend }
  | { type: "ADD_ITEM"; payload: { product: IProductFrontend } }
  | { type: "INCREMENT"; payload: { productId: string } }
  | { type: "DECREMENT"; payload: { productId: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "SELECT_ITEM"; payload: { product: IProductFrontend } };

const initialCartState: ICartFrontend = {
  customer: null,
  items: [],
  id: null,
};

const cartReducer = (
  state: ICartFrontend,
  action: cartAction
): ICartFrontend => {
  switch (action.type) {
    case "SET_CART": {
      return {
        ...action.payload,
        items: action.payload?.items ?? [],
      };
    }
    case "ADD_ITEM": {
      if (
        state?.items?.some((i) => i.product.id === action.payload.product.id)
      ) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.product.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                  product: { ...i.product, stock: i.product.stock - 1 },
                }
              : i
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: {
              ...action.payload.product,
              stock: action.payload.product.stock - 1,
            },
            quantity: 1,
          },
        ],
      };
    }
    case "INCREMENT": {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId
            ? {
                ...i,
                quantity: i.quantity + 1,
                product: { ...i.product, stock: i.product.stock - 1 },
              }
            : i
        ),
      };
    }
    case "DECREMENT": {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId && i.quantity > 1
            ? {
                ...i,
                quantity: i.quantity - 1,
                product: { ...i.product, stock: i.product.stock + 1 },
              }
            : i
        ),
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (i) => i.product.id !== action.payload.productId
        ),
      };
    }
    default:
      return state;
  }
};

export { cartReducer, initialCartState };
