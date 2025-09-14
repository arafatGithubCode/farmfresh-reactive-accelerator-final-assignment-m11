"use client";
import { FaShoppingCart } from "react-icons/fa";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CartBadge = ({ customerId }: { customerId: string }) => {
  const { data, isLoading } = useSWR(
    customerId
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?customerId=${customerId}`
      : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  return (
    <>
      <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
        <FaShoppingCart className="text-xl" />
        <span
          className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          {data?.cart?.items?.length ?? 0}
        </span>
      </button>
    </>
  );
};

export default CartBadge;
