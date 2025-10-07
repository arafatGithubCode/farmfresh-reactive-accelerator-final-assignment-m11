"use client";

import { doPayment } from "@/actions/product";
import { useBalance } from "@/hooks/useBalance";
import { useCart } from "@/hooks/useCart";
import { useCatchErr } from "@/hooks/useCatchErr";
import { showToast } from "@/providers/ToastProvider";
import {
  ICartItemFronted,
  TPaymentData,
  TPaymentField,
  TPaymentFieldErr,
  TPaymentMethod,
} from "@/types";
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

  const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>({
    method: "card",
    cardDetails: {
      nameOnCard: "",
      cardNumber: "",
      cvv: "",
      expiry: "",
    },
    mobileDetails: {
      number: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [validationErrors, setValidationErrors] = useState<TPaymentFieldErr>(
    {}
  );

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

  const { err, catchErr } = useCatchErr();

  const router = useRouter();

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
        selectedItems,
      };

      const paymentFields: TPaymentField = {
        ...paymentMethod,
        deliveryAddress,
      };

      const validationResult = validatePaymentForm(paymentFields);
      const hasErrors = Object.values(validationResult).some(
        (value) => value !== null || value !== undefined || !value
      );

      if (hasErrors) {
        setValidationErrors(validationResult);
        console.log(validationErrors);
        setLoading(false);
        return;
      }

      const response = await doPayment(paymentData);
      console.log(response, "res");

      if (!response.success) {
        showToast("Failed to place the order.", "ERROR");
        setLoading(false);
        return;
      }
      showToast(response.message, "SUCCESS");
      setLoading(false);
      router.push(`/order/${response.orderId}`);
    } catch (error) {
      console.log(error);
      catchErr(error);
      if (err) {
        showToast(err, "ERROR");
      } else {
        showToast("Failed to place the order", "ERROR");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
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
            {validationErrors.deliveryAddress && (
              <p className="text-red-400">{validationErrors.deliveryAddress}</p>
            )}
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
                    <p className="text-red-400 text-sm">
                      {validationErrors.cvv}
                    </p>
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

          <Button
            label={`Compete Payment - ৳${total}`}
            loading={loading}
            hasSpinner={true}
            icon={<FaLock />}
            loadingText="Processing..."
          />

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
