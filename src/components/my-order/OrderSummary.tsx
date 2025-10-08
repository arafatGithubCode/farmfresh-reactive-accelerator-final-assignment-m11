"use client";

import { useBalance } from "@/hooks/useBalance";
import { ICartItemFronted } from "@/types";
import { useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import Amount from "../ui/Amount";
import Divider from "../ui/Divider";

const OrderSummary = ({
  items,
  id,
  onClose,
}: {
  items: ICartItemFronted[];
  id: string;
  onClose: () => void;
}) => {
  const { subtotal, totalDiscountAmount, totalDeliveryFee, serviceFee, total } =
    useBalance(items);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.body.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [onClose]);
  return (
    <div
      ref={ref}
      className="w-full max-w-sm rounded-lg bg-white dark:bg-gray-800 p-4 max-h-max relative"
    >
      <p className="font-semibold text-xl">Order Summary</p>#{id}
      <Divider />
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
        <Amount amount={subtotal} />
      </div>
      <Divider isDotted={true} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 dark:text-gray-300">
          Total Discount Applied
        </span>
        <Amount amount={totalDiscountAmount} />
      </div>
      <Divider isDotted={true} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 dark:text-gray-300">Delivery Fee</span>
        <Amount amount={totalDeliveryFee} />
      </div>
      <Divider isDotted={true} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 dark:text-gray-300">Service Fee</span>
        <Amount amount={serviceFee} />
      </div>
      <Divider isDotted={true} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 dark:text-gray-300">Total</span>
        <Amount amount={total} />
      </div>
      <GrClose
        className="hover:scale-105 duration-150 absolute right-3 top-5 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

export default OrderSummary;
