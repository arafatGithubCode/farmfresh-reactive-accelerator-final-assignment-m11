"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";
import { IoCloseSharp, IoWarning } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { TbCurrencyTaka } from "react-icons/tb";
import Amount from "../ui/Amount";
import Divider from "../ui/Divider";

const CartDetails = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { cart, updateCart } = useCart();

  //   amount calculation
  const subtotal = cart?.items?.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  );

  const totalDiscountAmount = cart?.items?.reduce((acc, cur) => {
    const discount =
      ((cur.product.discountRate ?? 0) / 100) *
      (cur.product.price * cur.quantity);
    return acc + discount;
  }, 0);

  const serviceFee = cart.items[0]?.product.serviceFee;

  const baseDeliveryFee = cart.items[0]?.product.baseDeliveryFee;

  const totalPerUnitDeliveryFee = cart?.items?.reduce((acc, cur) => {
    const perUnitDeliveryFee =
      cur.quantity > 1
        ? (cur.quantity - 1) * cur.product.perUnitDeliveryFee
        : 0;

    return acc + perUnitDeliveryFee;
  }, 0);

  const totalDeliveryFee = baseDeliveryFee + totalPerUnitDeliveryFee;

  const total = subtotal + serviceFee + totalDeliveryFee - totalDiscountAmount;

  const allItemIds = cart?.items?.map((item) => item.id) || [];

  const isAtLeastOneSelected = allItemIds.some((id) => checkedItems[id!]);
  const isAllSelected =
    allItemIds.length > 0 && allItemIds.every((id) => checkedItems[id!]);

  //   Select All Toggler
  const handleSelectAll = () => {
    const allSelected = allItemIds.every((id) => checkedItems[id!]);

    if (allSelected) {
      // unselect all
      const newState: Record<string, boolean> = {};
      allItemIds.forEach((id) => (newState[id!] = false));
      setCheckedItems(newState);
    } else {
      // select all
      const newState: Record<string, boolean> = {};
      allItemIds.forEach((id) => (newState[id!] = true));
      setCheckedItems(newState);
    }
  };

  // Single Select Toggler
  const handleSingleSelect = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!isAtLeastOneSelected) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [isAtLeastOneSelected]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg">
          <div
            onClick={handleSelectAll}
            className="text-black dark:text-white flex items-center gap-1"
          >
            <div
              className={`w-5 h-5 rounded border-2 border-primary-500 flex items-center justify-center cursor-pointer ${
                isAllSelected ? "bg-primary-500" : "bg-white"
              }`}
            >
              {isAllSelected && <ImCheckmark className="text-white w-3 h-3" />}
            </div>

            <span className={`${isAllSelected ? "text-primary-500" : ""}`}>
              Select All (0 Items)
            </span>
          </div>

          <div className="flex items-center font-semibold gap-2 capitalize">
            your total:{" "}
            <div className="flex text-gray-700 dark:text-gray-300 mt-1">
              <div className="flex items-center relative">
                <span className="font-semibold">
                  {Math.round(total).toLocaleString()}
                </span>
                <TbCurrencyTaka />
              </div>
              <div className="flex items-center">
                <span className="line-through text-red-400">
                  {Math.round(subtotal).toLocaleString()}
                </span>
                <TbCurrencyTaka className="text-red-400" />
              </div>
            </div>
          </div>
        </div>
        {showAlert ? (
          <div className="flex items-center p-4 bg-orange-50 justify-between mt-5 rounded-lg">
            <div className="flex items-center justify-start gap-2">
              <IoWarning className="text-orange-500" />
              <span className="text-orange-500">
                Please select at least 1 product.
              </span>
            </div>
            <IoCloseSharp
              onClick={() => setShowAlert(false)}
              className="text-gray-400 hover:text-black cursor-pointer"
            />
          </div>
        ) : (
          <div className="bg-transparent w-full mt-5 h-14" />
        )}
        <ul className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg flex flex-col items-start justify-start gap-1">
          {cart?.items?.length === 0 ? (
            <p>There are no cart items.</p>
          ) : (
            cart.items.map((item, index) => {
              const isChecked = !!checkedItems[item.id!];
              const amount = item.product.price * item.quantity;
              const discount = amount * (item.product.discountRate / 100);
              return (
                <>
                  <li
                    key={item.id}
                    className={`flex flex-col w-full rounded-lg transition-colors ${
                      isChecked
                        ? "bg-primary-50 bg-opacity-40 dark:bg-opacity-5"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-4 p-4">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        checked={isChecked}
                      />

                      {/* Custom checkbox */}
                      <div
                        onClick={() => handleSingleSelect(item.id!)}
                        className={`w-5 h-5 rounded border-2 border-primary-500 flex items-center justify-center cursor-pointer
                              ${isChecked ? "bg-primary-500" : "bg-white"}`}
                      >
                        {isChecked && (
                          <ImCheckmark className="text-white w-3 h-3" />
                        )}
                      </div>

                      {/* Item content */}
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <div className="w-full max-w-[80px] h-[80px] relative">
                            <Image
                              src={item.product.imagesUrl[0].url}
                              alt={item.product.name}
                              fill={true}
                              className="rounded-lg"
                              blurDataURL={item.product.imagesUrl[0].url}
                            />
                          </div>
                          <div className="flex flex-col justify-between flex-1">
                            <h3 className="font-medium text-gray-800 dark:text-gray-100">
                              {item.product.name}
                            </h3>
                            <FaTrash
                              onClick={() =>
                                updateCart("REMOVE_ITEM", item.product.id)
                              }
                              className="hover:text-red-500 text-gray-400 cursor-pointer self-end"
                            />
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <FaPlus
                            onClick={() =>
                              updateCart("INCREMENT", item.product.id)
                            }
                            className="hover:text-primary-500 duration-150 cursor-pointer"
                          />
                          <span className="px-2">{item.quantity}</span>
                          <FaMinus
                            onClick={() =>
                              updateCart("DECREMENT", item.product.id)
                            }
                            className="hover:text-red-400 duration-150 cursor-pointer"
                          />
                        </div>

                        {/* Price */}
                        <div className="flex items-start">
                          <Amount discount={discount} amount={amount} />
                          <div className="flex gap-1 items-center text-xs ml-1 mt-[7px]">
                            (<span>{item.product.price}</span>
                            <LiaTimesSolid />
                            <span>
                              {item.quantity} {item.product.unit}
                            </span>
                            )
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {cart?.items?.length - 1 !== index && <Divider />}
                </>
              );
            })
          )}
        </ul>
      </div>
      <div className="col-span-4 rounded-lg bg-white dark:bg-gray-800 p-4 max-h-max">
        <p className="font-semibold text-xl">Checkout Summary</p>
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
        <Divider isDotted={true} />
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold">Pay Total</span>
          <Amount amount={total} />
        </div>
        <Divider />
        <Link
          className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 hover:scale-105 p-4 rounded-lg duration-200 my-2"
          href="/checkout"
        >
          <span className="text-white text-xl">Proceed to Checkout</span>
          <FaArrowRightLong className="text-white text-xl animate-fade-horizontal" />
        </Link>
      </div>
    </div>
  );
};

export default CartDetails;
