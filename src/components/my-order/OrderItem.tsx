"use client";

import { useBalance } from "@/hooks/useBalance";
import { IOrderFronted } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { getStatusLabel } from "@/utils/getStatusLavel";
import { getStatusStyles } from "@/utils/getStatusStyles";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaRedo, FaStar } from "react-icons/fa";
import DownloadReceipt from "../common/DownloadReceipt";
import UserInfo from "../common/UserInfo";
import { getStatusIcon } from "../ui/getStatusIcon";
import Popup from "../ui/Popup";
import OrderStatus from "./OrderStatus";
import OrderSummary from "./OrderSummary";
import UpdateOrderStatus from "./UpdateOrderStatus";

interface OrderItemProps {
  order: IOrderFronted;
  role: string | "Customer" | "Farmer";
}

const OrderItem = ({ order, role }: OrderItemProps) => {
  const [showFarmer, setShowFarmer] = useState<boolean>(false);
  const [showSummery, setShowSummary] = useState<boolean>(false);

  const { total } = useBalance(order?.items);

  const orderIdColor =
    order.status === "DELIVERED"
      ? "text-primary-500"
      : order.status === "CANCELED"
      ? "text-red-500"
      : "text-yellow-500";

  // ===== Customer Buttons =====
  const renderCustomerActions = () => (
    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-wrap gap-3">
      {/* Delivered / Shipped / Confirmed */}
      {["CONFIRMED", "SHIPPED", "DELIVERED"].includes(order.status) && (
        <Fragment>
          <DownloadReceipt order={order} />
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition">
            <FaRedo className="mr-2" />
            Reorder
          </button>
        </Fragment>
      )}

      {/* Delivered → Write Review */}
      {order.status === "DELIVERED" && (
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition">
          <FaStar className="mr-2" />
          Write Review
        </button>
      )}

      {/* Placed (waiting for farmer) */}
      {order.status === "PLACED" && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Waiting for farmer confirmation
        </p>
      )}
    </div>
  );

  // ===== Update Status Buttons =====
  const renderUpdateButtons = () => {
    if (role === "Customer" && ["PLACED", "CANCELED"].includes(order.status)) {
      return (
        <UpdateOrderStatus
          orderId={order.id}
          currentStatus={order.status}
          role="Customer"
        />
      );
    }

    if (role === "Farmer" && order.status !== "CANCELED") {
      return (
        <UpdateOrderStatus
          orderId={order.id}
          currentStatus={order.status}
          role="Farmer"
        />
      );
    }

    if (role === "Farmer" && order.status === "CANCELED") {
      return (
        <p className="text-sm text-red-500 mt-2">
          This order was canceled by{" "}
          <strong>
            {order.customer.firstName} {order.customer.lastName}
          </strong>
          .
        </p>
      );
    }

    return null;
  };

  // ===== Main Render =====
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-transparent">
        <div className="p-6 group relative">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
            <div
              className="flex items-center space-x-4 mb-4 lg:mb-0 cursor-pointer"
              onClick={() => setShowSummary(true)}
            >
              <div>
                <h3
                  className={`text-lg font-semibold group-hover:underline ${orderIdColor}`}
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
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {getStatusLabel(order.status)}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ৳{total}
              </span>
            </div>
          </div>

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
                    <Image
                      src={product?.imagesUrl?.[0]?.url || "/placeholder.jpg"}
                      alt={product?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                      width={64}
                      height={64}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {product?.name}
                      </h4>
                      <p
                        onClick={() => setShowFarmer(true)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:underline duration-150 hover:cursor-pointer"
                      >
                        By {product?.farmer?.firstName}&apos;s Farm
                      </p>
                      {showFarmer && (
                        <Popup
                          hasUserInfo={true}
                          onClose={() => setShowFarmer(false)}
                        >
                          <UserInfo user={item.product.farmer} />
                        </Popup>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {quantity} {product?.unit} • ৳{product?.price}
                        /{product?.unit}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white text-right">
                      ৳{finalPrice}
                    </p>
                  </div>
                </div>
              );
            })}

          {/* Status Section */}
          <div
            className={`${
              order?.items?.length > 1
                ? "border-t border-gray-200 dark:border-gray-600 pt-4"
                : ""
            }`}
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Order Status
            </h4>
            <OrderStatus status={order?.status} />
          </div>

          {/* Actions */}
          {role === "Customer" && renderCustomerActions()}
          {renderUpdateButtons()}
        </div>
      </div>

      {/* Order Summary Modal */}
      {showSummery && (
        <Popup onClose={() => setShowSummary(false)}>
          <OrderSummary items={order?.items} id={order?.id} />
        </Popup>
      )}
    </>
  );
};

export default OrderItem;
