"use client";

import { useBalance } from "@/hooks/useBalance";
import { ICartItemFronted } from "@/types";
import Amount from "../ui/Amount";
import Divider from "../ui/Divider";

const OrderSummary = ({
  items,
  id,
}: {
  items: ICartItemFronted[];
  id: string;
}) => {
  const { subtotal, totalDiscountAmount, totalDeliveryFee, serviceFee, total } =
    useBalance(items);
  return (
    <div className="max-h-max relative">
      <p className="font-semibold text-xl">Order Summary</p>#{id}
      <Divider />
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
        <Amount amount={subtotal} />
      </div>
      {totalDiscountAmount > 0 && (
        <>
          <Divider isDotted={true} />
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-700 dark:text-gray-300">
              Total Discount Applied
            </span>
            <Amount amount={totalDiscountAmount} />
          </div>
        </>
      )}
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
    </div>
  );
};

export default OrderSummary;
