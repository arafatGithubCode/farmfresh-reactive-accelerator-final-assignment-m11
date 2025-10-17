"use client";

import { doPayment } from "@/actions/product";
import { useBalance } from "@/hooks/useBalance";
import { useDeliveryInfo } from "@/hooks/useDeliveryInfo";
import { showToast } from "@/providers/ToastProvider";
import {
  IOrderFronted,
  TPaymentData,
  TPaymentField,
  TPaymentFieldErr,
  TPaymentMethod,
} from "@/types";
import { catchErr } from "@/utils/catchErr";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { validatePaymentForm } from "@/validations/validatePaymentForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  FaCreditCard,
  FaLock,
  FaMobileAlt,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";
import Button from "../ui/Button";
import Divider from "../ui/Divider";

const Reorder = ({ order }: { order: IOrderFronted }) => {
  const [deliveryAddress, setDeliveryAddress] = useState(order.deliveryAddress);
  const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>({
    method: order.paymentMethod.method,
    cardDetails: {
      nameOnCard: order.paymentMethod.cardDetails.nameOnCard,
      cardNumber: order.paymentMethod.cardDetails.cardNumber,
      cvv: order.paymentMethod.cardDetails.cvv,
      expiry: order.paymentMethod.cardDetails.expiry,
    },
    mobileDetails: {
      number: order.paymentMethod.mobileDetails.number,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<TPaymentFieldErr>(
    {}
  );

  const { bookingDate, regularDeliveryDate, sameDayDeliveryDate } =
    useDeliveryInfo(order.items);
  const { total } = useBalance(order.items);
  const router = useRouter();

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((prev) => ({
      ...prev,
      method: e.target.value as "card" | "bkash" | "nagad",
    }));
  };

  const handleCardDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentMethod((prev) => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        [name]: value,
      },
    }));
  };

  const handleMobileDetails = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((prev) => ({
      ...prev,
      mobileDetails: { number: e.target.value },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const paymentData: TPaymentData = {
        bookingDate,
        sameDayDeliveryDate,
        regularDeliveryDate,
        deliveryAddress,
        paymentMethod,
        items: order.items,
      };

      const paymentFields: TPaymentField = {
        ...paymentMethod,
        deliveryAddress,
      };

      const validationResult = validatePaymentForm(paymentFields);

      const hasErrors = Object.values(validationResult).some(
        (value) => typeof value === "string"
      );

      if (hasErrors) {
        setValidationErrors(validationResult);
        setLoading(false);
        return;
      }

      const response = await doPayment(paymentData);

      if (!response.success) {
        showToast("Failed to place the order.", "ERROR");
        setLoading(false);
        return;
      }
      showToast(response.message, "SUCCESS");
      setLoading(false);
      router.push(`/success/${response.orderId}`);
    } catch (error) {
      const errMsg = catchErr(error);
      showToast(errMsg.error, "ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[400px] sm:max-h-[600px] md:max-h-[700px] overflow-x-hidden overflow-y-scroll px-6 py-2"
    >
      <h3 className="text-lg font-semibold text-gray-400">
        Reorder of Order #{order.id}
      </h3>
      {/* Order Items */}
      {order?.items?.length > 0 &&
        order.items.map((item) => {
          const { product, quantity } = item;
          const finalPrice = (
            product?.price *
            quantity *
            (1 - (product?.discountRate ?? 0) / 100)
          ).toFixed(2);

          return (
            <div
              key={product?.id}
              className="border-t border-gray-200 dark:border-gray-600 pt-4"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-lg relative">
                  <Image
                    src={product?.imagesUrl?.[0]?.url || "/placeholder.jpg"}
                    alt={product?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                    fill={true}
                    objectFit="contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {product?.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:underline duration-150 hover:cursor-pointer">
                    By {product?.farmer?.farmName}&apos;s Farm
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {quantity} {product?.unit} • ৳{product?.price}/
                    {product?.unit}
                  </p>
                </div>
                <p className="font-medium text-gray-900 dark:text-white text-right">
                  ৳{finalPrice}
                </p>
              </div>
            </div>
          );
        })}
      <Divider />
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Delivery Information
        </h4>
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
      <Divider />
      <div className="space-y-6">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Payment Information
        </h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Payment Method
          </label>
          <div className="space-y-3">
            <label
              htmlFor="card"
              className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <input
                type="radio"
                value="card"
                id="card"
                className="text-primary-600 focus:ring-primary-500"
                checked={paymentMethod.method === "card"}
                onChange={handlePaymentMethodChange}
              />
              <div className="ml-3 flex items-center">
                <FaCreditCard className="mr-2 text-lg" />
                <span className="font-medium">Credit/Debit Card</span>
              </div>
            </label>
            <label
              htmlFor="bkash"
              className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <input
                type="radio"
                value="bkash"
                id="bkash"
                checked={paymentMethod.method === "bkash"}
                onChange={handlePaymentMethodChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-3 flex items-center">
                <FaMobileAlt className="text-lg mr-2" />
                <span className="font-medium">bKash</span>
              </div>
            </label>
            <label
              htmlFor="nagad"
              className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <input
                type="radio"
                value="nagad"
                id="nagad"
                checked={paymentMethod.method === "nagad"}
                onChange={handlePaymentMethodChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-3 flex items-center">
                <FaWallet className="text-lg mr-2" />
                <span className="font-medium">Nagad</span>
              </div>
            </label>
          </div>
        </div>

        {paymentMethod.method === "card" && (
          <div id="cardDetails" className="space-y-4">
            <div>
              <label
                htmlFor="nameOnCard"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={paymentMethod.cardDetails.nameOnCard}
                onChange={handleCardDetailsChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
              {validationErrors.nameOnCard && (
                <p className="text-red-400 text-sm">
                  {validationErrors.nameOnCard}
                </p>
              )}
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
                value={paymentMethod.cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="1234 5678 9012 3456"
              />
              {validationErrors.cardNumber && (
                <p className="text-red-400 text-sm">
                  {validationErrors.cardNumber}
                </p>
              )}
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
                  value={paymentMethod.cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="MM/YY"
                />
                {validationErrors.expiry && (
                  <p className="text-red-400 text-sm">
                    {validationErrors.expiry}
                  </p>
                )}
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
                  value={paymentMethod.cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="123"
                />
                {validationErrors.cvv && (
                  <p className="text-red-400 text-sm">{validationErrors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {(paymentMethod.method === "bkash" ||
          paymentMethod.method === "nagad") && (
          <div id="mobileDetails" className="space-y-4">
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
                value={paymentMethod.mobileDetails.number}
                onChange={handleMobileDetails}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="+880 1234 567890"
              />
              {validationErrors.number && (
                <p className="text-red-400 text-sm">
                  {validationErrors.number}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center my-5">
        <Button
          label={`Compete Payment - ৳${total}`}
          loading={loading}
          hasSpinner={true}
          fullWidth={false}
          icon={<FaLock />}
          loadingText="Processing..."
        />
      </div>
      <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <FaShieldAlt className="mr-2" />
        <span className="text-sm whitespace-nowrap">
          Your payment information is secure and encrypted
        </span>
      </div>
    </form>
  );
};

export default Reorder;
