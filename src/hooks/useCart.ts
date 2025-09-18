import { CartContext } from "@/context";
import { useContext } from "react";

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("Cart context must be used throw the context provider");
  }
  return ctx;
};
