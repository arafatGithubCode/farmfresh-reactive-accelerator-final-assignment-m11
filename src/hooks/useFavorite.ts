import { showToast } from "@/providers/ToastProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCatchErr } from "./useCatchErr";

export const useFavorite = (productName: string) => {
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const session = useSession();
  const customerId = session?.data?.user?.id;

  const { err, catchErr } = useCatchErr();
  const router = useRouter();

  const updateFavorite = async (productId: string) => {
    if (!customerId) {
      showToast("Please login to add favorite list.", "WARNING");
      router.push("/login");
      return;
    }

    if (session?.data?.user?.role === "Farmer") {
      showToast("Only customer can make favorite.", "WARNING");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId, productId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create favorite!");
      }
      const data = await response.json();
      if (data?.message === "REMOVE") {
        const filter = favoriteList.filter((id) => id !== productId);
        setFavoriteList(filter);
        showToast(
          `${productName} has been removed from the favorite list.`,
          "WARNING"
        );
      } else {
        setFavoriteList((prev) => [...prev, productId]);
        showToast(
          `${productName} has been added to the favorite list.`,
          "SUCCESS"
        );
      }
    } catch (error) {
      catchErr(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!customerId) return;

    const fetchFavorite = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorite?customerId=${customerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite!");
        }
        const data = await response.json();
        setFavoriteList(data?.favoriteList?.items || []);
      } catch (error) {
        console.log(error, "product-cart");
        catchErr(error);
        showToast(err!, "ERROR");
      }
    };
    fetchFavorite();
  }, [customerId]);

  return { favoriteList, updateFavorite };
};
