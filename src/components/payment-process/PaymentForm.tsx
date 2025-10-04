"use client";

import { useBalance } from "@/hooks/useBalance";
import { useCart } from "@/hooks/useCart";
import { ICartItemFronted } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import Image from "next/image";
import { useState } from "react";
import {
  FaCreditCard,
  FaLock,
  FaMobileAlt,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";

const Item = ({ cartItem }: { cartItem: ICartItemFronted }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
    <div className="w-16 h-16 rounded-lg relative">
      <Image
        src={cartItem.product.imagesUrl[0].url}
        alt={cartItem.product.name}
        className="w-16 h-16 rounded-lg object-cover"
        fill={true}
      />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {cartItem.product.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        By {`${cartItem.product.farmer.firstName}'`} Farm
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Quantity: {`${cartItem.quantity} ${cartItem.product.unit}`}
      </p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900 dark:text-white">
        ৳{cartItem.product.price * cartItem.quantity}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        ৳{cartItem.product.price}/{cartItem.product.unit}
      </p>
    </div>
  </div>
);

const PaymentForm = ({
  selectedItemProductIds,
}: {
  selectedItemProductIds: string[];
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  const { cart } = useCart();
  const selectedItems = cart?.items?.filter(
    (item, index) => item.product.id === selectedItemProductIds[index]
  );

  const { subtotal, total, totalDeliveryFee, totalDiscountAmount, serviceFee } =
    useBalance(selectedItems);

  const sameDayDeliveryItems = selectedItems?.filter(
    (item) => item.product.deliveryMethod === "same_day_delivery"
  );
  const regularDeliveryItems = selectedItems?.filter(
    (item) => item.product.deliveryMethod === "regular_delivery"
  );

  //   Delivery Date
  const bookingDate = new Date();

  const sameDayDeliveryDate =
    sameDayDeliveryItems.length > 0 && new Date(bookingDate);
  if (typeof sameDayDeliveryDate === "object") {
    sameDayDeliveryDate.setDate(sameDayDeliveryDate.getDate() + 1);
  }

  const regularDeliveryDate =
    regularDeliveryItems?.length > 0 && new Date(bookingDate);
  if (typeof regularDeliveryDate === "object") {
    regularDeliveryDate.setDate(regularDeliveryDate.getDate() + 3);
  }
  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Order Summary
        </h2>

        {selectedItems?.length > 0 && (
          <>
            {selectedItems.map((item) => (
              <Item key={item.product.id} cartItem={item} />
            ))}
          </>
        )}

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Booking Date:
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {getFormattedDate(bookingDate)}
            </span>
          </div>
          {sameDayDeliveryDate && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Express Delivery Date:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {getFormattedDate(sameDayDeliveryDate)}
              </span>
            </div>
          )}
          {regularDeliveryDate && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Regular Delivery Date:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {getFormattedDate(regularDeliveryDate)}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 dark:text-gray-400">
              Delivery Address:
            </span>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              rows={3}
              minLength={10}
              maxLength={200}
              placeholder="Enter product's delivery address..."
              className="font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 placeholder:font-normal placeholder:text-sm px-2 py-1 border border-primary-500"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
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
            <span className="text-gray-600 dark:text-gray-400">
              Service Fee:
            </span>
            <span className="text-gray-900 dark:text-white">৳{serviceFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-2">
            <span>Total:</span>
            <span>৳{total}</span>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Payment Information
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  className="text-primary-600 focus:ring-primary-500"
                  checked
                />
                <div className="ml-3 flex items-center">
                  <FaCreditCard className="mr-2 text-lg" />
                  <span className="font-medium">Credit/Debit Card</span>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bkash"
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div className="ml-3 flex items-center">
                  <FaMobileAlt className="text-lg mr-2" />
                  <span className="font-medium">bKash</span>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="nagad"
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div className="ml-3 flex items-center">
                  <FaWallet className="text-lg mr-2" />
                  <span className="font-medium">Nagad</span>
                </div>
              </label>
            </div>
          </div>

          <div id="cardDetails" className="space-y-4">
            <div>
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  CVV
                </label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  maxLength={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <div id="mobileDetails" className="hidden space-y-4">
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="+880 1234 567890"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium text-lg transition duration-200 transform hover:scale-105"
          >
            <FaLock className="mr-2" />
            <span>Complete Payment - ৳{total}</span>
          </button>

          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            <FaShieldAlt className="mr-2" />
            <span className="text-sm whitespace-nowrap">
              Your payment information is secure and encrypted
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
