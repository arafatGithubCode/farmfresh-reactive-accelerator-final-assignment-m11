"use client";

import { useBalance } from "@/hooks/useBalance";
import { IOrderFronted } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import Image from "next/image";
import { useState } from "react";
import {
  FaCheckCircle,
  FaRedo,
  FaRegClock,
  FaSadTear,
  FaStar,
} from "react-icons/fa";
import DownloadReceipt from "../common/DownloadReceipt";
import WarningPopup from "../ui/WarningPopup";
import OrderStatus from "./OrderStatus";
import OrderSummary from "./OrderSummary";
import UpdateOrderStatus from "./UpdateOrderStatus";

const OrderItem = ({ order, role }: { order: IOrderFronted; role: string }) => {
  const { total } = useBalance(order?.items);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const orderIdText =
    order?.status === "DELIVERED"
      ? "text-primary-500"
      : order?.status === "CANCELED"
      ? "text-red-500"
      : "text-yellow-500";

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-transparent">
        <div className="p-6 group relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div>
                <h3
                  onClick={() => setShowSummary(true)}
                  className={`text-lg font-semibold group-hover:underline hover:cursor-pointer ${orderIdText}`}
                >
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Placed on {getFormattedDate(new Date(order.createdAt))}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order?.status === "DELIVERED"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : order.status === "CANCELED"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {order.status === "DELIVERED" ? (
                  <FaCheckCircle className="mr-1" />
                ) : order.status === "CANCELED" ? (
                  <FaSadTear className="mr-1" />
                ) : (
                  <FaRegClock className="mr-1" />
                )}
                {order.status === "DELIVERED"
                  ? "Delivered"
                  : order.status === "CANCELED"
                  ? "Canceled"
                  : "Pending"}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ৳{total}
              </span>
            </div>
          </div>

          {order?.items?.map((item) => (
            <div
              key={item?.product?.id}
              className="border-t border-gray-200 dark:border-gray-600 pt-4"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={item?.product?.imagesUrl?.[0]?.url}
                  alt="Fresh Tomatoes"
                  className="w-16 h-16 rounded-lg object-cover"
                  width={64}
                  height={64}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item?.product?.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By {`${item?.product?.farmer?.firstName}'s`} Farm
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item?.quantity} {item?.product?.unit} • ৳
                    {item?.product?.price}/{item?.product?.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ৳
                    {(
                      item.product.price *
                      item.quantity *
                      (1 - (item.product.discountRate ?? 0) / 100)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Order Status
            </h4>
            <OrderStatus status={order?.status} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-wrap gap-3">
            {role === "Customer" &&
              order?.status !== "PLACED" &&
              order?.status !== "CANCELED" && (
                <>
                  <DownloadReceipt order={order} />

                  <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition">
                    <FaRedo className="mr-2" />
                    Reorder
                  </button>
                </>
              )}
            {role === "Customer" && order.status === "DELIVERED" && (
              <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition">
                <FaStar className="mr-2" />
                Write Review
              </button>
            )}
            {role === "Customer" && order?.status === "PLACED" && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Waiting for farmer confirmation
              </p>
            )}
          </div>
          {role === "Customer" && order?.status === "PLACED" && (
            <UpdateOrderStatus
              orderId={order.id}
              currentStatus={order.status}
              role="Customer"
            />
          )}
          {role === "Customer" && order?.status === "CANCELED" && (
            <UpdateOrderStatus
              orderId={order.id}
              currentStatus={order.status}
              role="Customer"
            />
          )}
          {role === "Farmer" && order.status !== "CANCELED" && (
            <UpdateOrderStatus
              orderId={order.id}
              currentStatus={order.status}
              role="Farmer"
            />
          )}
          {role === "Farmer" && order.status === "CANCELED" && (
            <p>
              This order has been canceled by customer(
              {`${order?.customer?.firstName} ${order?.customer?.lastName}`})
            </p>
          )}
        </div>
      </div>

      {showSummary && (
        <WarningPopup>
          <OrderSummary
            items={order?.items}
            id={order?.id}
            onClose={() => setShowSummary(false)}
          />
        </WarningPopup>
      )}
    </>
  );
};

export default OrderItem;
