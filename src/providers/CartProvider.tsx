"use client";

import { CartContext } from "@/context";
import { useCatchErr } from "@/hooks/useCatchErr";
import { cartReducer, initialCartState } from "@/reducers/cartReducer";
import { IProductFrontend } from "@/types";
import { fetchData } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { showToast } from "./ToastProvider";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { catchErr, err } = useCatchErr();

  const router = useRouter();

  // load initial cart from api
  const session = useSession();
  const customerId = session?.data?.user?.id;
  useEffect(() => {
    if (!customerId) return;
    const fetchCart = async () => {
      try {
        const data = await fetchData(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?customerId=${customerId}`
        );
        dispatch({ type: "SET_CART", payload: data?.cart });
      } catch (error) {
        catchErr(error);
      }
    };
    fetchCart();
  }, [customerId]);

  // helper to update both UI+DB
  const updateCart = async (
    action: "ADD_ITEM" | "INCREMENT" | "DECREMENT" | "REMOVE_ITEM",
    payload: IProductFrontend | string
  ) => {
    if (!customerId) {
      router.push("/login");
      return;
    }

    if (session?.data?.user?.role === "Farmer") {
      showToast("Only customer can add to cart.");
      return;
    }
    // Optimistic UI
    if (action === "ADD_ITEM") {
      const product = payload as IProductFrontend;
      setLoading((prev) => ({ ...prev, [product.id]: true }));
      dispatch({ type: "ADD_ITEM", payload: { product: product } });

      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId, productId: product.id, action }),
        });
      } catch (error) {
        const data = await fetchData(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?customerId=${customerId}`
        );
        dispatch({ type: "SET_CART", payload: data?.cart });
        catchErr(error);
      } finally {
        setLoading((prev) => ({ ...prev, [product.id]: false }));
      }
    } else {
      const productId = payload as string;

      setLoading((prev) => ({ ...prev, productId: true }));
      dispatch({ type: action, payload: { productId } });

      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId, productId, action }),
        });
      } catch (error) {
        const data = await fetchData(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?customerId=${customerId}`
        );
        dispatch({ type: "SET_CART", payload: data?.cart });
        catchErr(error);
      } finally {
        setLoading((prev) => ({ ...prev, productId: true }));
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart: state, updateCart, error: err, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
