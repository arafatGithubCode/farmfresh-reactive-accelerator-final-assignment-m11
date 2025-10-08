"use client";

import { useBalance } from "@/hooks/useBalance";
import { ICartItemFronted } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { useState } from "react";
import { FaCopy, FaCreditCard } from "react-icons/fa";

const PaymentSummary = ({
  items,
  paymentMethod,
  bookingDate,
  orderId,
}: {
  items: ICartItemFronted[];
  paymentMethod: string;
  bookingDate: string;
  orderId: string;
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { serviceFee, subtotal, total, totalDeliveryFee, totalDiscountAmount } =
    useBalance(items);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Summary
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
          <span className="text-gray-900 dark:text-white">৳{subtotal}</span>
        </div>
        {totalDiscountAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Total Discount Applied:
            </span>
            <span className="text-gray-900 dark:text-white">
              ৳{totalDiscountAmount}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Delivery Fee:
          </span>
          <span className="text-gray-900 dark:text-white">
            ৳{totalDeliveryFee}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Service Fee:</span>
          <span className="text-gray-900 dark:text-white">৳{serviceFee}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
            <span>Total Paid:</span>
            <span>৳{total}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Payment Method
        </h3>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FaCreditCard className="text-lg text-gray-600 dark:text-gray-400" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {paymentMethod === "card"
                ? "Paid by card"
                : paymentMethod === "bkash"
                ? "Paid by bkash"
                : "Paid by nagad"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Paid on {getFormattedDate(new Date(bookingDate))}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transaction ID
            </p>
            <p className="font-mono text-sm text-gray-900 dark:text-white">
              {orderId}
            </p>
          </div>
          <button
            onClick={handleCopy}
            type="button"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <FaCopy />
            {copied && <span className="text-sm text-green-500">Copied!</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
