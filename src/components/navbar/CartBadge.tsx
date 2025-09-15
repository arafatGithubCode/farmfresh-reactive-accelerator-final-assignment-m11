"use client";
import { ICartItemFronted } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { LuRedoDot } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CartBadge = ({ customerId }: { customerId: string }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timerOutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useSWR(
    customerId
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?customerId=${customerId}`
      : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  const cartItems: ICartItemFronted[] = data?.cart?.items;

  const handleMouseEnter = () => {
    if (timerOutRef.current) clearInterval(timerOutRef.current);

    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timerOutRef.current = setTimeout(() => setShowDropdown(false), 200);
  };
  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
        <FaShoppingCart className="text-xl" />
        <span
          className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          {isLoading ? (
            <LuRedoDot className="text-white animate-spin text-xl" />
          ) : (
            data?.cart?.items?.length ?? 0
          )}
        </span>
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg rounded-t-none py-4 px-2 z-50">
          <h4 className="font-semibold mb-2">Cart</h4>
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-300 dark:divide-gray-500 space-y-2">
              {cartItems?.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center justify-start gap-2 pt-1"
                >
                  <Image
                    className="rounded"
                    src={item.product.imagesUrl[0]}
                    alt="Cart-Item"
                    width={80}
                    height={80}
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-500 font-semibold text-xs">
                      {item.product.farmer.farmName}
                    </p>
                    <div className="flex items-center mt-1 -ml-1">
                      <TbCurrencyTaka className="text-xl" />
                      <div className="font-semibold">
                        {item.product.price * item.quantity}
                      </div>
                      <div className="flex gap-1 items-center text-xs ml-1">
                        (<span>{item.product.price}</span>
                        <LiaTimesSolid />
                        <span>
                          {item.quantity}
                          {item.product.unit}
                        </span>
                        )
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <div className="w-full bg-gray-300 dark:bg-gray-500 h-[2px] my-4" />
              <Link
                className="bg-primary-500 px-4 py-3 text-white text-xl font-semibold text-center rounded-lg block w-full"
                href="/cart"
              >
                Go to cart
              </Link>
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CartBadge;
