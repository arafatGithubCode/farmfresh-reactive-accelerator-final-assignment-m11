import { TOrderStatus } from "@/types";
import { getOrderStatus } from "@/utils/getOrderStatus";
import { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";

const orderStatus = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const OrderStatus = ({ status }: { status: TOrderStatus }) => {
  const isDelivered = status === "DELIVERED";

  return (
    <div className="flex items-center space-x-4 text-sm">
      {orderStatus.map((item, index) => {
        const style = isDelivered
          ? "text-green-600 dark:text-green-400"
          : status === item
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-600 dark:text-gray-400";
        return (
          <Fragment key={item}>
            <div className={`flex items-center ${style}`}>
              <FaCheckCircle className="mr-1" />
              <span>{getOrderStatus(item)}</span>
            </div>
            {index < 3 && (
              <div
                className={`w-8 h-0.5 ${
                  status === item ? "bg-yellow-500" : "bg-gray-500"
                }`}
              ></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatus;
